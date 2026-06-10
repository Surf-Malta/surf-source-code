import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { ProductStory } from "@/components/home/ProductStory";
import { POSSection } from "@/components/home/POSSection";
import { HowItWorksStrip } from "@/components/home/HowItWorksStrip";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { DashboardDemo } from "@/components/home/DashboardDemo";
import { ComplianceArchitecture } from "@/components/home/ComplianceArchitecture";
import { CaseStudiesStrip } from "@/components/home/CaseStudiesStrip";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { BlogStrip } from "@/components/home/BlogStrip";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "Sourcecode | Premium Software Engineering",
  description: "Premium software engineering, AI automation, and full-stack solutions built in Malta, built to scale.",
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustStrip />
      <IntegrationsSection />
      <ProductStory />
      <POSSection />
      <HowItWorksStrip />
      <IndustriesGrid />
      <DashboardDemo />
      <ComplianceArchitecture />
      <CaseStudiesStrip />
      <TestimonialsCarousel />
      <BlogStrip />
      <CTASection />
    </div>
  );
}
