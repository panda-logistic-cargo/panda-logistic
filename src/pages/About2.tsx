import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketplaceSection from "@/components/MarketplaceSection";
const About2 = () => {
  const {
    t
  } = useLanguage();
  const milestones = [{
    year: 2013,
    title: "Основание компании",
    description: "Открытие первого офиса в Москве"
  }, {
    year: 2015,
    title: "Выход на международный рынок",
    description: "Открытие представительства в Гуанчжоу"
  }, {
    year: 2018,
    title: "Расширение услуг",
    description: "Запуск услуг по поиску поставщиков"
  }, {
    year: 2020,
    title: "Цифровая трансформация",
    description: "Внедрение системы онлайн-отслеживания"
  }, {
    year: 2023,
    title: "Новые горизонты",
    description: "Расширение географии услуг"
  }];
  return <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutUs')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              {t('aboutSubtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-lg text-cargo-gray-700 mb-6">Panda Logistic - международная логистическая компания, специализирующаяся на организации поставок из Китая. Наша миссия - сделать международную торговлю доступной и безопасной для каждого клиента.</p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 bg-cargo-gray-100 rounded-lg">
                    <div className="text-3xl font-bold text-cargo-red">10+</div>
                    <div className="text-sm text-cargo-gray-600">лет опыта</div>
                  </div>
                  <div className="text-center p-6 bg-cargo-gray-100 rounded-lg">
                    <div className="text-3xl font-bold text-cargo-red">5000+</div>
                    <div className="text-sm text-cargo-gray-600">клиентов</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-cargo-red/10 rounded-lg transform rotate-3"></div>
                <img alt="Team" className="relative rounded-lg shadow-lg" src="/lovable-uploads/903ecf9d-7422-48eb-b6de-a76e64a037c6.jpg" />
              </div>
            </div>

            <MarketplaceSection />

            
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};
export default About2;