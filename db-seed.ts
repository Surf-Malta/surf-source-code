import fs from "fs";
import path from "path";
import dns from "dns";
import mongoose from "mongoose";

// Set DNS to prioritize IPv4
dns.setDefaultResultOrder("ipv4first");

import { blogPosts } from "./src/lib/data/blogPosts";
import { caseStudies } from "./src/lib/data/caseStudies";

// 1. Load environment variables manually if not present
if (!process.env.MONGODB_URI) {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/MONGODB_URI\s*=\s*([^\r\n]+)/);
      if (match && match[1]) {
        process.env.MONGODB_URI = match[1].trim();
        console.log("Loaded MONGODB_URI from .env.local");
      }
    }
  } catch (err) {
    console.error("Error loading .env.local:", err);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not set!");
  process.exit(1);
}

// Import models
import User from "./src/lib/models/User";
import Blog from "./src/lib/models/Blog";
import Portfolio from "./src/lib/models/Portfolio";
import FAQ from "./src/lib/models/FAQ";
import Service from "./src/lib/models/Service";
import Homepage from "./src/lib/models/Homepage";
import Activity from "./src/lib/models/Activity";
import Media from "./src/lib/models/Media";
import ProjectSubmission from "./src/lib/models/ProjectSubmission";

const staticFaqs = [
  { question: "What services does Sourcecode offer?", answer: "We provide custom software development, AI & automation solutions, web design & development, business intelligence systems, and workflow engineering. From MVPs to enterprise platforms, we build what your business needs.", category: "General" },
  { question: "Where is Sourcecode based?", answer: "We're based in Malta, serving local businesses and international clients. Our team has deep expertise in Malta's key industries including iGaming, financial services, and corporate services.", category: "General" },
  { question: "How long does a typical project take?", answer: "Timelines vary by project scope. A corporate website takes 4-6 weeks, a custom software platform 8-16 weeks, and AI chatbot implementations 3-6 weeks. We provide detailed timelines during the discovery phase.", category: "Getting Started" },
  { question: "What technologies do you use?", answer: "We work with React, Next.js, Node.js, Python, AWS, WordPress, and more. Our tech stack is chosen per project to match your needs, scalability requirements, and budget.", category: "Technical" },
  { question: "Do you offer ongoing support?", answer: "Yes. We provide ongoing maintenance, feature updates, performance monitoring, and technical support. We're a long-term technology partner, not just a project vendor.", category: "General" },
  { question: "How much does a project cost?", answer: "Costs depend on scope, complexity, and timeline. We provide detailed proposals after an initial discovery session. Book a free consultation to discuss your project.", category: "Getting Started" },
  { question: "Can you integrate with our existing systems?", answer: "Absolutely. We specialize in API integrations, ERP connectors (like Dynamics 365), CRM systems, and third-party service integrations. We work with what you already have.", category: "Technical" },
  { question: "Do you build AI chatbots?", answer: "Yes. We build AI-powered chatbots for customer support, lead generation, and internal assistance. These can be deployed on your website, WhatsApp, or other messaging platforms.", category: "AI & Automation" },
  { question: "What industries do you serve?", answer: "We serve e-commerce, corporate service providers, financial services, iGaming, hospitality, startups, and education sectors. Our solutions are tailored to each industry's specific needs.", category: "General" },
  { question: "How do you handle project communication?", answer: "We use transparent, structured communication with regular demos, sprint reviews, and dedicated project managers. You'll always know exactly where your project stands.", category: "Getting Started" },
  { question: "Can you help with WhatsApp automation?", answer: "Yes. We build WhatsApp Business API integrations for automated customer communication, order updates, appointment reminders, and lead nurturing workflows.", category: "AI & Automation" },
  { question: "Do you provide SEO services?", answer: "All our websites are built with SEO best practices. We also offer SEO-optimized content strategies and performance optimization as part of our web development services.", category: "Technical" },
];

const staticServices = [
  {
    title: "Web Design & Development",
    description: "Premium corporate websites, custom platforms, and e-commerce solutions built for speed, conversions, and SEO.",
    icon: "Globe",
    detailContent: "Full-stack development, headless CMS setups, performance optimization.",
    cta: "View Services",
    pricing: "From EUR 3,000",
    order: 0
  },
  {
    title: "AI & Automation",
    description: "Intelligent systems, custom AI modules, WhatsApp chatbots, and predictive analytics dashboards.",
    icon: "Bot",
    detailContent: "OpenAI integrations, retrieval-augmented generation (RAG), automated workflows.",
    cta: "See AI Solutions",
    pricing: "From EUR 5,000",
    order: 1
  },
  {
    title: "Custom Software",
    description: "Custom-built software tailored to your specific workflows, eliminating licensing costs and manual bottlenecks.",
    icon: "Code2",
    detailContent: "Internal admin panels, customer portals, custom database schemas, API architecture.",
    cta: "Learn More",
    pricing: "From EUR 8,000",
    order: 2
  },
  {
    title: "Business Intelligence",
    description: "Integrate all your systems into a single real-time dashboard. Automate compliance reporting and discover growth opportunities.",
    icon: "BarChart3",
    detailContent: "Interactive dashboards, D3.js integrations, database setup, automated reporting pipelines.",
    cta: "Explore BI",
    pricing: "From EUR 4,000",
    order: 3
  }
];

