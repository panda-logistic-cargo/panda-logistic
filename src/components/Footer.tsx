
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CurrencyRates } from "./footer/CurrencyRates";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('calculator'), href: '/calculator' },
    { name: t('blog'), href: '/blog' },
    { name: t('contacts'), href: '/contacts' }
  ];

  const serviceLinks = [
    { name: t('supplierSearch'), href: '/services/supplier-search' },
    { name: t('marketplacePurchase'), href: '/services/marketplace-purchase' },
    { name: t('cargoConsolidation'), href: '/services/cargo-consolidation' },
    { name: t('delivery'), href: '/services/delivery' },
    { name: t('businessTours'), href: '/services/business-tours' },
    { name: t('customsClearance'), href: '/services/customs-clearance' }
  ];

  return (
    <footer className="bg-cargo-gray-900 text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold">
                PANDA <span className="text-cargo-red">LOGISTIC</span>
              </span>
            </Link>
            <p className="text-cargo-gray-300 mb-4">{t('footerCompanyDescription')}</p>
            
            {/* Currency Rates */}
            <CurrencyRates />
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('navigation')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-cargo-gray-300 hover:text-cargo-red transition-colors inline-flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-cargo-gray-300 hover:text-cargo-red transition-colors inline-flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cargo-gray-800 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-cargo-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Panda Logistic. {t('allRightsReserved')}
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="text-cargo-gray-400 hover:text-cargo-red text-sm">
              {t('privacyPolicy')}
            </Link>
            <Link to="/terms-of-use" className="text-cargo-gray-400 hover:text-cargo-red text-sm">
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
