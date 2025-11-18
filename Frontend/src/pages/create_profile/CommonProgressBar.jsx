// CommonProgressBar.jsx
import React from 'react';

const CommonProgressBar = ({ currentStep, totalSteps, onStepClick }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  const steps = [
    { number: 1, label: "Import Info", icon: "📥" },
    { number: 2, label: "Work Type", icon: "💼" },
    { number: 3, label: "Work Preference", icon: "⚙️" },
    { number: 4, label: "Professional Title", icon: "👔" },
    { number: 5, label: "Experience", icon: "💼" },
    { number: 6, label: "Education", icon: "🎓" },
    { number: 7, label: "Languages", icon: "🌐" },
    { number: 8, label: "Overview", icon: "📝" },
    { number: 9, label: "Hourly Rate", icon: "💰" },
    { number: 10, label: "Personal Details", icon: "👤" }
  ];

  return (
    <div className="w-full md:block"> {/* Hidden on mobile, shown on tablet and up */}
      {/* Progress Percentage and Bar */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-sm font-medium text-foreground">
          {Math.round(progress)}% Complete
        </div>
      </div>
      
      {/* Main Progress Bar */}
      <div className="w-full bg-muted h-2 rounded-full overflow-hidden mb-8">
        <div
          className="bg-gradient-to-r from-primary to-primary-dark h-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Desktop View - Horizontal with connecting lines */}
      <div className="hidden lg:block relative px-5">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              {/* Step Circle */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step.number < currentStep
                      ? 'bg-gradient-to-r from-primary to-primary-dark border-primary text-primary-foreground transform scale-110'
                      : step.number === currentStep
                      ? 'bg-background border-primary text-primary shadow-medium transform scale-110'
                      : 'bg-background border-border text-muted-foreground'
                  } ${
                    onStepClick && step.number <= currentStep ? 'hover:scale-125 hover:shadow-large cursor-pointer' : 'cursor-default'
                  }`}
                  onClick={() => onStepClick && step.number <= currentStep && onStepClick(step.number)}
                >
                  <span className="text-sm font-medium">
                    {step.number < currentStep ? '✓' : step.icon}
                  </span>
                  
                  {/* Pulse animation for current step */}
                  {step.number === currentStep && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75"></div>
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div className={`text-xs font-medium ${
                    step.number <= currentStep
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </div>
                </div>
              </div>

              {/* Connecting Line (except after last step) */}
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                    step.number < currentStep ? 'bg-gradient-to-r from-primary to-primary-dark' : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CommonProgressBar;