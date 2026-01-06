export const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    description:
      "Complete redesign of the existing e-commerce platform with modern UI/UX, improved checkout flow, and mobile-first approach. Focus on conversion optimization and user experience.",
    client: {
      name: "TechCorp Inc",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=TC&backgroundColor=3b82f6",
      rating: 4.9,
      totalProjects: 23,
      responseTime: "< 2 hours",
      location: "San Francisco, CA",
      memberSince: "Jan 2022"
    },
    deadline: "2024-02-15",
    status: "in-progress",
    progress: 75,
    budget: 8500,
    paid: 4250,
    hoursSpent: 62,
    hoursEstimated: 80,
    priority: "high",
    healthStatus: "on-track",
    lastActivity: "2 hours ago",
    unreadMessages: 3,
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma", "Node.js"],
    requirements: [
      "Responsive design for all devices",
      "Optimized checkout process",
      "Integration with existing backend APIs",
      "SEO-friendly structure",
      "Accessibility compliance (WCAG 2.1)"
    ],
    deliverables: [
      "High-fidelity mockups",
      "Interactive prototype",
      "Production-ready frontend code",
      "Documentation",
      "30-day post-launch support"
    ],
    milestones: [
      {
        id: 1,
        title: "Discovery & Research",
        amount: 1500,
        status: "paid",
        dueDate: "2024-01-15"
      },
      {
        id: 2,
        title: "UI/UX Design",
        amount: 2500,
        status: "paid",
        dueDate: "2024-01-28"
      },
      {
        id: 3,
        title: "Frontend Development",
        amount: 3000,
        status: "in-escrow",
        dueDate: "2024-02-10"
      },
      {
        id: 4,
        title: "Testing & Launch",
        amount: 1500,
        status: "pending",
        dueDate: "2024-02-15"
      }
    ],
    files: [
      {
        id: 1,
        name: "project_brief.pdf",
        type: "client-brief",
        date: "2024-01-10",
        size: "2.4 MB"
      },
      {
        id: 2,
        name: "brand_guidelines.pdf",
        type: "reference",
        date: "2024-01-10",
        size: "8.1 MB"
      },
      {
        id: 3,
        name: "mockups_v2.fig",
        type: "deliverable",
        date: "2024-01-25",
        size: "45.2 MB"
      },
      {
        id: 4,
        name: "source_code.zip",
        type: "deliverable",
        date: "2024-02-05",
        size: "12.8 MB"
      }
    ],
    messages: [
      {
        id: 1,
        sender: "client",
        content:
          "Great progress on the homepage! Can we add a promotional banner section?",
        timestamp: "2024-02-08T10:30:00",
        read: true
      },
      {
        id: 2,
        sender: "freelancer",
        content:
          "Absolutely! I'll include that in the next iteration. Should it be above or below the hero section?",
        timestamp: "2024-02-08T11:15:00",
        read: true
      },
      {
        id: 3,
        sender: "client",
        content:
          "Below the hero would be perfect. Also, can you share an update on the checkout flow?",
        timestamp: "2024-02-08T14:00:00",
        read: false
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Complete checkout redesign",
        status: "in-progress",
        dueDate: "2024-02-10",
        priority: "high"
      },
      {
        id: 2,
        title: "Mobile optimization",
        status: "pending",
        dueDate: "2024-02-12",
        priority: "high"
      },
      {
        id: 3,
        title: "Performance testing",
        status: "pending",
        dueDate: "2024-02-14",
        priority: "medium"
      }
    ],
    category: "Web Development"
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    description:
      "Design a complete mobile application for fitness tracking with gamification elements, social features, and personalized workout recommendations.",
    client: {
      name: "FitLife Studios",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=FL&backgroundColor=10b981",
      rating: 4.7,
      totalProjects: 8,
      responseTime: "< 4 hours",
      location: "Austin, TX",
      memberSince: "Mar 2023"
    },
    deadline: "2024-02-20",
    status: "in-progress",
    progress: 45,
    budget: 5000,
    paid: 1500,
    hoursSpent: 28,
    hoursEstimated: 60,
    priority: "medium",
    healthStatus: "needs-attention",
    lastActivity: "1 day ago",
    unreadMessages: 1,
    skills: [
      "Figma",
      "Mobile UI",
      "iOS Design",
      "Android Design",
      "Prototyping"
    ],
    requirements: [
      "iOS and Android design systems",
      "Gamification elements",
      "Social sharing features",
      "Dark mode support"
    ],
    deliverables: [
      "Complete UI kit",
      "Interactive prototype",
      "Design specifications",
      "Asset exports"
    ],
    milestones: [
      {
        id: 1,
        title: "Research & Wireframes",
        amount: 1500,
        status: "paid",
        dueDate: "2024-01-25"
      },
      {
        id: 2,
        title: "High-fidelity Designs",
        amount: 2000,
        status: "in-escrow",
        dueDate: "2024-02-10"
      },
      {
        id: 3,
        title: "Prototype & Handoff",
        amount: 1500,
        status: "pending",
        dueDate: "2024-02-20"
      }
    ],
    files: [
      {
        id: 1,
        name: "competitor_analysis.pdf",
        type: "reference",
        date: "2024-01-20",
        size: "5.6 MB"
      },
      {
        id: 2,
        name: "wireframes_v1.fig",
        type: "deliverable",
        date: "2024-01-28",
        size: "22.4 MB"
      }
    ],
    messages: [
      {
        id: 1,
        sender: "client",
        content:
          "The wireframes look good! When can we see the first high-fidelity screens?",
        timestamp: "2024-02-07T09:00:00",
        read: false
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Dashboard screen design",
        status: "in-progress",
        dueDate: "2024-02-09",
        priority: "high"
      },
      {
        id: 2,
        title: "Workout tracking screens",
        status: "pending",
        dueDate: "2024-02-12",
        priority: "medium"
      },
      {
        id: 3,
        title: "Social features screens",
        status: "pending",
        dueDate: "2024-02-15",
        priority: "low"
      }
    ],
    category: "UI/UX Design"
  },
  {
    id: 3,
    title: "Brand Identity Package",
    description:
      "Create a comprehensive brand identity for a sustainable fashion startup including logo, color palette, typography, and brand guidelines.",
    client: {
      name: "EcoWear Co",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=EW&backgroundColor=f59e0b",
      rating: 5.0,
      totalProjects: 3,
      responseTime: "< 6 hours",
      location: "Portland, OR",
      memberSince: "Nov 2023"
    },
    deadline: "2024-02-12",
    status: "pending-review",
    progress: 90,
    budget: 3500,
    paid: 2100,
    hoursSpent: 35,
    hoursEstimated: 40,
    priority: "high",
    healthStatus: "on-track",
    lastActivity: "5 hours ago",
    unreadMessages: 0,
    skills: ["Branding", "Logo Design", "Adobe Illustrator", "Typography"],
    requirements: [
      "Eco-friendly aesthetic",
      "Versatile logo variations",
      "Print and digital applications"
    ],
    deliverables: [
      "Primary and secondary logos",
      "Color palette",
      "Typography system",
      "Brand guidelines PDF"
    ],
    milestones: [
      {
        id: 1,
        title: "Discovery & Concepts",
        amount: 1000,
        status: "paid",
        dueDate: "2024-01-20"
      },
      {
        id: 2,
        title: "Logo Development",
        amount: 1100,
        status: "paid",
        dueDate: "2024-02-01"
      },
      {
        id: 3,
        title: "Brand Guidelines",
        amount: 1400,
        status: "requested",
        dueDate: "2024-02-12"
      }
    ],
    files: [
      {
        id: 1,
        name: "brand_strategy.pdf",
        type: "client-brief",
        date: "2024-01-15",
        size: "1.8 MB"
      },
      {
        id: 2,
        name: "logo_concepts.ai",
        type: "deliverable",
        date: "2024-01-28",
        size: "15.2 MB"
      },
      {
        id: 3,
        name: "brand_guidelines_v1.pdf",
        type: "deliverable",
        date: "2024-02-08",
        size: "28.5 MB"
      }
    ],
    messages: [],
    tasks: [
      {
        id: 1,
        title: "Final revisions",
        status: "completed",
        priority: "high"
      },
      {
        id: 2,
        title: "Export all assets",
        status: "in-progress",
        priority: "medium"
      }
    ],
    category: "Branding"
  },
  {
    id: 4,
    title: "API Integration & Backend",
    description:
      "Develop REST APIs and integrate third-party services for a SaaS analytics dashboard including Stripe, Twilio, and various data providers.",
    client: {
      name: "DataMetrics Pro",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=DM&backgroundColor=8b5cf6",
      rating: 4.6,
      totalProjects: 15,
      responseTime: "< 1 hour",
      location: "New York, NY",
      memberSince: "Aug 2021"
    },
    deadline: "2024-02-25",
    status: "in-progress",
    progress: 30,
    budget: 12000,
    paid: 3600,
    hoursSpent: 45,
    hoursEstimated: 150,
    priority: "medium",
    healthStatus: "on-track",
    lastActivity: "30 minutes ago",
    unreadMessages: 5,
    skills: ["Node.js", "PostgreSQL", "REST API", "AWS", "Docker"],
    requirements: [
      "RESTful API architecture",
      "OAuth 2.0 authentication",
      "Rate limiting and caching",
      "Comprehensive documentation"
    ],
    deliverables: [
      "API endpoints",
      "Database schema",
      "Integration tests",
      "API documentation"
    ],
    milestones: [
      {
        id: 1,
        title: "Architecture & Setup",
        amount: 3600,
        status: "paid",
        dueDate: "2024-01-30"
      },
      {
        id: 2,
        title: "Core API Development",
        amount: 4200,
        status: "in-escrow",
        dueDate: "2024-02-15"
      },
      {
        id: 3,
        title: "Integrations",
        amount: 2400,
        status: "pending",
        dueDate: "2024-02-22"
      },
      {
        id: 4,
        title: "Testing & Docs",
        amount: 1800,
        status: "pending",
        dueDate: "2024-02-25"
      }
    ],
    files: [
      {
        id: 1,
        name: "api_specs.yaml",
        type: "reference",
        date: "2024-01-25",
        size: "156 KB"
      },
      {
        id: 2,
        name: "db_schema.sql",
        type: "deliverable",
        date: "2024-01-30",
        size: "42 KB"
      }
    ],
    messages: [
      {
        id: 1,
        sender: "client",
        content: "Need to discuss the webhook implementation for Stripe",
        timestamp: "2024-02-08T16:00:00",
        read: false
      },
      {
        id: 2,
        sender: "client",
        content: "Also, what's the ETA on the authentication endpoints?",
        timestamp: "2024-02-08T16:05:00",
        read: false
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Stripe webhook handlers",
        status: "in-progress",
        dueDate: "2024-02-10",
        priority: "high"
      },
      {
        id: 2,
        title: "User authentication API",
        status: "in-progress",
        dueDate: "2024-02-11",
        priority: "high"
      },
      {
        id: 3,
        title: "Data aggregation endpoints",
        status: "pending",
        dueDate: "2024-02-15",
        priority: "medium"
      }
    ],
    category: "Backend Development"
  },
  {
    id: 5,
    title: "Marketing Website",
    description:
      "Build a high-converting marketing website for a B2B software company with animated sections, case studies, and lead generation forms.",
    client: {
      name: "CloudSync Solutions",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=CS&backgroundColor=06b6d4",
      rating: 4.8,
      totalProjects: 11,
      responseTime: "< 3 hours",
      location: "Seattle, WA",
      memberSince: "Jun 2022"
    },
    deadline: "2024-02-08",
    status: "in-progress",
    progress: 85,
    budget: 6000,
    paid: 4500,
    hoursSpent: 48,
    hoursEstimated: 55,
    priority: "high",
    healthStatus: "at-risk",
    lastActivity: "45 minutes ago",
    unreadMessages: 2,
    skills: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "CMS"],
    requirements: [
      "Smooth scroll animations",
      "CMS integration",
      "SEO optimization",
      "Fast loading times"
    ],
    deliverables: [
      "Complete website",
      "CMS setup",
      "SEO configuration",
      "Analytics integration"
    ],
    milestones: [
      {
        id: 1,
        title: "Design Approval",
        amount: 1500,
        status: "paid",
        dueDate: "2024-01-20"
      },
      {
        id: 2,
        title: "Development",
        amount: 3000,
        status: "paid",
        dueDate: "2024-02-05"
      },
      {
        id: 3,
        title: "Launch & Optimization",
        amount: 1500,
        status: "in-escrow",
        dueDate: "2024-02-08"
      }
    ],
    files: [
      {
        id: 1,
        name: "content_doc.docx",
        type: "client-brief",
        date: "2024-01-15",
        size: "890 KB"
      },
      {
        id: 2,
        name: "design_review.fig",
        type: "deliverable",
        date: "2024-01-22",
        size: "38.5 MB"
      }
    ],
    messages: [
      {
        id: 1,
        sender: "client",
        content:
          "The animations look fantastic! One small change on the pricing section?",
        timestamp: "2024-02-08T11:00:00",
        read: false
      },
      {
        id: 2,
        sender: "client",
        content: "Can we launch by end of day tomorrow?",
        timestamp: "2024-02-08T11:30:00",
        read: false
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Final content updates",
        status: "in-progress",
        dueDate: "2024-02-08",
        priority: "high"
      },
      {
        id: 2,
        title: "Performance optimization",
        status: "in-progress",
        dueDate: "2024-02-08",
        priority: "high"
      },
      {
        id: 3,
        title: "Launch checklist",
        status: "pending",
        dueDate: "2024-02-08",
        priority: "high"
      }
    ],
    category: "Web Development"
  }
]

