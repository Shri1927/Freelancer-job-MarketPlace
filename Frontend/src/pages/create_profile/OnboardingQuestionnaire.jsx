import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';

const OnboardingQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const particlesRef = useRef(null);

  const questions = [
    {
      id: 1,
      title: "What is your biggest goal for starting freelance work?",
      subtitle: "This helps us understand your priorities and show you the most relevant opportunities.",
      options: [
        {
          id: 'primary-income',
          title: 'Need primary income source',
          icon: '💰',
          description: 'Replace your full-time income',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'extra-money',
          title: 'Want to earn extra money',
          icon: '📈',
          description: 'Supplement your current income',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'skills-portfolio',
          title: 'Building skills & portfolio',
          icon: '🎓',
          description: 'Grow your expertise and showcase work',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'work-flexibility',
          title: 'Seeking work flexibility',
          icon: '🕒',
          description: 'Freedom to work on your own terms',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'

        }
      ]
    },
    {
      id: 2,
      title: "How would you describe your current experience level?",
      subtitle: "This lets us know how much support to provide and match you with suitable projects.",
      options: [
        {
          id: 'brand-new',
          title: 'Brand new to freelancing',
          icon: '🚀',
          description: 'Starting my freelance journey',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'some-experience',
          title: 'Some experience (1-2 projects)',
          icon: '🌱',
          description: 'Completed a few freelance projects',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'regular-freelancer',
          title: 'Regular freelancer (consistent work)',
          icon: '🌟',
          description: 'Consistently working with clients',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'expert',
          title: 'Expert (5+ years experience)',
          icon: '🏆',
          description: 'Seasoned professional in the field',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        }
      ]
    },
    {
      id: 3,
      title: "How would you like to find and manage work?",
      subtitle: "Choose how you'd prefer to discover opportunities and engage with clients.",
      options: [
        {
          id: 'browse-bid',
          title: 'Browse and bid on projects myself',
          icon: '🔍',
          description: 'Search and apply for projects actively',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'packaged-services',
          title: 'Create packaged services for clients to buy',
          icon: '🛍️',
          description: 'Offer fixed-price services in a catalog',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'get-matched',
          title: 'Get matched with suitable clients',
          icon: '🤝',
          description: 'Let us find the right clients for you',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'mix-approaches',
          title: 'Mix of all approaches',
          icon: '🌈',
          description: 'Flexible across different work styles',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        }
      ]
    },
    {
      id: 4,
      title: "How do you typically approach your work style?",
      subtitle: "This helps us understand your working preferences for better project matching.",
      options: [
        {
          id: 'independent',
          title: 'Independent and self-directed',
          icon: '🎯',
          description: 'Prefer working autonomously',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'collaborative',
          title: 'Collaborative team player',
          icon: '👥',
          description: 'Enjoy working with teams',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'creative',
          title: 'Creative and innovative thinker',
          icon: '💡',
          description: 'Focus on creative solutions',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 'structured',
          title: 'Structured and organized planner',
          icon: '📊',
          description: 'Methodical and process-oriented',
          color: 'from-emerald-100 to-green-200',
          bgColor: 'bg-emerald-50'
        }
      ]
    }
  ];

  // Particle animation
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particles = [];
    const colors = ['#86EFAC', '#4ADE80', '#22C55E', '#16A34A'];


    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.2 + 0.1};
        animation: float ${Math.random() * 8 + 6}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
      `;

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  const handleOptionSelect = (optionId) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep]: optionId
    }));
  };

  const animateTransition = (callback, dir) => {
    setIsAnimating(true);
    setDirection(dir);

    setTimeout(() => {
      callback();
      setTimeout(() => setIsAnimating(false), 300);
    }, 500);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      animateTransition(() => setCurrentStep(currentStep + 1), 'next');
    } else {
      navigate('/create');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      animateTransition(() => setCurrentStep(currentStep - 1), 'prev');
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const canProceed = answers[currentStep] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100  relative overflow-hidden">


      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-muted-foreground">
                Step {currentStep + 1} of {questions.length}
              </span>
              <span className="text-xs md:text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Main Question Container - Compact for mobile */}
          <div className={`bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 mb-6 transition-all duration-500 ${isAnimating
            ? direction === 'next'
              ? 'opacity-0 translate-x-8'
              : 'opacity-0 -translate-x-8'
            : 'opacity-100 translate-x-0'
            }`}>
            {/* Question Header - Compact */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-xs md:text-sm font-semibold text-primary">
                  Question {currentStep + 1}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                {currentQuestion.title}
              </h2>

              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options Grid - Compact for mobile */}
            <div className={`grid gap-3 md:gap-4 ${currentQuestion.options.length <= 4 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
              }`}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={option.id}
                  className={`transition-all duration-500 ${isAnimating
                    ? direction === 'next'
                      ? 'opacity-0 translate-y-4'
                      : 'opacity-0 -translate-y-4'
                    : 'opacity-100 translate-y-0'
                    }`}
                  style={{ transitionDelay: isAnimating ? '0ms' : `${index * 50}ms` }}
                >
                  <button
                    onClick={() => handleOptionSelect(option.id)}
                    className={`relative w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden ${answers[currentStep] === option.id
                      ? `border-primary bg-gradient-to-r ${option.color} shadow-medium transform scale-105`
                      : 'border-border bg-background/80 hover:border-primary hover:shadow-soft'
                      }`}
                  >
                    {/* Selection Indicator */}
                    {answers[currentStep] === option.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-background rounded-full flex items-center justify-center shadow-soft">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                      </div>
                    )}

                    {/* Icon Container */}
                    <div className={`mb-3 md:mb-4 p-2 md:p-3 rounded-lg md:rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 ${answers[currentStep] === option.id
                      ? 'bg-primary/10'
                      : `${option.bgColor} group-hover:scale-105`
                      }`}>
                      <span className={`text-lg md:text-xl transition-all duration-300 ${answers[currentStep] === option.id ? 'text-primary scale-110' : 'text-muted-foreground group-hover:text-foreground'
                        }`}>
                        {option.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1 md:space-y-2">
                      <h3 className={`text-sm md:text-base font-bold transition-colors duration-300 ${answers[currentStep] === option.id ? 'text-primary' : 'text-foreground'
                        }`}>
                        {option.title}
                      </h3>

                      <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${answers[currentStep] === option.id ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        {option.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 transition-opacity duration-300 ${answers[currentStep] === option.id ? 'opacity-10' : 'group-hover:opacity-5'
                      }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Compact for mobile */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || isAnimating}
              className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/create')}
                className="px-4 py-2 md:px-5 md:py-3 text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 text-sm md:text-base"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed || isAnimating}
                className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${canProceed
                  ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
              >
                {currentStep === questions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .min-h-screen {
          min-height: 100vh;
          max-height: 100vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default OnboardingQuestionnaire;