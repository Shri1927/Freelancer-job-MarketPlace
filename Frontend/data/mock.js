export const categories = [
  { name: 'Web Development', icon: '🌐' },
  { name: 'Mobile Apps', icon: '📱' },
  { name: 'UI/UX Design', icon: '🎨' },
  { name: 'Writing', icon: '✍️' },
  { name: 'Data Science', icon: '📊' },
  { name: 'DevOps', icon: '⚙️' },
  { name: 'Marketing', icon: '📈' },
  { name: 'Finance', icon: '💰' }
]

export const featuredJobs = [
  {
    id: 'j1',
    title: 'Build a React landing page',
    description: 'Create a responsive, accessible landing page with Tailwind and React. Integrate a contact form and analytics.',
    category: 'Web Development',
    budget: 500,
    location: 'Remote'
  },
  {
    id: 'j2',
    title: 'Figma to React components',
    description: 'Translate Figma designs into reusable, clean React components. Focus on design systems.',
    category: 'UI/UX Design',
    budget: 800,
    location: 'Remote'
  },
  {
    id: 'j3',
    title: 'Set up CI/CD for Node API',
    description: 'Configure GitHub Actions, Docker, and deployment pipeline for a Node.js API. Add basic monitoring.',
    category: 'DevOps',
    budget: 1200,
    location: 'Germany'
  },
]

export const jobs = [
  ...featuredJobs,
  {
    id: 'j4',
    title: 'Blog content writer',
    description: 'Write SEO-friendly blog posts about fintech trends. 4 posts per month.',
    category: 'Writing',
    rate: 30,
    location: 'Remote'
  },
]

export const slideshowData = [
  {
    id: 1,
    title: "Find the perfect freelancer for any job",
    subtitle: "From design to development, hire experts fast and manage your projects end‑to‑end.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    overlay: "bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-indigo-900/60"
  },
  {
    id: 2,
    title: "Connect with top talent worldwide",
    subtitle: "Access a global network of skilled professionals ready to bring your ideas to life.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    overlay: "bg-gradient-to-br from-emerald-900/60 via-teal-900/60 to-cyan-900/60"
  },
  {
    id: 3,
    title: "Scale your business with confidence",
    subtitle: "Build your dream team with verified freelancers and manage projects seamlessly.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    overlay: "bg-gradient-to-br from-rose-900/60 via-pink-900/60 to-red-900/60"
  },
  {
    id: 4,
    title: "Start your freelance journey today",
    subtitle: "Join thousands of successful freelancers and start earning from your skills.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    overlay: "bg-gradient-to-br from-amber-900/60 via-orange-900/60 to-yellow-900/60"
  }
]

export const featureCards = [
  { text: "No hiring fees", icon: "💳" },
  { text: "Secure messages", icon: "🔒" },
  { text: "Escrow ready", icon: "🛡️" },
  { text: "Global talent", icon: "🌍" }
]

export const howItWorks = [
  {
    step: 1,
    title: "Post Your Project",
    description: "Create a detailed job posting with your requirements, budget, and timeline. Be specific about what you need.",
    icon: "📝",
    color: "from-blue-500 to-blue-600"
  },
  {
    step: 2,
    title: "Review Proposals",
    description: "Receive proposals from qualified freelancers. Review their portfolios, ratings, and previous work.",
    icon: "👀",
    color: "from-green-500 to-green-600"
  },
  {
    step: 3,
    title: "Hire the Best Match",
    description: "Choose the freelancer that best fits your project. Start collaborating through our secure platform.",
    icon: "🤝",
    color: "from-purple-500 to-purple-600"
  },
  {
    step: 4,
    title: "Get Work Done",
    description: "Track progress, communicate securely, and pay safely through our escrow system. Get your project delivered on time.",
    icon: "✅",
    color: "from-orange-500 to-orange-600"
  }
]



