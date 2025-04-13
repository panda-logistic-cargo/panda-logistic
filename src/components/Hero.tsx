
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Calculator } from "lucide-react";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070')", 
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
      </div>

      {/* Red accent element */}
      <div className="absolute -left-40 bottom-0 h-[400px] w-[800px] bg-cargo-red/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-4 py-1 bg-cargo-red/10 backdrop-blur-sm rounded-full border border-cargo-red/20">
            <span className="text-white font-medium">
              Cargo A71 Logistics
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in">
            {t('heroTitle')}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl animate-slide-up">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-cargo-red hover:bg-cargo-red/90 text-white font-medium rounded-md"
            >
              <Calculator className="mr-2 h-5 w-5" />
              {t('getQuote')}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white rounded-md"
            >
              {t('contactUs')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Promo banner */}
          <div className="mt-12 inline-block animate-pulse bg-gradient-to-r from-cargo-red/80 to-cargo-red p-1 rounded-lg">
            <div className="px-6 py-3 rounded-md bg-black/50 backdrop-blur-sm">
              <p className="text-white font-medium">
                🎁 <span className="font-bold">$100 OFF</span> on your first order
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
