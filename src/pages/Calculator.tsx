
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";
import { Plane, TrainFront, Ship, Info } from "lucide-react";
const CalculatorPage = () => {
  const {
    t
  } = useLanguage();
  return <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('calculator')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              {t('calculatorDescription')}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <Calculator />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-cargo-gray-100 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in">
              <div className="flex items-center gap-3 mb-3">
                <Plane className="h-6 w-6 text-cargo-red" />
                <h3 className="font-bold text-lg">{t('airDelivery')}</h3>
              </div>
              <p className="text-cargo-gray-700 mb-2">{t('airDeliveryDesc')}</p>
              <p className="font-semibold">{t('airDeliveryTime')}</p>
            </div>
            
            <div className="bg-cargo-gray-100 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{
            animationDelay: "0.2s"
          }}>
              <div className="flex items-center gap-3 mb-3">
                <TrainFront className="h-6 w-6 text-cargo-red" />
                <h3 className="font-bold text-lg">{t('railDelivery')}</h3>
              </div>
              <p className="text-cargo-gray-700 mb-2">{t('railDeliveryDesc')}</p>
              <p className="font-semibold">{t('railDeliveryTime')}</p>
            </div>
            
            <div className="bg-cargo-gray-100 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{
            animationDelay: "0.4s"
          }}>
              <div className="flex items-center gap-3 mb-3">
                <Ship className="h-6 w-6 text-cargo-red" />
                <h3 className="font-bold text-lg">{t('seaDelivery')}</h3>
              </div>
              <p className="text-cargo-gray-700 mb-2">{t('seaDeliveryDesc')}</p>
              <p className="font-semibold">{t('seaDeliveryTime')}</p>
            </div>
          </div>
          
          <div className="bg-cargo-red/5 border border-cargo-red/20 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <Info className="h-5 w-5 mr-2 text-cargo-red" />
              {t('calculatorImportantInfo')}
            </h3>
            <p className="text-cargo-gray-700">{t('calculatorImportantDetails')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};
export default CalculatorPage;
