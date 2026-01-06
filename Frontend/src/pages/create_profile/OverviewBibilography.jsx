import { Star, Briefcase, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { useState } from "react"

export default function OverviewBibliography({ onBack, onNext, onSkip, showIndividualProgress = true }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [bio, setBio] = useState("");

  const progress = (8 / 10) * 100; // Step 8 out of 10

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-8">
              {/* Left side - Form */}
              <div className="max-w-2xl">
                {/* Question Header */}
                <div className="text-center mb-6 md:mb-8 lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span className="text-xs md:text-sm font-semibold text-primary">
                      Question 8
                    </span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                    Great. Now write a bio to tell the world about yourself.
                  </h2>
                  
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Help people get to know you at a glance. What work do you do best?
                    Tell them clearly, using paragraphs or bullet points. You can
                    always edit later; just make sure you proofread now.
                  </p>
                </div>

                <div className="relative">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
                    className="w-full h-32 md:h-40 px-4 py-3 border-2 border-input rounded-lg resize-none focus:outline-none focus:border-primary transition-colors text-foreground placeholder-muted-foreground bg-background/50 backdrop-blur-sm"
                    maxLength={5000}
                  />
                  <div className="text-right mt-2 text-sm text-muted-foreground">
                    {bio.length}/5000 characters (minimum 100)
                  </div>
                </div>
              </div>

              {/* Right side - Preview card */}
              <div className="flex items-start justify-center lg:justify-end">
                <div className="bg-card backdrop-blur-sm border-2 border-border rounded-xl md:rounded-2xl p-4 md:p-8 shadow-medium max-w-sm w-full">
                  {/* Profile image with orange status indicator */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                    <img
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full border-2 border-card"></div>
                  </div>

                  {/* Name */}
                  <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-3 md:mb-4">
                    Marti G.
                  </h2>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm text-foreground/80">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" />
                      <span className="font-semibold">5.0</span>
                    </div>
                    <div className="font-semibold">$75.00/hr</div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-semibold">14 jobs</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="text-foreground/80 text-xs md:text-sm leading-relaxed space-y-3 md:space-y-4">
                    <p>
                      I'm a developer experienced in building websites for small and
                      medium-sized businesses. Whether you're trying to win work,
                      list your services, or create a new online store, I can help.
                    </p>

                    <ul className="space-y-1 md:space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          Knows HTML and CSS3, PHP, jQuery, Wordpress, and SEO
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Full project management from start to finish</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          Regular communication is important to me, so let's keep in
                          touch.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                disabled={bio.length < 100}
                className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                  bio.length >= 100
                    ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Next, set your rate
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}