const defaultHomepage = {
  heroTitle: "Technology that works for you.",
  heroSubtitle: "Custom software, AI automation, and digital solutions — built in Malta, built to scale.",
  ctaText: "Book a Free Consultation",
  aboutText: "We are a premium software engineering agency specializing in custom software development, AI integration, and workflow automation. Based in Malta, we work as long-term technology partners with ambitious businesses, helping them scale operations, optimize compliance, and build better digital products.",
  stats: [
    { label: "Online Bookings", value: "+68%" },
    { label: "Reporting Time", value: "-40%" },
    { label: "Hours Saved / Wk", value: "15+" }
  ],
  testimonials: [
    { quote: "Surf Technology transformed our digital presence. The booking platform pays for itself every month.", name: "Maria Camilleri", role: "Director of Operations, Malta Grand Hotel" },
    { quote: "The AI search alone was a game changer. Customers find what they need instantly.", name: "David Grech", role: "Founder & CEO, Island Market" }
  ],
  featureHighlights: [
    { title: "AI-Powered Automation", description: "Build intelligent chatbots, WhatsApp automations, and custom workflows." },
    { title: "Custom Portals & BI", description: "Eliminate licensing costs with custom client portals and real-time dashboards." }
  ]
};

async function runSeed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected successfully!");

  // 1. Seed Users
  console.log("Seeding Users...");
  await User.deleteMany({});
  const users = await User.create([
    { email: "ashwini1achari@gmail.com", password: "admin123", role: "super_admin", name: "Source Code" },
    { email: "editor@surftechnology.mt", password: "editor123", role: "editor", name: "Sarah Borg" },
    { email: "editor@sourcecode.dev", password: "editor123", role: "editor", name: "Sarah Borg" }
  ]);
  console.log(`Successfully seeded ${users.length} users.`);

  // 2. Seed Blogs
  console.log("Seeding Blogs...");
  await Blog.deleteMany({});
  const blogsToCreate = blogPosts.map(post => ({
    ...post,
    status: "published",
    tags: [post.category],
    seoTitle: post.title,
    seoDescription: post.excerpt
  }));
  const blogs = await Blog.create(blogsToCreate);
  console.log(`Successfully seeded ${blogs.length} blogs.`);

  // 3. Seed Portfolio
  console.log("Seeding Portfolio...");
  await Portfolio.deleteMany({});
  const portfolioToCreate = caseStudies.map((study, idx) => ({
    ...study,
    status: "published",
    featured: idx === 0,
    order: idx,
    seoTitle: study.title,
    seoDescription: study.tagline,
    problem: study.challenge,
    images: [study.image]
  }));
  const portfolio = await Portfolio.create(portfolioToCreate);
  console.log(`Successfully seeded ${portfolio.length} portfolio items.`);

  // 4. Seed FAQs
  console.log("Seeding FAQs...");
  await FAQ.deleteMany({});
  const faqsToCreate = staticFaqs.map((faq, idx) => ({
    ...faq,
    order: idx,
    active: true
  }));
  const faqs = await FAQ.create(faqsToCreate);
  console.log(`Successfully seeded ${faqs.length} FAQs.`);

  // 5. Seed Services
  console.log("Seeding Services...");
  await Service.deleteMany({});
  const services = await Service.create(staticServices);
  console.log(`Successfully seeded ${services.length} services.`);

  // 6. Seed Homepage
  console.log("Seeding Homepage Settings...");
  await Homepage.deleteMany({});
  await Homepage.create(defaultHomepage);
  console.log("Successfully seeded homepage settings.");

  // 7. Seed initial Activities
  console.log("Seeding Activity logs...");
  await Activity.deleteMany({});
  await Activity.create([
    { action: "Logged In", entity: "Auth", entityTitle: "Source Code", user: "Source Code" },
    { action: "Seeded Database", entity: "System", entityTitle: "Full Restore", user: "Source Code" }
  ]);
  console.log("Successfully seeded initial activity log.");

  // Clear media & submissions logs to clean up
  await Media.deleteMany({});
  await ProjectSubmission.deleteMany({});
  console.log("Cleaned Media and ProjectSubmission collections.");

  console.log("Database seeding completed successfully!");
  process.exit(0);
}

runSeed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
