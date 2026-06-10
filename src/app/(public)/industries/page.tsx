import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Trophy, Landmark, Wallet, Compass } from "lucide-react";

export const metadata = {
  title: "Industries We Serve | Sourcecode",
  description: "Bespoke technology engineered for Financial Services, iGaming, Corporate Providers, and E-Commerce.",
};

const sectors = [
  { title: "iGaming Operators", desc: "High-performance back-office analytics, responsible gaming triggers, and automated player report builders.", icon: Trophy },
  { title: "Corporate Services", desc: "Branded client onboarding portals, automated document collection check-lists, and CRM system integrations.", icon: Landmark },
  { title: "Financial Services", desc: "Real-time compliance monitoring dashboards, anomaly detection triggers, and automated regulatory PDF generation.", icon: Wallet },
  { title: "E-Commerce Marketplaces", desc: "Custom multi-vendor catalog architectures, split payments, and AI-powered recommendations engines.", icon: Compass },
];

export default function IndustriesPage() {
  return (
    <div className="bg-og-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="text-center max-w-[800px] mx-auto mb-16">
          <span className="text-[12px] font-mono uppercase tracking-[0.15em] text-og-accent font-bold block mb-3">// Industries</span>
          <h1 className="text-[clamp(36px,5vw,60px)] tracking-[-0.03em] font-extrabold text-og-text mb-6">
            Engineered for Malta's <span className="text-og-accent">core sectors.</span>
          </h1>
          <p className="text-[17px] text-og-text-secondary leading-relaxed font-normal">
            We build specialized technology platforms tailored for highly regulated and scaling industries.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {sectors.map((sec, i) => (
            <AnimatedSection key={sec.title} delay={i * 0.1}>
              <div className="bg-og-surface border border-og-border rounded-2xl p-8 hover:border-og-accent/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-og-accent/10 border border-og-accent/20 flex items-center justify-center text-og-accent mb-6">
                  <sec.icon size={22} />
                </div>
                <h3 className="text-[22px] font-bold text-og-text mb-3">{sec.title}</h3>
                <p className="text-[15px] text-og-text-secondary leading-relaxed mb-6 font-normal">
                  {sec.desc}
                </p>
                <Link href="/apply" className="text-[13px] text-og-accent hover:text-og-accent-hover font-mono font-bold inline-flex items-center gap-1.5 no-underline">
                  Discuss your industry requirements <ArrowRight size={13} />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
