import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientProfileAPI } from '../services/api';
import { toast } from 'sonner';

const ClientProfile = () => {
  const navigate = useNavigate(); 
  const [companyName, setCompanyName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCompanySize, setSelectedCompanySize] = useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];
  const handleNext = async () => {
    if (!companyName || !selectedIndustry || !selectedCompanySize) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await clientProfileAPI.create({
        company_name: companyName,
        industry: selectedIndustry,
        company_size: selectedCompanySize,
      });
      
      toast.success('Profile created successfully!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error creating client profile:', error);
      toast.error(error.response?.data?.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setShowIndustryDropdown(false);
  };

  const handleCompanySizeSelect = (size) => {
    setSelectedCompanySize(size);
    setShowSizeDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero font-sans">

      <main className="flex justify-center items-center min-h-[calc(100vh-80px)] px-5 py-6 shadow-medium">
        <div className="bg-card text-card-foreground rounded-xl p-8 shadow-large w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-2">Client Information</h2>
          <p className="text-muted-foreground text-center text-sm mb-6">Complete your profile</p>

          <div className="h-px bg-border mb-8"></div>

          <div className="space-y-6 mb-8">
            {/* Company Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-input rounded-lg text-base transition-colors outline-none focus:border-ring"
              />
            </div>

            {/* Industry Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-3 border-2 border-input rounded-lg bg-background text-base text-left flex justify-between items-center transition-colors outline-none hover:border-ring focus:border-ring"
                  onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                >
                  <span className={selectedIndustry ? 'text-foreground' : 'text-muted-foreground'}>
                    {selectedIndustry || 'Select industry'}
                  </span>
                  <span className="text-xs text-muted-foreground transition-transform">▼</span>
                </button>
                
                {showIndustryDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-background border-2 border-input rounded-lg mt-1 shadow-medium z-10 max-h-48 overflow-y-auto">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        className="w-full px-4 py-3 text-base text-left transition-colors hover:bg-secondary first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleIndustrySelect(industry)}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Company Size Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Size</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-3 border-2 border-input rounded-lg bg-background text-base text-left flex justify-between items-center transition-colors outline-none hover:border-ring focus:border-ring"
                  onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                >
                  <span className={selectedCompanySize ? 'text-foreground' : 'text-muted-foreground'}>
                    {selectedCompanySize || 'Select company size'}
                  </span>
                  <span className="text-xs text-muted-foreground transition-transform">▼</span>
                </button>
                
                {showSizeDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-background border-2 border-input rounded-lg mt-1 shadow-medium z-10 max-h-48 overflow-y-auto">
                    {companySizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className="w-full px-4 py-3 text-base text-left transition-colors hover:bg-secondary first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleCompanySizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 border-2 border-primary rounded-lg bg-background text-primary font-semibold text-base transition-all hover:bg-secondary hover:shadow-soft">
              Back
            </button>
            <button 
              className="flex-1 px-6 py-3 border-0 rounded-lg bg-gradient-to-br from-[hsl(28_90%_55%)] to-[hsl(16_90%_50%)] text-primary-foreground font-semibold text-base transition-all hover:shadow-medium hover:from-[hsl(28_95%_65%)] hover:to-[hsl(16_95%_55%)] disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientProfile;