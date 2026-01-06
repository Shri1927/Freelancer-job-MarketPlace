import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

export default function HourlyRate({ onBack, onNext, onSkip, showIndividualProgress = true }) {
  const [hourlyRate, setHourlyRate] = useState("")
  const [serviceFee, setServiceFee] = useState("0.00")
  const [youllGet, setYoullGet] = useState("0.00")
  const [isAnimating, setIsAnimating] = useState(false)

  const progress = (9 / 10) * 100; // Step 9 out of 10

  useEffect(() => {
    const rate = parseFloat(hourlyRate) || 0
    const feePercentage = 0.1
    const fee = rate * feePercentage
    const net = rate - fee

    setServiceFee(fee.toFixed(2))
    setYoullGet(net.toFixed(2))
  }, [hourlyRate])

  const handleRateChange = e => {
    const value = e.target.value.replace('$', '')
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setHourlyRate(value)
    }
  }

  const displayRate = hourlyRate || ""

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
                  Question 9
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                Now, let's set your hourly rate.
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Clients will see this rate on your profile and in search results once
                you publish your profile. You can adjust your rate every time you
                submit a proposal.
              </p>
            </div>

            {/* Hourly rate section - Single line layout */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8 py-4 border-b border-border">
              <div className="flex-1 max-w-2xl mb-3 md:mb-0">
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-1.5">
                  Hourly rate
                </h2>
                <p className="text-foreground/80 text-sm">
                  Total amount the client will see.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={displayRate}
                    onChange={handleRateChange}
                    placeholder="0.00"
                    className="w-40 md:w-52 px-4 py-2.5 border-2 border-input rounded-lg focus:outline-none focus:border-primary transition-colors text-right text-foreground text-base bg-background/50 backdrop-blur-sm"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-base">$</span>
                </div>
                <span className="text-foreground/80 text-base">/hr</span>
              </div>
            </div>

            {/* Service fee section - Single line layout */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8 py-4 border-b border-border">
              <div className="flex-1 max-w-2xl mb-3 md:mb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h2 className="text-lg md:text-xl font-bold text-foreground">
                    Service fee
                  </h2>
                  <a
                    href="#"
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    Learn more
                  </a>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  This helps us run the platform and provide services like payment
                  protection and customer support. Fees vary and are shown before
                  contract acceptance.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-40 md:w-52 px-4 py-2.5 bg-muted/50 backdrop-blur-sm border-2 border-input rounded-lg text-right text-muted-foreground text-base">
                  ${serviceFee}
                </div>
                <span className="text-foreground/80 text-base">/hr</span>
              </div>
            </div>

            {/* You'll get section - Single line layout */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 py-4">
              <div className="flex-1 max-w-2xl mb-3 md:mb-0">
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-1.5">
                  You'll get
                </h2>
                <p className="text-foreground/80 text-sm">
                  The estimated amount you'll receive after service fees
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-40 md:w-52 px-4 py-2.5 border-2 border-input rounded-lg text-right text-foreground text-base bg-background/50 backdrop-blur-sm">
                  ${youllGet}
                </div>
                <span className="text-foreground/80 text-base">/hr</span>
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
                className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                  hourlyRate && parseFloat(hourlyRate) > 0
                    ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Next, add your photo and location
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}