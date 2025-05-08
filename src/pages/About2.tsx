
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                <Button className="w-full md:w-auto bg-cargo-red hover:bg-cargo-red/90">
                  Начать сотрудничество
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-cargo-red/10 rounded-lg transform rotate-3"></div>
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Team" className="relative rounded-lg shadow-lg" />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Наша история</h2>
              <div className="space-y-8">
                {milestones.map((milestone, index) => <div key={index} className="flex gap-8 items-start">
                    <div className="flex-shrink-0 w-20 h-20 bg-cargo-red/10 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-cargo-red">{milestone.year}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-cargo-gray-600">{milestone.description}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};
export default About2;
