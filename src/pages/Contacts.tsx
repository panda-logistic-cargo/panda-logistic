
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Contacts = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('contacts')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              {t('contactsSubtitle')}
            </p>
          </div>
          
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;
