import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
const MarketplaceSection: React.FC = () => {
  const {
    t
  } = useLanguage();
  return <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
      <div className="p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
          <span className="text-cargo-gray-800">
            {t('marketplaceTitle').split('Wildberries')[0]}
          </span>
          <span className="text-red-600 font-extrabold">Wildberries</span>
          <span className="text-cargo-gray-800"> {t('marketplaceTitle').split('Wildberries')[1].split('Ozon')[0]}</span>
          <span className="text-blue-600 font-extrabold">Ozon</span>
        </h2>
        
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <p className="text-cargo-gray-600 mb-6">
              {t('marketplaceDescription')}
            </p>
            <p className="text-cargo-gray-600 mb-8">
              {t('marketplacePartner')}
            </p>
            
            <Button className="bg-cargo-red hover:bg-cargo-red/90 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {t('callMe')}
            </Button>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 gap-6 justify-items-center">
            <div className="flex items-center justify-center">
              <img alt="Wildberries" src="/lovable-uploads/3c1ca77d-ca86-4ba8-8149-f82e73480559.png" className="h-12 object-cover" />
            </div>
            <div className="flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Ozon_logo.svg" alt="Ozon" className="h-12 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default MarketplaceSection;