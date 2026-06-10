export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  tagline: string;
  image: string;
  stat: string;
  statLabel: string;
  duration: string;
  techStack: string[];
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: { quote: string; name: string; role: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "malta-grand-hotel",
    title: "Malta Grand Hotel",
    client: "Malta Grand Hotel Group",
    category: "Web & Custom Software",
    industry: "Hospitality",
    tagline: "Booking platform & guest portal",
    image:
      "https://images.unsplash.com/photo-1663147737123-9cbd239fc3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJvb2tpbmclMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjM2Mzk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "+68%",
    statLabel: "Online bookings",
    duration: "10 weeks",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    challenge:
      "The hotel group was using a fragmented booking system with poor mobile experience and no self-service guest portal, leading to high call center volume and lost bookings.",
    solution:
      "We built a custom booking platform with real-time availability, a self-service guest portal for check-in/out, and an admin dashboard for operations management across 3 properties.",
    results: [
      "68% increase in online bookings",
      "45% reduction in call center volume",
      "Guest satisfaction score up to 4.8/5",
      "Average booking time reduced to 90 seconds",
    ],
    testimonial: {
      quote:
        "Surf Technology transformed our digital presence. The booking platform pays for itself every month.",
      name: "Maria Camilleri",
      role: "Director of Operations",
    },
  },
  {
    slug: "island-market",
    title: "Island Market",
    client: "Island Market Ltd.",
    category: "E-Commerce & AI",
    industry: "E-Commerce",
    tagline: "Multi-vendor marketplace with AI search",
    image:
      "https://images.unsplash.com/photo-1768987439382-894ea4e2a736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBtYXJrZXRwbGFjZSUyMHBsYXRmb3JtJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjM2Mzk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "3x",
    statLabel: "Revenue growth",
    duration: "14 weeks",
    techStack: ["React", "Python", "Elasticsearch", "Stripe", "AWS"],
    challenge:
      "A local marketplace wanted to scale from a single-vendor Shopify store to a full multi-vendor platform with intelligent product discovery to compete with larger platforms.",
    solution:
      "We developed a custom multi-vendor marketplace with AI-powered search and recommendations, vendor onboarding automation, and integrated payment splitting via Stripe Connect.",
    results: [
      "3x revenue growth in first 6 months",
      "120+ vendors onboarded",
      "Search conversion rate improved 52%",
      "Average order value up 28%",
    ],
    testimonial: {
      quote:
        "The AI search alone was a game changer. Customers find what they need instantly.",
      name: "David Grech",
      role: "Founder & CEO",
    },
  },
  {
    slug: "apex-financial",
    title: "Apex Financial",
    client: "Apex Financial Services",
    category: "Business Intelligence",
    industry: "Financial Services",
    tagline: "Compliance dashboard & reporting suite",
    image:
      "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBtb2Rlcm58ZW58MXx8fHwxNzcyMjkyNDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "-40%",
    statLabel: "Reporting time",
    duration: "12 weeks",
    techStack: ["React", "Node.js", "D3.js", "PostgreSQL", "Dynamics 365"],
    challenge:
      "Manual compliance reporting was consuming 2+ days per week across the team, with frequent errors and no real-time visibility into regulatory metrics.",
    solution:
      "We built a real-time compliance dashboard integrated with their Dynamics 365 ERP, featuring automated report generation, anomaly detection, and a regulatory calendar with deadline alerts.",
    results: [
      "40% reduction in compliance reporting time",
      "Zero reporting errors since launch",
      "Real-time regulatory metric visibility",
      "Automated alerts for 50+ compliance deadlines",
    ],
    testimonial: {
      quote:
        "What used to take days now takes minutes. The dashboard gives us complete confidence in our compliance posture.",
      name: "Dr. Jonathan Borg",
      role: "Head of Compliance",
    },
  },
  {
    slug: "betcloud-igaming",
    title: "BetCloud Platform",
    client: "BetCloud Gaming Ltd.",
    category: "Custom Software",
    industry: "iGaming",
    tagline: "Player analytics & back-office platform",
    image:
      "https://images.unsplash.com/photo-1552749412-7bbae756acfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpZ2FtaW5nJTIwY2FzaW5vJTIwcGxhdGZvcm0lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjM2Mzk1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "+35%",
    statLabel: "Player retention",
    duration: "16 weeks",
    techStack: ["React", "Node.js", "Redis", "PostgreSQL", "WebSocket"],
    challenge:
      "The gaming operator needed a scalable back-office platform with real-time player analytics and responsible gaming tools to meet MGA licensing requirements.",
    solution:
      "We delivered a high-performance back-office with live player dashboards, automated responsible gaming triggers, and a risk scoring engine processing 10,000+ events per second.",
    results: [
      "35% improvement in player retention",
      "Real-time monitoring of 50K+ concurrent players",
      "MGA compliance fully automated",
      "95% reduction in manual risk reviews",
    ],
  },
  {
    slug: "lexis-corporate",
    title: "Lexis Corporate Hub",
    client: "Lexis Corporate Services",
    category: "Workflow Automation",
    industry: "Corporate Services",
    tagline: "Client portal & document automation",
    image:
      "https://images.unsplash.com/photo-1697463624716-cd2f0423d9d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBhdXRvbWF0aW9uJTIwd29ya2Zsb3d8ZW58MXx8fHwxNzcyMzYzOTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "-60%",
    statLabel: "Onboarding time",
    duration: "8 weeks",
    techStack: ["Next.js", "Node.js", "AWS S3", "SendGrid"],
    challenge:
      "Client onboarding involved manual document collection via email, with no visibility into process status and frequent follow-up delays slowing down service delivery.",
    solution:
      "We built a branded client portal with automated document collection, e-signature integration, status tracking, and WhatsApp/email notifications for each onboarding step.",
    results: [
      "60% reduction in client onboarding time",
      "90% of documents collected digitally",
      "Client NPS increased from 42 to 71",
      "Staff freed up 15+ hours per week",
    ],
    testimonial: {
      quote:
        "Our clients love the portal. It's professional, fast, and makes us look like a much larger firm.",
      name: "Simone Farrugia",
      role: "Managing Director",
    },
  },
  {
    slug: "learnhub-malta",
    title: "LearnHub Malta",
    client: "LearnHub Education Ltd.",
    category: "AI & Web Development",
    industry: "Education",
    tagline: "E-learning platform with AI assessment",
    image:
      "https://images.unsplash.com/photo-1709377598544-0c28bbe437bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBlbGVhcm5pbmclMjBwbGF0Zm9ybSUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MjM2Mzk1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "+85%",
    statLabel: "Student engagement",
    duration: "11 weeks",
    techStack: ["React", "Python", "OpenAI", "PostgreSQL", "AWS"],
    challenge:
      "A Maltese education provider needed to move from in-person-only courses to a hybrid model with engaging online content and intelligent progress tracking.",
    solution:
      "We developed an e-learning platform with video courses, AI-powered quiz generation, adaptive learning paths, and a student dashboard with progress analytics and certification.",
    results: [
      "85% increase in student engagement",
      "Course completion rate up from 34% to 78%",
      "2,500+ students onboarded in 3 months",
      "AI generates 500+ assessment questions monthly",
    ],
    testimonial: {
      quote:
        "The AI assessment feature saves our tutors hours every week and students get instant, personalised feedback.",
      name: "Prof. Claudia Vella",
      role: "Academic Director",
    },
  },
];

export const categories = [
  "All",
  "Web & Custom Software",
  "E-Commerce & AI",
  "Business Intelligence",
  "Custom Software",
  "Workflow Automation",
  "AI & Web Development",
];
