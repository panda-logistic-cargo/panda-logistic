
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Bolt, ChartLine, Leaf } from "lucide-react";
import ResponsiveContainer from "@/components/ResponsiveContainer";

const Services = () => {
  const { t } = useLanguage();

  const mainServices = [
    {
      id: 1,
      icon: <Shield className="h-6 w-6" />,
      title: "Поиск поставщиков",
      description: "Предоставляем доступ к проверенной базе производителей и оптовых поставщиков в Китае. Проводим верификацию и проверку бизнес-лицензий.",
      link: "/services/supplier-search"
    },
    {
      id: 2,
      icon: <Bolt className="h-6 w-6" />,
      title: "Выкуп с маркетплейсов",
      description: "Осуществляем закупки с китайских торговых площадок: Taobao, 1688, Alibaba и других. Защита от недобросовестных продавцов.",
      link: "/services/marketplace-purchase"
    },
    {
      id: 3,
      icon: <ChartLine className="h-6 w-6" />,
      title: "Консолидация грузов",
      description: "Объединяем товары от разных поставщиков на нашем складе в Китае для оптимизации доставки и снижения затрат.",
      link: "/services/cargo-consolidation"
    },
    {
      id: 4,
      icon: <Leaf className="h-6 w-6" />,
      title: "Доставка грузов",
      description: "Организуем доставку из Китая в Россию всеми видами транспорта: авиа, авто, жд, море. Полное таможенное оформление.",
      link: "/services/delivery"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <Navbar />
      <ResponsiveContainer className="pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {mainServices.map((service) => (
            <div 
              key={service.id} 
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 group hover:from-gray-800 hover:to-gray-700 transition-all"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cargo-red/10 text-cargo-red">
                  {service.icon}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="text-gray-300 mb-6 text-lg">{service.description}</p>
              
              <Button 
                variant="outline" 
                className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white"
                onClick={() => window.location.href = service.link}
              >
                Подробнее
              </Button>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cargo-red/20 to-transparent rounded-bl-[100px] -z-10 transition-all duration-300 group-hover:scale-150 group-hover:opacity-50" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Нужна консультация?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Свяжитесь с нашими специалистами для получения подробной информации о наших услугах
            и расчета стоимости вашего проекта.
          </p>
          <Button 
            className="bg-cargo-red hover:bg-cargo-red/90"
            onClick={() => window.location.href = '/contacts'}
          >
            Связаться с нами
          </Button>
        </div>
      </ResponsiveContainer>
      <Footer />
    </div>
  );
};

export default Services;
