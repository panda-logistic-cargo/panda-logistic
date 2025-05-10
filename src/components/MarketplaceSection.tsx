import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Handshake, Check, TrendingUp } from "lucide-react";

const MarketplaceSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-cargo-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8 bg-cargo-red text-white">
              <h2 className="text-2xl font-bold mb-4">{t('marketplaceTitle')}</h2>
              <p className="mb-6">{t('marketplaceDescription')}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span>{t('qualityGuarantee')}</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <span>{t('storeRatingIncrease')}</span>
                </div>
              </div>
              
              <p className="mb-6">{t('marketplacePartner')}</p>
              
              <Button variant="outline" className="bg-white text-cargo-red hover:bg-cargo-gray-100">
                <Handshake className="h-4 w-4 mr-2" />
                {t('startCooperation')}
              </Button>
            </div>
            
            <div className="md:w-1/2 p-0">
              <img 
                src="/lovable-uploads/2c4704e7-be65-4c01-9dbc-13e0c3a143d8.jpg" 
                alt="Marketplace business" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSection;
