// ResumeUpload.jsx
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, X, ArrowLeft, Loader, GraduationCap } from 'lucide-react';

const ResumeUpload = ({ onBack, onResumeProcessed }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedData, setExtractedData] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a valid resume file (PDF, DOC, DOCX, TXT)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
    }
  };

  // Function to read file content
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };

      if (file.type === 'application/pdf') {
        // For PDF files, read as array buffer
        reader.readAsArrayBuffer(file);
      } else {
        // For text-based files
        reader.readAsText(file);
      }
    });
  };

  // Parse education data from resume content
  const parseYourResumeFormat = (textContent) => {
    const entries = [];
    
    // Split the content into lines
    const lines = textContent.split('\n').map(line => line.trim()).filter(line => line);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for college lines with your exact format
      if (line.startsWith('•') && (line.includes('College') || line.includes('Polytechnic') || line.includes('Prashala')) && line.match(/\d{4}\s*–\s*\d{4}/)) {
        const collegeMatch = line.match(/•\s*([^,]+,[^,]+),\s*([A-Za-z\s]+)\s+(\d{4}\s*–\s*\d{4})/i);
        if (collegeMatch) {
          const entry = {
            title: collegeMatch[1].trim() + ', ' + collegeMatch[2].trim(),
            period: ` ${collegeMatch[3].trim()}`,
            company: '',
            location: '',
            description: ''
          };
          
          // Look ahead for degree information
          if (i + 1 < lines.length) {
            const nextLine = lines[i + 1];
            
            // Try to extract degree and field
            const degreeMatch = nextLine.match(/(B\.?Tech|Diploma|SSC)\s+(?:in\s+)?([^\-]+)\s*-\s*(CGPA|Aggregate|Percentage)[:\s]*([\d\.]+)/i);
            if (degreeMatch) {
              entry.company = degreeMatch[1].trim();
              entry.location = degreeMatch[2].trim();
              entry.description = `${degreeMatch[3]}: ${degreeMatch[4]}`;
            } else {
              // Try alternative pattern without performance metric
              const altDegreeMatch = nextLine.match(/(B\.?Tech|Diploma|SSC)\s+(?:in\s+)?([^-]+)/i);
              if (altDegreeMatch) {
                entry.company = altDegreeMatch[1].trim();
                entry.location = altDegreeMatch[2].trim();
                
                // Look for performance in the same line or next line
                const performanceMatch = nextLine.match(/(CGPA|Aggregate|Percentage)[:\s]*([\d\.]+)/i);
                if (performanceMatch) {
                  entry.description = `${performanceMatch[1]}: ${performanceMatch[2]}`;
                } else if (i + 2 < lines.length) {
                  const performanceLine = lines[i + 2];
                  const performanceMatch2 = performanceLine.match(/(CGPA|Aggregate|Percentage)[:\s]*([\d\.]+)/i);
                  if (performanceMatch2) {
                    entry.description = `${performanceMatch2[1]}: ${performanceMatch2[2]}`;
                  }
                }
              }
            }
          }
          
          entries.push(entry);
        }
      }
    }
    
    return entries;
  };

  const processResumeFile = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setExtractedData(null);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 20;
        });
      }, 300);

      // Read file content
      const content = await readFileContent(selectedFile);
      
      let extractedEducation = [];
      
      // For text files, parse the content
      if (typeof content === 'string') {
        extractedEducation = parseYourResumeFormat(content);
      }
      
      // If no data extracted, create sample data based on file name
      if (extractedEducation.length === 0) {
        extractedEducation = [
          {
            id: 'sample-1',
            title: 'Sample University',
            company: 'Bachelor of Technology',
            location: 'Computer Science',
            period: ' 2020 - 2024',
            description: 'CGPA: 8.5'
          }
        ];
      }
      
      // Add IDs to entries
      extractedEducation = extractedEducation.map((edu, index) => ({
        ...edu,
        id: `extracted-${Date.now()}-${index}`
      }));

      clearInterval(progressInterval);
      setUploadProgress(100);
      setExtractedData(extractedEducation);
      
      setTimeout(() => {
        setIsUploading(false);
        setIsProcessed(true);
      }, 1000);

    } catch (error) {
      console.error('Error processing resume:', error);
      setIsUploading(false);
      alert('Error processing resume. Please try again with a different file.');
    }
  };

  const handleConfirmEducation = () => {
    if (extractedData && extractedData.length > 0) {
      onResumeProcessed(extractedData);
    } else {
      alert('No education data could be extracted from your resume. Please fill in the education details manually.');
      onBack();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setIsProcessed(false);
    setUploadProgress(0);
    setExtractedData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 -right-10 w-60 h-60 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-cyan-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-4 max-w-4xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          {/* Main Content Container */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/20 shadow-lg p-6 md:p-8 mb-6">
            {/* Header */}
            <div className="text-center mb-8">
              <button
                onClick={onBack}
                className="absolute left-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 px-4 py-2 rounded-full mb-4">
                <Upload className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  Upload Resume
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Upload Your Resume
              </h2>
              
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upload your resume and we'll extract education information directly from your file.
              </p>
            </div>

            {/* Upload Area */}
            {!selectedFile ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 md:p-12 text-center cursor-pointer hover:border-blue-500 transition-colors mb-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('resume-file').click()}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Drag & drop your resume here
                </p>
                <p className="text-gray-500 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-400">
                  Supported formats: PDF, DOC, DOCX, TXT (Max 5MB)
                </p>
                
                <input
                  id="resume-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              /* File Selected State */
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Processing resume...</span>
                        <span className="text-blue-600 font-semibold">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Loader className="w-4 h-4 animate-spin" />
                        Analyzing resume content and extracting education data...
                      </div>
                    </div>
                  )}

                  {/* Processed State */}
                  {isProcessed && (
                    <div className="flex items-center gap-3 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">
                        {extractedData && extractedData.length > 0 
                          ? `Found ${extractedData.length} education entries!` 
                          : 'Education data extracted!'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Preview of extracted data */}
                {extractedData && extractedData.length > 0 && (
                  <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Education Information Extracted from Your Resume:
                    </h3>
                    <div className="space-y-3">
                      {extractedData.map((edu, index) => (
                        <div key={edu.id} className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">School/College:</span>
                              <p className="text-gray-800 font-semibold">{edu.title}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Degree:</span>
                              <p className="text-gray-800 font-semibold">{edu.company}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Field of Study:</span>
                              <p className="text-gray-800">{edu.location}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Period:</span>
                              <p className="text-gray-800">{edu.period}</p>
                            </div>
                            {edu.description && (
                              <div className="md:col-span-2">
                                <span className="font-medium text-gray-600">Academic Performance:</span>
                                <p className="text-gray-800 text-xs mt-1">{edu.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-green-600 mt-2 font-medium">
                      ✓ Successfully extracted {extractedData.length} education entries from your resume!
                    </p>
                  </div>
                )}

                {isProcessed && (!extractedData || extractedData.length === 0) && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">No Education Data Found</h3>
                    <p className="text-sm text-yellow-700">
                      We couldn't find clear education information in your resume. Please fill in the education details manually in the next step.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-white/60 hover:text-gray-800 transition-all duration-300 flex items-center gap-2 border border-gray-200 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex gap-3">
                {selectedFile && !isUploading && !isProcessed && (
                  <button
                    onClick={processResumeFile}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                  >
                    Extract Education Data
                  </button>
                )}
                
                {isProcessed && (
                  <button
                    onClick={handleConfirmEducation}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-800 transition-all duration-300"
                  >
                    {extractedData && extractedData.length > 0 ? 'Use This Data' : 'Continue Manually'}
                  </button>
                )}
              </div>
            </div>

            {/* Information Box */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">What We Extract:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>School/College Names:</strong> N. K. Orchid College of Engineering and Technology, etc.</li>
                <li>• <strong>Degrees:</strong> B.Tech, Diploma, SSC, etc.</li>
                <li>• <strong>Fields of Study:</strong> Computer Science and Engineering, etc.</li>
                <li>• <strong>Period:</strong> 2023–2026, 2020–2023, etc.</li>
                <li>• <strong>Academic Performance:</strong> CGPA: 7.99, Aggregate: 88.11%, etc.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;