import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Database, Code2, Cpu, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Integrations & Tech Stack | Sourcecode",
  description: "How we connect custom software to Salesforce, Dynamics 365, Stripe, AWS, and MongoDB.",
};

const stacks = [
  { title: "Enterprise ERP & CRMs", desc: "Bidirectional sync with Microsoft Dynamics 365, Salesforce, and HubSpot to automate compliance data and contact entries.", icon: Database },
  { title: "Payment Systems", desc: "Multi-vendor checkout and automated payout splitting utilizing Stripe Connect, PayPal, and Apple Pay APIs.", icon: Wallet },
  { title: "Cloud Platforms & APIs", desc: "High-performance deployment setups utilizing AWS S3, Redis caching, WebSockets, and serverless Node.js functions.", icon: Cpu },
  { title: "Database Systems", desc: "Data modeling using MongoDB for unstructured documents and PostgreSQL for relational transactions.", icon: Code2 },
];

import { Wallet } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="bg-og-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="text-center max-w-[800px] mx-auto mb-16">
          <span className="text-[12px] font-mono uppercase tracking-[0.15em] text-og-accent font-bold block mb-3">// Stack</span>
          <h1 className="text-[clamp(36px,5vw,60px)] tracking-[-0.03em] font-extrabold text-og-text mb-6">
            We integrate with your <span className="text-og-accent">existing systems.</span>
          </h1>
          <p className="text-[17px] text-og-text-secondary leading-relaxed font-normal">
            No technical debt or manual data-entry. We connect your custom software directly to the business tools you already use.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {stacks.map((stack, i) => (
            <AnimatedSection key={stack.title} delay={i * 0.1}>
              <div className="bg-og-surface border border-og-border rounded-2xl p-8 hover:border-og-accent/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-og-accent/10 border border-og-accent/20 flex items-center justify-center text-og-accent mb-6">
                  <stack.icon size={22} />
                </div>
                <h3 className="text-[20px] font-bold text-og-text mb-3">{stack.title}</h3>
                <p className="text-[15px] text-og-text-secondary leading-relaxed mb-6 font-normal">
                  {stack.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
