import React, { useState } from "react";
import { Trash2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const LanguageProficiency = ({ onBack, onNext, onSkip, showIndividualProgress = true }) => {
  const [languages, setLanguages] = useState([
    { language: "Marathi (Marāṭhī)", level: "Fluent" },
    { language: "Hindi", level: "Native or Bilingual" },
    { language: "Telugu", level: "Fluent" },
  ]);

  const [newLang, setNewLang] = useState({ language: "", level: "" });
  const [isAnimating, setIsAnimating] = useState(false);

  const addLanguage = () => {
    if (newLang.language && newLang.level) {
      setLanguages([...languages, newLang]);
      setNewLang({ language: "", level: "" });
    }
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const levels = ["Basic", "Conversational", "Fluent", "Native or Bilingual"];
  const availableLanguages = [
    "English",
    "Marathi (Marāṭhī)",
    "Hindi",
    "Telugu",
    "Tamil",
    "Kannada",
    "Malayalam",
    "Gujarati",
  ];

  const progress = (7 / 10) * 100; // Step 7 out of 10

  const animateTransition = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleNext = () => {
    animateTransition(onNext);
  };

  const handleBack = () => {
    animateTransition(onBack);
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
                  Question 7
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                Looking good. Next, tell us which languages you speak.
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Upwork is global, so clients are often interested to know what languages you speak. English is a must, but do you speak any other languages?
              </p>
            </div>

            {/* English Info */}
            <div className="border-b border-border pb-6 mb-4">
              <p className="text-foreground mb-4 font-medium">
                English (all profiles include this)
              </p>

              {/* Existing Languages */}
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-3 gap-3"
                >
                  <select
                    value={lang.language}
                    className="border-2 border-input rounded-lg p-2 w-[45%] focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm text-sm"
                    onChange={(e) => {
                      const updated = [...languages];
                      updated[index].language = e.target.value;
                      setLanguages(updated);
                    }}
                  >
                    {availableLanguages.map((l, i) => (
                      <option key={i} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>

                  <select
                    value={lang.level}
                    className="border-2 border-input rounded-lg p-2 w-[45%] focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm text-sm"
                    onChange={(e) => {
                      const updated = [...languages];
                      updated[index].level = e.target.value;
                      setLanguages(updated);
                    }}
                  >
                    {levels.map((lvl, i) => (
                      <option key={i} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeLanguage(index)}
                    className="text-primary hover:text-destructive transition ml-2 p-2 hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {/* Add new language section */}
              <div className="flex items-center justify-between gap-3 mt-6">
                <select
                  value={newLang.language}
                  onChange={(e) =>
                    setNewLang({ ...newLang, language: e.target.value })
                  }
                  className="border-2 border-input rounded-lg p-2 w-[45%] focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm text-sm"
                >
                  <option value="">Select Language</option>
                  {availableLanguages.map((l, i) => (
                    <option key={i} value={l}>
                      {l}
                    </option>
                  ))}
                </select>

                <select
                  value={newLang.level}
                  onChange={(e) =>
                    setNewLang({ ...newLang, level: e.target.value })
                  }
                  className="border-2 border-input rounded-lg p-2 w-[45%] focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm text-sm"
                >
                  <option value="">My level is</option>
                  {levels.map((lvl, i) => (
                    <option key={i} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={addLanguage}
                disabled={!newLang.language || !newLang.level}
                className="mt-5 px-4 py-2 border-2 border-primary rounded-lg text-primary font-medium hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + Add a language
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onSkip}
                className="px-4 py-2 md:px-5 md:py-3 text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 text-sm md:text-base"
              >
                Skip for now
              </button>
              <button
                onClick={handleNext}
                className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                  'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                }`}
              >
                Next, write an overview
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageProficiency;