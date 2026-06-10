import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Code2, Bot, Globe, BarChart3, Workflow } from "lucide-react";

export const metadata = {
  title: "Services | Sourcecode",
  description: "Bespoke software platforms, workflow engineering, business intelligence systems, and AI-native automation solutions.",
};

const services = [
  { title: "Custom Software Development", desc: "Bespoke platforms, internal tools, and enterprise applications built around your workflows.", icon: Code2, pricing: "From €8,000" },
  { title: "AI & Automation", desc: "Chatbots, workflow automation, and intelligent data processing to cut manual work.", icon: Bot, pricing: "From €5,000" },
  { title: "Web Design & Development", desc: "Fast, beautiful, SEO-optimised websites that convert visitors into customers.", icon: Globe, pricing: "From €3,000" },
  { title: "Business Intelligence", desc: "Dashboards, reports, and data pipelines that turn raw data into strategic insights.", icon: BarChart3, pricing: "From €6,000" },
  { title: "Workflow Engineering", desc: "Document automation, client portals, and system integrations to streamline operations.", icon: Workflow, pricing: "From €4,000" },
];

export default function SolutionsPage() {
  return (
    <div className="bg-og-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="text-center max-w-[800px] mx-auto mb-16">
          <span className="text-[12px] font-mono uppercase tracking-[0.15em] text-og-accent font-bold block mb-3">// Services</span>
          <h1 className="text-[clamp(36px,5vw,60px)] tracking-[-0.03em] font-extrabold text-og-text mb-6">
            We build what your business <span className="text-og-accent">needs.</span>
          </h1>
          <p className="text-[18px] text-og-text-secondary leading-relaxed font-normal">
            Bespoke technology engineered to eliminate operational friction, automate manual workloads, and drive business growth.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 0.1}>
              <div className="bg-og-surface rounded-2xl border border-og-border p-8 h-full flex flex-col justify-between transition-all duration-300 hover:border-og-accent/30 hover:shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-og-accent/10 border border-og-accent/20 flex items-center justify-center text-og-accent mb-6">
                    <svc.icon size={22} />
                  </div>
                  <h3 className="text-[20px] font-bold text-og-text mb-3">{svc.title}</h3>
                  <p className="text-[14px] text-og-text-secondary leading-relaxed mb-6 font-normal">{svc.desc}</p>
                </div>
                <div className="pt-6 border-t border-og-border flex items-center justify-between">
                  <span className="text-[12px] font-mono text-og-text-secondary uppercase">{svc.pricing}</span>
                  <Link href="/apply" className="text-[13px] text-og-accent hover:text-og-accent-hover font-mono font-bold inline-flex items-center gap-1.5 no-underline">
                    Get started <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