export const mockNotifications = [
  {
    id: 1,
    type: "deadline",
    level: "urgent",
    title: "Deadline Today!",
    message: "Marketing Website launch is due today",
    projectId: 5,
    timestamp: "2024-02-08T08:00:00",
    read: false
  },
  {
    id: 2,
    type: "message",
    level: "warning",
    title: "Unread Messages",
    message: "5 messages from DataMetrics Pro await your response",
    projectId: 4,
    timestamp: "2024-02-08T07:30:00",
    read: false
  },
  {
    id: 3,
    type: "payment",
    level: "info",
    title: "Payment Requested",
    message: "Awaiting release for Brand Identity Package",
    projectId: 3,
    timestamp: "2024-02-08T06:00:00",
    read: false
  },
  {
    id: 4,
    type: "deadline",
    level: "warning",
    title: "Deadline in 4 Days",
    message: "Brand Identity Package due Feb 12",
    projectId: 3,
    timestamp: "2024-02-08T05:00:00",
    read: true
  },
  {
    id: 5,
    type: "approval",
    level: "info",
    title: "Work Approved",
    message: "E-Commerce Platform milestone 2 approved",
    projectId: 1,
    timestamp: "2024-02-07T18:00:00",
    read: true
  }
]

export const mockTransactions = [
  {
    id: 1,
    type: "credit",
    amount: 2500,
    projectTitle: "E-Commerce Platform",
    date: "2024-02-07"
  },
  {
    id: 2,
    type: "pending",
    amount: 1400,
    projectTitle: "Brand Identity",
    date: "2024-02-08"
  },
  {
    id: 3,
    type: "escrow",
    amount: 3000,
    projectTitle: "E-Commerce Platform",
    date: "2024-02-05"
  },
  {
    id: 4,
    type: "escrow",
    amount: 2000,
    projectTitle: "Mobile App UI",
    date: "2024-02-01"
  },
  {
    id: 5,
    type: "credit",
    amount: 1100,
    projectTitle: "Brand Identity",
    date: "2024-02-01"
  }
]

export const todaysPriorities = [
  {
    id: 1,
    task: "Launch Marketing Website",
    project: "CloudSync Solutions",
    dueTime: "End of day",
    priority: "high"
  },
  {
    id: 2,
    task: "Reply to client messages",
    project: "DataMetrics Pro",
    dueTime: "5 pending",
    priority: "high"
  },
  {
    id: 3,
    task: "Complete checkout redesign",
    project: "TechCorp Inc",
    dueTime: "Feb 10",
    priority: "medium"
  },
  {
    id: 4,
    task: "Dashboard screen design",
    project: "FitLife Studios",
    dueTime: "Feb 9",
    priority: "medium"
  }
]
