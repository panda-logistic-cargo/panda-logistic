import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShieldCheck, TrendingUp } from "lucide-react";
const MarketplaceSection = () => {
  const {
    t
  } = useLanguage();
  return <div className="relative mb-16 py-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cargo-red/5 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cargo-red/5 rounded-full -ml-12 -mb-12" />
      
      <div className="relative z-10 bg-cargo-gray-100 rounded-2xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-cargo-red/10 text-cargo-red px-3 py-1 rounded-full text-sm mb-4">
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">Wildberries</span>
              <span className="mx-1">•</span>
              <span className="font-medium">Ozon</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{t('marketplaceTitle')}</h3>
            
            <p className="text-cargo-gray-700 mb-6">{t('marketplaceDescription')}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white p-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-cargo-red" />
                </div>
                <div className="text-sm">Гарантия качества товаров</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white p-1 rounded-full">
                  <TrendingUp className="w-4 h-4 text-cargo-red" />
                </div>
                <div className="text-sm">Рост рейтинга магазина</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-cargo-gray-200 text-sm mb-6">
              <p className="text-cargo-gray-700">
                <span className="font-semibold">Panda Logistic</span> – отличный посредник не только в выкупе и карго доставке, но и для вашего бизнеса на маркетплейсах. Оставляйте заявку на звонок и убедитесь в этом сами.
              </p>
            </div>
            
            <Button className="bg-cargo-red hover:bg-cargo-red/90">
              {t('callMe')}
            </Button>
          </div>
          
          <div className="md:w-1/3">
            <div className="relative aspect-[4/3]">
              <img alt="Marketplace business" src="/lovable-uploads/2c4704e7-be65-4c01-9dbc-13e0c3a143d8.jpg" className="rounded-lg shadow-lg w-full h-full object-fill" />
              
              
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default MarketplaceSection;