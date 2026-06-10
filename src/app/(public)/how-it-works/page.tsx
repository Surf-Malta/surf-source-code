import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Compass, Cpu, Layers, Sparkles } from "lucide-react";

export const metadata = {
  title: "How We Work | Sourcecode",
  description: "Our engineered approach to discovery, development, testing, and launching premium digital products.",
};

const steps = [
  { number: "01", title: "Discovery & Blueprinting", desc: "We map your current processes, find operational bottlenecks, and write a comprehensive technical execution blueprint.", icon: Compass },
  { number: "02", title: "Engineering & Sprints", desc: "We write clean, typed, high-performance code in bi-weekly sprints with active staging deployments for you to test.", icon: Cpu },
  { number: "03", title: "Automation & Integration", desc: "We integrate custom AI agents, automated workflow scripts, and sync third-party platform databases.", icon: Layers },
  { number: "04", title: "Precision Launch", desc: "We run unit test suites, optimize serverless queries, setup SSL, and launch your platform onto production.", icon: Sparkles },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-og-bg py-16 md:py-24">
      <div className="max-w-[1000px] mx-auto px-6">
        <AnimatedSection className="text-center max-w-[700px] mx-auto mb-16">
          <span className="text-[12px] font-mono uppercase tracking-[0.15em] text-og-accent font-bold block mb-3">// Process</span>
          <h1 className="text-[clamp(36px,5vw,60px)] tracking-[-0.03em] font-extrabold text-og-text mb-6">
            Engineered for <span className="text-og-accent">speed & precision.</span>
          </h1>
          <p className="text-[17px] text-og-text-secondary leading-relaxed font-normal">
            From architecture diagram to production launch, we follow a transparent and structured engineering process.
          </p>
        </AnimatedSection>

        <div className="relative border-l border-og-border pl-6 md:pl-10 space-y-12 mb-20 ml-4">
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.1} className="relative">
              <div className="absolute -left-[43px] md:-left-[59px] top-0 w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full bg-og-accent flex items-center justify-center text-[#09090F] font-mono font-bold text-[12px] md:text-[13px]">
                {step.number}
              </div>
              <div className="bg-og-surface border border-og-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 text-og-accent mb-4">
                  <step.icon size={20} />
                  <h3 className="text-[18px] md:text-[20px] font-bold text-og-text">{step.title}</h3>
                </div>
                <p className="text-[14px] md:text-[15px] text-og-text-secondary leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center bg-og-bg-alt border border-og-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-og-accent/5 rounded-full blur-2xl" />
          <h3 className="text-[22px] md:text-[26px] font-bold text-og-text mb-3">Ready to optimize your business?</h3>
          <p className="text-[15px] text-og-text-secondary mb-8 max-w-[500px] mx-auto font-normal">
            Book a discovery session and get a detailed execution blueprint customized for your project.
          </p>
          <Link href="/apply" className="inline-flex items-center gap-2.5 h-12 px-8 rounded-xl bg-og-accent text-[#09090F] text-[14px] no-underline font-mono font-bold hover:bg-og-accent-hover transition-all duration-300">
            Start the discovery <ArrowRight size={15} />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
