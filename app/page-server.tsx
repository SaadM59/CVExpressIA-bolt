import { HeroSection } from '@/components/sections/hero-section';
import { BenefitsSection } from '@/components/sections/benefits-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { FAQSection } from '@/components/sections/faq-section';
import { Footer } from '@/components/sections/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <HeroSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
