'use client';

import PublicLayout from "@/components/layouts/public-layout";
import { HeroSection } from "@/components/pages/landing/hero-section";
import { FeaturesSection } from "@/components/pages/landing/features-section";
import { HowItWorksSection } from "@/components/pages/landing/how-it-works-section";
import { TestimonialsSection } from "@/components/pages/landing/testimonials-section";
import { PricingSection } from "@/components/pages/landing/pricing-section";
import { CTASection } from "@/components/pages/landing/cta-section";

export function LandingPage() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </PublicLayout>
  );
}