import React, { useState, useEffect, useRef } from 'react';
import { Upload, Edit3, User, X, Plus, Pencil, Trash2, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import ExperienceStep from './ExperienceStep';
import EducationStep from './EducationStep';
import LanguageProficiency from './LanguageProficiency';
import OverviewBibilography from './OverviewBibilography';
import HourlyRate from './HourlyRate';
import FewDetails from './FewDetails';
import CommonProgressBar from './CommonProgressBar';
import ResumeUpload from './ResumeUpload';

// JSON Data with all steps
const profileData = {
  step1: {
    id: 1,
    currentStep: 1,
    totalSteps: 10,
    title: "How would you like to tell us about yourself?",
    description: "We need to get a sense of your education, experience and skills. It's quickest to import your information — you can edit it before your profile goes live.",
    options: [
      { id: "linkedin", label: "Import from LinkedIn", icon: "linkedin", color: "from-orange-100 to-orange-200", bgColor: "bg-orange-50" },
      { 
        id: "resume", 
        label: "Upload your resume (Recommended)", 
        icon: "upload", 
        color: "from-orange-100 to-orange-200", 
        bgColor: "bg-orange-50" 
      },
      { id: "manual", label: "Fill out manually (15 min)", icon: "edit", color: "from-orange-100 to-orange-200", bgColor: "bg-orange-50" }
    ],
    tip: {
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
      quote: "Your Upwork profile is how you stand out from the crowd. It's what you use to win work, so let's make it a good one.",
      author: "Upwork Pro Tip"
    }
  },
  step2: {
    id: 2,
    currentStep: 2,
    totalSteps: 10,
    title: "Great, so what kind of work are you here to do?",
    subtitle: "Don't worry, you can change these choices later on.",
    categories: {
      "Accounting & Consulting": ["Accounting", "Financial Planning", "Management Consulting", "Tax Preparation"],
      "Admin Support": ["Data Entry", "Virtual Assistant", "Project Management", "Market Research"],
      "Customer Service": ["Customer Support", "Technical Support", "Phone Support"],
      "Data Science & Analytics": ["Data Analytics", "Data Mining", "Machine Learning", "A/B Testing"],
      "Design & Creative": ["Graphic Design", "Web Design", "Logo Design", "Brand Identity"],
      "Engineering & Architecture": ["Civil Engineering", "Structural Engineering", "3D Modeling", "AutoCAD"],
      "IT & Networking": ["Network Security", "System Administration", "DevOps", "Cloud Computing"],
      "Legal": ["Contract Law", "Corporate Law", "Legal Research", "Paralegal Services"],
      "Sales & Marketing": ["Digital Marketing", "Social Media Marketing", "SEO", "Content Marketing"],
      "Translation": ["English to Spanish", "Technical Translation", "Localization", "Proofreading"],
      "Web, Mobile & Software Dev": ["Blockchain, NFT & Cryptocurrency", "AI Apps & Integration", "Desktop Application Development", "Ecommerce Development", "Game Design & Development", "Mobile Development", "Other - Software Development", "Product Management & Scrum", "QA Testing", "Scripts & Utilities", "Web & Mobile Design", "Web Development"]
    }
  },
  step3: {
    id: 3,
    currentStep: 3,
    totalSteps: 10,
    title: "And how would you like to work?",
    description: "Everybody works in different ways, so we have different ways of helping you win work. You can select multiple preferences now and can always change it later!",
    workOptions: [
      {
        id: "find-opportunities",
        title: "I'd like to find opportunities myself",
        description: "Clients post jobs on our Talent Marketplace™, you can browse and bid for them, or get invited by a client",
        emoji: "💻",
        color: "from-emerald-100 to-green-200",
        bgColor: "bg-emerald-50"
      },
      {
        id: "package-work",
        title: "I'd like to package up my work for clients to buy",
        description: "Define your service with prices and timelines; we'll list it in our Project Catalog™ for clients to buy right away.",
        emoji: "📦",
        color: "from-emerald-100 to-green-200",
        bgColor: "bg-orange-50"
      }
    ],
    contractOption: {
      id: "contract-to-hire",
      label: "I'm open to contract-to-hire opportunities",
      description: "Start with a contract, and later explore a full-time option with the client"
    }
  },
  step4: {
    id: 4,
    currentStep: 4,
    totalSteps: 10,
    title: "Got it. Now, add a title to tell the world what you do.",
    description: "It's the very first thing clients see, so make it count. Stand out by describing your expertise in your own words.",
    label: "Your professional role",
    placeholder: "Full stack Developer"
  }
};

// LinkedIn Icon Component
const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Step 4 Component - Professional Title
const ProfessionalTitleStep = ({ onBack, onNext }) => {
  const { step4 } = profileData;
  const [title, setTitle] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = (step4.currentStep / step4.totalSteps) * 100;

  const handleClear = () => {
    setTitle('');
  };

  const animateTransition = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleNext = () => {
    if (title.trim()) {
      animateTransition(onNext);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">

      <div className="relative z-4 max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
          {/* Main Content Container */}
          <div className={`bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 mb-6 transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          }`}>
            {/* Question Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-xs md:text-sm font-semibold text-primary">
                  Question {step4.currentStep}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                {step4.title}
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {step4.description}
              </p>
            </div>

            {/* Input Field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                {step4.label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={step4.placeholder}
                  className="w-full px-4 py-3 border-2 border-input rounded-lg text-base text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                />
                {title && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!title.trim()}
              className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                title.trim()
                  ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Next, add your experience
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 3 Component - Work Preference
const WorkPreferenceStep = ({ onBack, onNext }) => {
  const { step3 } = profileData;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [contractToHire, setContractToHire] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOptionToggle = (optionId) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const progress = (step3.currentStep / step3.totalSteps) * 100;

  const animateTransition = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleNext = () => {
    if (selectedOptions.length > 0) {
      animateTransition(onNext);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      <div className="relative z-4 max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">

          {/* Main Content Container */}
          <div className={`bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 mb-6 transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          }`}>
            {/* Question Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-xs md:text-sm font-semibold text-primary">
                  Question {step3.currentStep}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                {step3.title}
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {step3.description}
              </p>
            </div>

            {/* Work Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {step3.workOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`transition-all duration-500 ${
                    isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                  style={{ transitionDelay: isAnimating ? '0ms' : `${index * 100}ms` }}
                >
                  <button
                    onClick={() => handleOptionToggle(option.id)}
                    className={`relative w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden ${
                      selectedOptions.includes(option.id)
                        ? `border-primary bg-gradient-to-r ${option.color} shadow-medium transform scale-105`
                        : 'border-border bg-background/80 hover:border-primary hover:shadow-soft'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {selectedOptions.includes(option.id) && (
                      <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-background rounded-full flex items-center justify-center shadow-soft">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                      </div>
                    )}

                    {/* Emoji Container */}
                    <div className={`mb-3 md:mb-4 p-2 md:p-3 rounded-lg md:rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 ${
                      selectedOptions.includes(option.id)
                        ? 'bg-primary/10'
                        : `${option.bgColor} group-hover:scale-105`
                    }`}>
                      <span className={`text-2xl md:text-3xl transition-all duration-300 ${
                        selectedOptions.includes(option.id) ? 'scale-110' : 'group-hover:scale-105'
                      }`}>
                        {option.emoji}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1 md:space-y-2">
                      <h3 className={`text-sm md:text-base font-bold transition-colors duration-300 ${
                        selectedOptions.includes(option.id) ? 'text-primary' : 'text-foreground'
                      }`}>
                        {option.title}
                      </h3>
                      
                      <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                        selectedOptions.includes(option.id) ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {option.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 transition-opacity duration-300 ${
                      selectedOptions.includes(option.id) ? 'opacity-10' : 'group-hover:opacity-5'
                    }`}></div>
                  </button>
                </div>
              ))}
            </div>

            {/* Contract Option */}
            <div className={`transition-all duration-500 ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`} style={{ transitionDelay: isAnimating ? '0ms' : '200ms' }}>
              <label className="flex items-start cursor-pointer group p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={contractToHire}
                  onChange={(e) => setContractToHire(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-input text-primary focus:ring-primary cursor-pointer"
                />
                <div className="ml-3">
                  <span className="text-sm md:text-base font-medium text-foreground group-hover:text-foreground/80">
                    {step3.contractOption.label}
                  </span>
                  <span className="text-muted-foreground text-xs md:text-sm"> - {step3.contractOption.description}</span>
                </div>
              </label>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 md:px-5 md:py-3 text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 text-sm md:text-base">
                Skip for now
              </button>
              <button
                onClick={handleNext}
                disabled={selectedOptions.length === 0}
                className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                  selectedOptions.length > 0
                    ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Next, create a profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2 Component - Work Type Selection
const WorkTypeSelection = ({ onBack, onNext }) => {
  const { step2 } = profileData;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSpecialties([]);
  };

  const handleSpecialtyToggle = (specialty) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      }
      if (prev.length < 3) {
        return [...prev, specialty];
      }
      return prev;
    });
  };

  const availableSpecialties = selectedCategory ? step2.categories[selectedCategory] : [];
  const progress = (step2.currentStep / step2.totalSteps) * 100;

  const animateTransition = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleNext = () => {
    if (selectedCategory && selectedSpecialties.length > 0) {
      animateTransition(onNext);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">

      <div className="relative z-4 max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
          {/* Main Content Container */}
          <div className={`bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 mb-6 transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          }`}>
            {/* Question Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-xs md:text-sm font-semibold text-primary">
                  Question {step2.currentStep}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                {step2.title}
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {step2.subtitle}
              </p>
            </div>

            {/* Categories and Specialties Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6">
              {/* Categories Column */}
              <div className={`transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
                <h3 className="text-sm font-medium text-foreground mb-3 md:mb-4">Select 1 category</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {Object.keys(step2.categories).map((category, index) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-300 text-sm ${
                        selectedCategory === category
                          ? "border-primary bg-gradient-to-r from-primary/10 to-primary/20 text-primary font-medium shadow-soft"
                          : "border-border hover:border-primary text-foreground hover:bg-muted/50"
                      }`}
                      style={{ transitionDelay: isAnimating ? '0ms' : `${index * 50}ms` }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialties Column */}
              <div className={`transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`} style={{ transitionDelay: isAnimating ? '0ms' : '100ms' }}>
                <h3 className="text-sm font-medium text-foreground mb-3 md:mb-4">Now, select 1 to 3 specialties</h3>
                {selectedCategory ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availableSpecialties.map((specialty, index) => (
                      <label
                        key={specialty}
                        className={`flex items-start px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          selectedSpecialties.includes(specialty)
                            ? "border-primary bg-gradient-to-r from-primary/10 to-primary/20"
                            : "border-border hover:border-primary hover:bg-muted/50"
                        } ${
                          selectedSpecialties.length >= 3 && !selectedSpecialties.includes(specialty)
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        }`}
                        style={{ transitionDelay: isAnimating ? '0ms' : `${index * 50 + 150}ms` }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSpecialties.includes(specialty)}
                          onChange={() => handleSpecialtyToggle(specialty)}
                          disabled={selectedSpecialties.length >= 3 && !selectedSpecialties.includes(specialty)}
                          className="mt-0.5 w-4 h-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-foreground">{specialty}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                    <p className="text-sm">Please select a category first</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedCategory || selectedSpecialties.length === 0}
              className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                selectedCategory && selectedSpecialties.length > 0
                  ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Next, add your skills
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 1 Component - Profile Setup
const ProfileSetupStep1 = ({ onNext, onResumeUpload, showIndividualProgress = true }) => {
  const { step1 } = profileData;
  const [isAnimating, setIsAnimating] = useState(false);
  const progress = (step1.currentStep / step1.totalSteps) * 100;

  const handleOptionClick = (optionId) => {
    if (optionId === 'manual') {
      animateTransition(onNext);
    } else if (optionId === 'resume') {
      onResumeUpload();
    } else {
      console.log(`Selected option: ${optionId}`);
    }
  };

  const animateTransition = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const renderIcon = (icon) => {
    switch (icon) {
      case 'linkedin':
        return <LinkedInIcon />;
      case 'upload':
        return <Upload className="w-5 h-5" />;
      case 'edit':
        return <Edit3 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      

      <div className="relative z-4 max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
         <div className={`bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 mb-6 transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          }`}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-20 items-center transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          }`}>
            {/* Left Column - Options */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span className="text-xs md:text-sm font-semibold text-primary">
                    Let's get started
                  </span>
                </div>
                
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                  {step1.title}
                </h2>
                
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step1.description}
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                {step1.options.map((option, index) => (
                  <div
                    key={option.id}
                    className={`transition-all duration-500 ${
                      isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}
                    style={{ transitionDelay: isAnimating ? '0ms' : `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => handleOptionClick(option.id)}
                      className={`w-full max-w-md px-4 py-3 md:px-6 md:py-4 border-2 rounded-lg md:rounded-xl font-semibold hover:shadow-soft transition-all duration-300 flex items-center justify-center gap-3 text-sm md:text-base shadow-soft border-primary text-primary hover:bg-primary/10`}
                    >
                      {renderIcon(option.icon)}
                      <span>{option.label}</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm text-sm md:text-base">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>

            {/* Right Column - Tip Card */}
            <div className="flex items-center justify-center">
              <div className={`max-w-sm bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
              }`} style={{ transitionDelay: isAnimating ? '0ms' : '300ms' }}>
                <div className="mb-4 md:mb-6">
                  <img src={step1.tip.avatar} alt="Profile" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-soft" />
                </div>
                <blockquote className="mb-4 md:mb-6">
                  <p className="text-base md:text-lg leading-relaxed text-foreground">&ldquo;{step1.tip.quote}&rdquo;</p>
                </blockquote>
                <p className="text-sm md:text-base font-semibold text-foreground">{step1.tip.author}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [extractedEducation, setExtractedEducation] = useState([]);
  const totalSteps = 10;
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCommonProgressBarActive = windowWidth >= 768 && windowWidth < 1050;

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleResumeProcessed = (educationData) => {
    setExtractedEducation(educationData);
    setShowResumeUpload(false);
    // Skip to education step after resume processing
    setCurrentStep(6);
  };

  const handleResumeUpload = () => {
    setShowResumeUpload(true);
  };

  const renderCurrentStep = () => {
    if (showResumeUpload) {
      return (
        <ResumeUpload 
          onBack={() => setShowResumeUpload(false)}
          onResumeProcessed={handleResumeProcessed}
        />
      );
    }

    const commonProps = {
      onBack: currentStep > 1 ? () => setCurrentStep(currentStep - 1) : undefined,
      onSkip: currentStep < totalSteps ? () => setCurrentStep(currentStep + 1) : undefined,
      onNext: currentStep < totalSteps ? () => setCurrentStep(currentStep + 1) : undefined,
      showIndividualProgress: !isCommonProgressBarActive
    };

    switch (currentStep) {
      case 1:
        return <ProfileSetupStep1 
                 onNext={() => setCurrentStep(2)} 
                 onResumeUpload={handleResumeUpload}
                 showIndividualProgress={!isCommonProgressBarActive} 
               />;
      case 2:
        return <WorkTypeSelection {...commonProps} />;
      case 3:
        return <WorkPreferenceStep {...commonProps} />;
      case 4:
        return <ProfessionalTitleStep {...commonProps} />;
      case 5:
        return <ExperienceStep {...commonProps} />;
      case 6:
        return <EducationStep {...commonProps} extractedEducation={extractedEducation} />;
      case 7:
        return <LanguageProficiency {...commonProps} />;
      case 8:
        return <OverviewBibilography {...commonProps} />;
      case 9:
        return <HourlyRate {...commonProps} />;
      case 10:
        return <FewDetails {...commonProps} />;
      default:
        return <ProfileSetupStep1 
                 onNext={() => setCurrentStep(2)} 
                 onResumeUpload={handleResumeUpload}
                 showIndividualProgress={!isCommonProgressBarActive} 
               />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
     

      {/* CommonProgressBar - Only show between 768px and 1049px */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 md:py-4">
          <CommonProgressBar 
            currentStep={currentStep} 
            totalSteps={totalSteps}
            onStepClick={handleStepClick}
          />
        </div>

      {/* Current Step Content */}
      {renderCurrentStep()}
    </div>
  );
};
export default ProfileSetup;