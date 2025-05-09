
import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesSection />
      <AdvantagesSection />
      <TestimonialsSection />
      <div className="container mx-auto px-4 py-12">
        <MarketplaceSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
