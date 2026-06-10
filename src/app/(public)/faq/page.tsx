import { FAQContent } from "@/components/faq/FAQContent";

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

export const metadata = {
  title: "FAQ | Sourcecode",
  description: "Frequently asked questions about Sourcecode's services, pricing, timelines, and approach to custom software development.",
};

export default function FAQPage() {
  return <FAQContent initialFaqs={staticFaqs} />;
}
