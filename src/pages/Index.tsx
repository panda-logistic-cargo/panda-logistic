
import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import CreateUser from "@/components/CreateUser";
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesSection />
      <AdvantagesSection />
      <TestimonialsSection />
      
      {/* Only show the CreateUser component to admin users */}
      {user && (
        <div className="py-12 bg-cargo-gray-100">
          <div className="container mx-auto px-4">
            <CreateUser />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
