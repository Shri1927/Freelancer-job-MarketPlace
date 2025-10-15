import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Briefcase, Users, TrendingUp, CheckCircle, Star } from "lucide-react";

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
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Next{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Great Project
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Connect with top freelancers or find your dream job. Join thousands of professionals building their success on FreelanceHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
                  Find Jobs
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreelanceHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed as a freelancer or find the perfect talent
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-medium transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Simple steps to get started</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Create Your Profile", desc: "Sign up and showcase your skills" },
              { step: "2", title: "Browse & Apply", desc: "Find projects that match your expertise" },
              { step: "3", title: "Get Hired & Earn", desc: "Work with clients and get paid securely" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">Join thousands of satisfied freelancers</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">Join FreelanceHub today and take your career to the next level</p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
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
