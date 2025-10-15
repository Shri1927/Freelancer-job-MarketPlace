import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import JobCard from '../components/JobCard.jsx'
import { featuredJobs, categories, slideshowData, featureCards, howItWorks } from '../data/mock.js'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Diagonal Strip */}
        <div className="absolute -bottom-20 -left-20 w-96 h-2 bg-gradient-to-r from-orange-400 to-orange-600 opacity-30 animate-slide-diagonal"></div>
        
        {/* Circular Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-400 rounded-full opacity-20 animate-rotate"></div>
        <div className="absolute top-1/3 left-10 w-24 h-24 bg-orange-500 rounded-full opacity-25 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-orange-300 rounded-full opacity-30 animate-float-up"></div>
        
        {/* Wave Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-1 bg-gradient-to-r from-orange-400 to-transparent opacity-40 animate-wave"></div>
        <div className="absolute bottom-1/3 right-0 w-48 h-1 bg-gradient-to-l from-orange-500 to-transparent opacity-35 animate-wave" style={{animationDelay: '2s'}}></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-orange-400 rounded-full opacity-20 animate-float-up" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/2 right-1/4 w-12 h-12 bg-orange-500 rounded-full opacity-25 animate-pulse-slow" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-6 h-6 bg-orange-300 rounded-full opacity-30 animate-float-up" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero with Slideshow */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center z-10">
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {slideshowData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Dark overlay for text readability */}
              <div className={`absolute inset-0 ${slide.overlay}`} />
              {/* Additional dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Animated geometric shapes */}
              <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
              <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/5 rounded-lg rotate-45 animate-bounce" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/8 rounded-full animate-ping" />
              <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-white/6 rounded-lg rotate-12 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="mx-auto max-w-6xl text-center">
            <div className="relative h-32 sm:h-40 lg:h-48 flex items-center">
              <h1 className="text-5xl sm:text-7xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
                {slideshowData[currentSlide].title}
              </h1>
              <div className="absolute inset-0 bg-black/20 blur-sm -z-10 rounded-lg" />
            </div>
            
            <div className="relative mt-8 h-20 sm:h-24 lg:h-28 flex items-center">
              <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto drop-shadow-lg">
                {slideshowData[currentSlide].subtitle}
              </p>
              <div className="absolute inset-0 bg-black/10 blur-sm -z-10 rounded-lg" />
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs" className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 text-lg font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl">
                Explore Jobs
              </Link>
              <Link to="/post-job" className="px-8 py-4 bg-black/20 backdrop-blur-md text-white rounded-lg hover:bg-black/30 text-lg font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl">
                Post a Job
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-base text-white/80">
              {featureCards.map((feature, index) => (
                <div key={index} className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-2 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div>{feature.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slideshowData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slideshowData.length) % slideshowData.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slideshowData.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Categories */}
      <section className="w-full py-16 bg-white border-y border-gray-200 relative overflow-hidden">
        {/* Background Elements for Categories */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-orange-300 rounded-full opacity-25 animate-float-up"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Browse by category</h2>
            <Link to="/jobs" className="text-lg text-primary-700 hover:underline font-medium">View all</Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <Link 
                key={category.name} 
                to={`/jobs?category=${encodeURIComponent(category.name)}`} 
                className="px-6 py-3 bg-gray-50 hover:bg-white border border-gray-200 rounded-full text-base text-gray-700 hover:border-primary-500 hover:text-primary-700 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Elements for How It Works */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-32 h-1 bg-gradient-to-r from-orange-400 to-transparent opacity-40 animate-wave"></div>
          <div className="absolute bottom-1/4 right-0 w-24 h-1 bg-gradient-to-l from-orange-500 to-transparent opacity-35 animate-wave" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-orange-300 rounded-full opacity-20 animate-float-up"></div>
          <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-orange-400 rounded-full opacity-25 animate-pulse-slow"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How FreelanceHub Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your projects done in 4 simple steps. From posting your job to receiving the final deliverable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Step Number Circle */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {step.step}
                </div>
                
                {/* Step Content */}
                <div className="text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connecting Arrow (except for last step) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 transform translate-x-4">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link 
              to="/post-job" 
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-lg font-semibold transition-colors shadow-lg"
            >
              Get Started Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="w-full py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Elements for Featured Jobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-25 animate-rotate"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float-up"></div>
          <div className="absolute top-1/2 right-1/3 w-10 h-10 bg-orange-300 rounded-full opacity-20 animate-pulse-slow"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Featured jobs</h2>
            <Link to="/jobs" className="text-lg text-primary-700 hover:underline font-medium">View all</Link>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 sm:px-16 py-16 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h3 className="text-4xl font-bold">Ready to get started?</h3>
              <p className="mt-4 text-xl text-white/90">Create a job post in minutes and start receiving proposals today.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/post-job" className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">Post a Job</Link>
              <Link to="/jobs" className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-lg transition-colors">Browse Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


