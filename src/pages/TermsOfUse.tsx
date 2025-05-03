import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const TermsOfUse = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 bg-cargo-gray-100">
        <div className="container mx-auto px-4 mt-10">
          <Link to="/">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToHome')}
            </Button>
          </Link>
          
          <article className="prose prose-lg max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('termsOfUseTitle')}</h1>
            
            <p className="text-cargo-gray-700 mb-6">{t('termsOfUseIntro')}</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('termsSection1Title')}</h2>
            <div className="pl-4">
              <p className="mb-4">{t('termsSection1_1')}</p>
              <p className="mb-4">{t('termsSection1_2')}</p>
              <p>
                {t('termsSection1_3')}{' '}
                <Link to="/privacy-policy" className="text-cargo-red hover:underline">
                  {t('privacyPolicy')}
                </Link>
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('termsSection2Title')}</h2>
            <div className="pl-4">
              <h3 className="text-xl font-semibold mb-3">{t('termsSection2_1Title')}</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('termsSection2_1Item1')}</li>
                <li>{t('termsSection2_1Item2')}</li>
                <li>{t('termsSection2_1Item3')}</li>
              </ul>
            </div>

            <div className="mt-12 p-4 bg-cargo-gray-100 rounded-lg">
              <p className="text-sm text-cargo-gray-600 font-bold">
                {t('termsLastUpdated')}: 01.05.2025
              </p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
