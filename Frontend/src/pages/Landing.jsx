import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Briefcase, Users, TrendingUp, Star } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Search,
      title: "Find Perfect Jobs",
      description: "Browse thousands of projects matching your skills and expertise"
    },
    {
      icon: Users,
      title: "Connect with Clients",
      description: "Build lasting relationships with clients worldwide"
    },
    {
      icon: Briefcase,
      title: "Secure Payments",
      description: "Get paid safely and on time with our escrow system"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Career",
      description: "Build your portfolio and increase your earning potential"
    }
  ];

  const categories = [
    { icon: "</>", title: "Development & IT" },
    { icon: "🎨", title: "Design & Creative" },
    { icon: "⚙️", title: "AI Services" },
    { icon: "🤝", title: "Sales & Marketing" },
    { icon: "✍️", title: "Writing & Translation" },
    { icon: "🧰", title: "Admin & Support" },
    { icon: "🏛️", title: "Finance & Accounting" },
    { icon: "⚖️", title: "Legal" },
    { icon: "👥", title: "HR & Training" },
    { icon: "🛠️", title: "Engineering & Architecture" }
  ];

  const stats = [
    { value: "50K+", label: "Active Projects" },
    { value: "25K+", label: "Freelancers" },
    { value: "$10M+", label: "Paid Out" },
    { value: "98%", label: "Satisfaction" }
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "Full Stack Developer",
      content: "FreelanceHub helped me find amazing clients and grow my business. The platform is intuitive and the payment system is reliable.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      content: "I've been using FreelanceHub for 2 years now. The quality of projects and clients is exceptional. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden px-4 py-24 bg-gradient-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute -top-40 left-1/3 w-96 h-96 bg-primary/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-primary/5 blur-[140px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-16 items-center">
            <div className="space-y-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/60 animate-fade-in">
                <span className="h-[1px] w-10 bg-primary/40" />
                Stop doing everything. Get access to the top 1% with Business Plus.
              </div>
              <h1 className="text-[clamp(2.8rem,6vw,4.8rem)] font-black leading-[1.05] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="text-foreground/80">Connecting clients in need</span>
                <span className="block text-foreground/70">to freelancers who</span>
                <span className="block text-transparent bg-gradient-primary bg-clip-text">deliver</span>
              </h1>
              <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white border border-primary/20 rounded-[32px] p-6 md:p-8 backdrop-blur-lg space-y-6 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex gap-2 text-xs uppercase tracking-widest text-foreground/70">
                    <button className="flex-1 rounded-full bg-primary text-white py-3 font-semibold shadow-sm hover:bg-primary-dark transition-all duration-300 hover:scale-105">
                      Find talent
                    </button>
                    <button className="flex-1 rounded-full border border-primary/30 text-foreground/70 py-3 font-semibold hover:text-primary hover:border-primary transition-all duration-300">
                      Browse jobs
                    </button>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Input
                      placeholder="Search by role, skills, or keywords"
                      className="bg-white border border-primary/20 text-foreground placeholder:text-foreground/40 focus:border-primary transition-all"
                    />
                    <Button className="bg-primary text-white px-6 font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105">
                      Search
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-5 text-[10px] tracking-[0.4em] uppercase text-foreground/40">
                    <span>Microsoft</span>
                    <span>airbnb</span>
                    <span>Glassdoor</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white border border-primary/20 rounded-[32px] p-8 backdrop-blur-xl shadow-medium space-y-6 hover:shadow-large transition-all duration-300 hover:scale-[1.02]">
                <p className="text-xs uppercase tracking-[0.4em] text-foreground/60">Live metrics</p>
                <div className="space-y-5">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: `${0.7 + index * 0.1}s` }}>
                      <span className="text-foreground/50 text-sm">{stat.label}</span>
                      <span className="text-3xl font-semibold text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-primary/20 rounded-[32px] p-8 backdrop-blur-xl shadow-medium space-y-4 hover:shadow-large transition-all duration-300 hover:scale-[1.02]">
                <p className="text-xs uppercase tracking-[0.4em] text-foreground/60">Why FreelanceHub</p>
                {features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-foreground/70 animate-fade-in-up" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <span>{feature.title}</span>
                    <span className="h-px w-10 bg-primary/30" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-b border-primary/10 bg-gradient-to-b from-white to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border border-primary/20 rounded-3xl px-6 py-8 bg-white hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">{stat.value}</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-foreground/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 animate-fade-in-up">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-foreground/50">Categories</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-foreground">Explore millions of pros</h2>
            </div>
            <p className="text-foreground/60 max-w-2xl">
              Browse curated categories to find specialized freelancers who match your goals.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group border border-primary/20 rounded-3xl px-6 py-8 flex flex-col gap-4 bg-white hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{cat.icon}</div>
                <div className="text-lg font-semibold text-foreground">{cat.title}</div>
                <div className="h-px w-12 bg-primary/30 group-hover:w-20 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 animate-fade-in-up">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-foreground/50">Why FreelanceHub?</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-foreground">Everything you need to succeed</h2>
            </div>
            <p className="text-foreground/60 max-w-2xl">
              Everything you need to succeed as a freelancer or find the perfect talent.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-primary/20 rounded-[32px] p-8 space-y-4 bg-white hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-large animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 animate-fade-in-up">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-foreground/50">Process</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-foreground">How it works</h2>
            </div>
            <p className="text-foreground/60 max-w-2xl">Simple steps to get started.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Your Profile", desc: "Sign up and showcase your skills" },
              { step: "2", title: "Browse & Apply", desc: "Find projects that match your expertise" },
              { step: "3", title: "Get Hired & Earn", desc: "Work with clients and get paid securely" }
            ].map((item, index) => (
              <div key={index} className="relative border border-primary/20 rounded-[32px] p-8 space-y-4 bg-white hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="text-primary/50 text-sm uppercase tracking-[0.5em]">Step {item.step}</div>
                <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-foreground/60">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-[-36px] w-16 h-px bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-white to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 animate-fade-in-up">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-foreground/50">Testimonials</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-foreground">What our users say</h2>
            </div>
            <p className="text-foreground/60 max-w-2xl">Join thousands of satisfied freelancers.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border border-primary/20 rounded-[32px] p-10 space-y-6 bg-white hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 text-lg leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-semibold mb-14 text-center text-foreground animate-fade-in-up">
            Clients only pay after hiring
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="border border-primary/20 rounded-[32px] p-10 space-y-6 bg-white hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Basic</h3>
                <p className="text-foreground/60 text-sm">For starting out</p>
              </div>
              <p className="text-xl font-medium text-primary">5% Service fee after hiring</p>
              <ul className="space-y-3 text-foreground/60 text-sm">
                <li>AI-powered features</li>
                <li>Collaboration and project tracking tools</li>
                <li>Pay as work is completed</li>
              </ul>
               <br /><br />  
              <Button variant="outline" className="w-full border-primary/30 text-foreground hover:bg-primary hover:text-white transition-all duration-300">
                Get started for free
              </Button>
            </div>
            <div className="border-2 border-primary rounded-[32px] p-10 space-y-6 bg-primary text-white shadow-2xl hover:shadow-large transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase">
                <span className="h-[1px] w-6 bg-white" />
                Popular
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Business Plus</h3>
                <p className="text-white/80 text-sm">For growing</p>
              </div>
              <p className="text-xl font-medium">10% Service fee after hiring</p>
              <ul className="space-y-3 text-white/90 text-sm">
                <li>Instant access to pre-vetted top 1% of talent</li>
                <li>Uma Recruiter</li>
                <li>Teams controls</li>
              </ul>
              <Button className="w-full bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105">Get started for free</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-primary text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.1), transparent 45%)" }} />
        <div className="container mx-auto px-4 text-center relative space-y-6 animate-fade-in-up">
          <p className="text-xs tracking-[0.4em] uppercase text-white/80">Ready?</p>
          <h2 className="text-3xl md:text-5xl font-semibold">Ready to Get Started?</h2>
          <p className="text-lg text-white/90">
            Join FreelanceHub today and take your career to the next level
          </p>
          <Link to="/signup"> 
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 transition-all duration-300 hover:scale-110 mt-2">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
