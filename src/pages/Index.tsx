import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import CreateTestUser from '@/components/CreateTestUser';

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <AdvantagesSection />
      <TestimonialsSection />
      <Footer />
      <CreateTestUser />
    </>
  );
};

export default Index;
