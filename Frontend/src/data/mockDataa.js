const currentUserId = "user-1"

export const mockConversations = [
  {
    id: "1",
    client: {
      id: "client-1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      online: true,
      lastSeen: "Online"
    },
    lastMessage: "Can we schedule a call tomorrow to discuss the project?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 3,
    project: "Website Redesign",
    isFavorite: true,
    isArchived: false,
    isGroup: false,
    messages: [
      {
        id: "m1",
        conversationId: "1",
        senderId: "client-1",
        content: "Hi! I loved the initial mockups you sent.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        status: "read",
        type: "text"
      },
      {
        id: "m2",
        conversationId: "1",
        senderId: currentUserId,
        content:
          "Thank you so much! I'm glad you liked them. I put a lot of effort into capturing your brand aesthetic.",
        timestamp: new Date(Date.now() - 1000 * 60 * 55),
        status: "read",
        type: "text"
      },
      {
        id: "m3",
        conversationId: "1",
        senderId: "client-1",
        content:
          "The color palette is perfect. Quick question - can we add a dark mode option?",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        status: "read",
        type: "text"
      },
      {
        id: "m4",
        conversationId: "1",
        senderId: currentUserId,
        content:
          "Absolutely! I'll include dark mode variants in the next iteration.",
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
        status: "read",
        type: "text"
      },
      {
        id: "m5",
        conversationId: "1",
        senderId: currentUserId,
        content: "Here's the updated proposal with the additional scope.",
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        status: "read",
        type: "file",
        attachment: {
          name: "Proposal_v2.pdf",
          size: "2.4 MB",
          url: "#",
          type: "pdf"
        }
      },
      {
        id: "m6",
        conversationId: "1",
        senderId: "client-1",
        content: "Can we schedule a call tomorrow to discuss the project?",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        status: "delivered",
        type: "text"
      }
    ]
  },
  {
    id: "2",
    client: {
      id: "client-2",
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      online: false,
      lastSeen: "2h ago"
    },
    lastMessage: "The logo files have been uploaded to the shared drive.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    project: "Brand Identity",
    isFavorite: true,
    isArchived: false,
    isGroup: false,
    messages: [
      {
        id: "m7",
        conversationId: "2",
        senderId: "client-2",
        content: "The logo files have been uploaded to the shared drive.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: "read",
        type: "text"
      }
    ]
  },
  {
    id: "3",
    client: {
      id: "client-3",
      name: "Emma Williams",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5.0,
      online: true,
      lastSeen: "Online"
    },
    lastMessage: "Payment of ₹25,000 received. Thank you!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unreadCount: 1,
    project: "Mobile App UI",
    isFavorite: false,
    isArchived: false,
    isGroup: false,
    messages: [
      {
        id: "m8",
        conversationId: "3",
        senderId: currentUserId,
        content: "Payment of ₹25,000 received. Thank you!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        status: "read",
        type: "payment",
        paymentRequest: {
          amount: 25000,
          currency: "INR",
          status: "paid"
        }
      }
    ]
  },
  {
    id: "4",
    client: {
      id: "client-4",
      name: "Design Team",
      avatar:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=face",
      rating: 0,
      online: true,
      lastSeen: "Online"
    },
    lastMessage: "Alex: Let's sync up on the new wireframes",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 8),
    unreadCount: 5,
    project: "Internal Project",
    isFavorite: false,
    isArchived: false,
    isGroup: true,
    messages: []
  },
  {
    id: "5",
    client: {
      id: "client-5",
      name: "David Park",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 4.5,
      online: false,
      lastSeen: "1d ago"
    },
    lastMessage: "Thanks for the great work on the project!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    unreadCount: 0,
    project: "E-commerce Store",
    isFavorite: false,
    isArchived: true,
    isGroup: false,
    messages: []
  }
]

export const mockCalls = [
  {
    id: "c1",
    conversationId: "1",
    clientName: "Sarah Johnson",
    clientAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    type: "outgoing",
    callType: "voice",
    time: "10:30 AM",
    date: "Today",
    duration: "2:45"
  },
  {
    id: "c2",
    conversationId: "1",
    clientName: "Sarah Johnson",
    clientAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    type: "incoming",
    callType: "voice",
    time: "9:15 AM",
    date: "Today",
    duration: "5:20"
  },
  {
    id: "c3",
    conversationId: "2",
    clientName: "Michael Chen",
    clientAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "outgoing",
    callType: "video",
    time: "3:45 PM",
    date: "Yesterday",
    duration: "15:30"
  },
  {
    id: "c4",
    conversationId: "3",
    clientName: "Emma Williams",
    clientAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    type: "missed",
    callType: "voice",
    time: "11:20 AM",
    date: "Yesterday"
  },
  {
    id: "c5",
    conversationId: "2",
    clientName: "Michael Chen",
    clientAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "outgoing",
    callType: "voice",
    time: "2:15 PM",
    date: "Jan 28",
    duration: "3:10"
  },
  {
    id: "c6",
    conversationId: "1",
    clientName: "Sarah Johnson",
    clientAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    type: "incoming",
    callType: "voice",
    time: "10:05 AM",
    date: "Jan 28",
    duration: "7:25"
  }
]

export const currentUserId_export = currentUserId
