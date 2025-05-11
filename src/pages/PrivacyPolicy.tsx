import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
const PrivacyPolicy = () => {
  const {
    t
  } = useLanguage();
  return <div className="min-h-screen">
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
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('privacyPolicyTitle')}</h1>
            
            <p className="text-cargo-gray-700 mb-6 text-base font-thin">
              {t('privacyPolicyIntro')}
            </p>
            
            <p className="text-cargo-gray-700 mb-8">
              {t('privacyPolicyConsent')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('privacyPolicySection1Title')}</h2>
            <div className="pl-4">
              <h3 className="text-xl font-semibold mb-3">{t('privacyPolicySection1_1Title')}</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('privacyPolicySection1_1Item1')}</li>
              </ul>
              <p className="mb-4">{t('privacyPolicySection1_2')}</p>
              <p>{t('privacyPolicySection1_3')}</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('privacyPolicySection2Title')}</h2>
            <p className="mb-4">{t('privacyPolicySection2Text1')}</p>
            <p>{t('privacyPolicySection2Text2')}</p>
            <ul className="list-disc pl-6 mb-6">
              <li>{t('privacyPolicySection2Item1')}</li>
              <li>{t('privacyPolicySection2Item2')}</li>
              <li>{t('privacyPolicySection2Item3')}</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('privacyPolicySection3Title')}</h2>
            <div className="pl-4">
              <p className="mb-4">{t('privacyPolicySection3_1')}</p>
              <p className="mb-4">{t('privacyPolicySection3_2')}</p>
            </div>

            <div className="mt-12 p-4 bg-cargo-gray-100 rounded-lg">
              <p className="text-sm text-cargo-gray-600 font-bold">
                {t('privacyPolicyLastUpdated')}: {new Date().toLocaleDateString()}
              </p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>;
};
export default PrivacyPolicy;