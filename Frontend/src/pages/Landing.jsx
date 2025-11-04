import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr,520px] gap-10 items-center">
            <div>
              <p className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-medium text-foreground/80 mb-4">
                Stop doing everything. Get access to the top 1% with Business Plus.
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Connecting clients in need to freelancers who
                <span className="block bg-gradient-primary bg-clip-text text-transparent">deliver</span>
              </h1>
              <div className="mt-6 bg-foreground/90 text-background rounded-2xl p-4 md:p-6 shadow-lg max-w-xl">
                <div className="flex gap-2 text-sm mb-4">
                  <button className="flex-1 rounded-full bg-background text-foreground px-4 py-2 font-medium">
                    Find talent
                  </button>
                  <button className="flex-1 rounded-full/ bg-transparent text-background/80 px-4 py-2 font-medium opacity-80">
                    Browse jobs
                  </button>
                </div>
                <div className="flex gap-2 items-center">
                  <Input placeholder="Search by role, skills, or keywords" className="bg-background text-foreground" />
                  <Button className="bg-gradient-primary px-6">Search</Button>
                </div>
                <div className="mt-3 flex items-center gap-6 opacity-80 text-xs">
                  <span>Microsoft</span>
                  <span>airbnb</span>
                  <span>Glassdoor</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block rounded-3xl overflow-hidden shadow-large">
              <div className="aspect-[4/3] bg-gradient-primary/30" />
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

      {/* Explore Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore millions of pros</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <Card key={i} className="p-6 hover:shadow-medium transition-all">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-2xl mb-3 bg-secondary">
                  {cat.icon}
                </div>
                <div className="font-medium">{cat.title}</div>
              </Card>
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

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Clients only pay after hiring</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-1">Basic</h3>
              <p className="text-sm text-muted-foreground mb-6">For starting out</p>
              <p className="font-medium mb-6">5% Service fee after hiring</p>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                <li>AI-powered features</li>
                <li>Collaboration and project tracking tools</li>
                <li>Pay as work is completed</li>
              </ul>
              <Button variant="outline" className="w-full">Get started for free</Button>
            </Card>
            <Card className="p-8 border-2" style={{ borderColor: "hsl(var(--primary))" }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium mb-4">POPULAR</div>
              <h3 className="text-2xl font-semibold mb-1">Business Plus</h3>
              <p className="text-sm text-muted-foreground mb-6">For growing</p>
              <p className="font-medium mb-6">10% Service fee after hiring</p>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                <li>Instant access to pre-vetted top 1% of talent</li>
                <li>Uma Recruiter</li>
                <li>Teams controls</li>
              </ul>
              <Button className="w-full bg-gradient-primary">Get started for free</Button>
            </Card>
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
