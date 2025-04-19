
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";
import { Plane, TrainFront, Ship } from "lucide-react";

const CalculatorPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 mt-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('calculator')}</h1>
          <p className="text-lg text-cargo-gray-700 mb-10 max-w-3xl">
            Рассчитайте приблизительную стоимость доставки вашего груза из Китая.
            Для получения точной информации, пожалуйста, свяжитесь с нашими специалистами.
          </p>
          
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <Calculator />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-cargo-gray-100 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in">
              <div className="flex items-center gap-3 mb-3">
                <Plane className="h-6 w-6 text-cargo-red" />
                <h3 className="font-bold text-lg">Авиадоставка</h3>
              </div>
              <p className="text-cargo-gray-700 mb-2">Самый быстрый способ доставки.</p>
              <p className="font-semibold">7-12 дней</p>
            </div>
            
            <div className="bg-cargo-gray-100 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="flex items-center gap-3 mb-3">
                <TrainFront className="h-6 w-6 text-cargo-red" />
                <h3 className="font-bold text-lg">Железнодорожная доставка</h3>
              </div>
              <p className="text-cargo-gray-700 mb-2">Оптимальное соотношение цены и скорости.</p>
              <p className="font-semibold">18-25 дней</p>
            </div>
            
            <div className="bg-cargo-gray-100 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="flex items-center gap-3 mb-3">
                <Ship className="h-6 w-6 text-cargo-red" />
                <h3 className="font-bold text-lg">Морская доставка</h3>
              </div>
              <p className="text-cargo-gray-700 mb-2">Экономичный вариант для крупных грузов.</p>
              <p className="font-semibold">35-45 дней</p>
            </div>
          </div>
          
          <div className="bg-cargo-red/5 border border-cargo-red/20 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Важная информация</h3>
            <p className="text-cargo-gray-700">
              Калькулятор предоставляет ориентировочную стоимость. На финальную цену влияют 
              дополнительные факторы: характер груза, сезонность, необходимость специальной упаковки и т.д.
              Для точного расчета рекомендуем обратиться к нашим специалистам.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
