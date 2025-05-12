
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";

const servicesList = [
  {
    id: 1,
    title: "Поиск поставщиков",
    description: "Поможем найти надежных производителей товаров в Китае по вашим требованиям и спецификациям.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    link: "/services/supplier-search"
  },
  {
    id: 2,
    title: "Выкуп с маркетплейсов",
    description: "Осуществляем закупки с китайских торговых площадок: Taobao, 1688, Alibaba и других.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop",
    link: "/services/marketplace-purchase"
  },
  {
    id: 3,
    title: "Консолидация грузов",
    description: "Объединяем товары от разных поставщиков на нашем складе в Китае для оптимизации доставки.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800&auto=format&fit=crop",
    link: "/services/cargo-consolidation"
  },
  {
    id: 4,
    title: "Доставка грузов",
    description: "Организуем доставку из Китая в Россию всеми видами транспорта: авиа, авто, жд, море.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
    link: "/services/delivery"
  },
  {
    id: 5,
    title: "Бизнес-туры в Китай",
    description: "Организуем поездки на фабрики и оптовые рынки Китая с опытным сопровождающим.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    link: "/services/business-tours"
  },
  {
    id: 6,
    title: "Таможенное оформление",
    description: "Помощь в подготовке документов и прохождении таможенных процедур при импорте товаров.",
    image: "https://images.unsplash.com/photo-1568234928966-359c35dd8327?q=80&w=800&auto=format&fit=crop",
    link: "/services"
  }
];

const Services = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('services')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {servicesList.map((service, index) => (
              <div 
                key={service.id} 
                className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-cargo-red/0 to-cargo-red/80 opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-cargo-gray-600 mb-4">{service.description}</p>
                  <Link to={service.link}>
                    <Button variant="outline" className="mt-2 border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white transition-colors duration-300">
                      Подробнее <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cargo-gray-100 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-bold mb-4">{t('needConsultation')}</h2>
            <p className="text-cargo-gray-700 mb-4">
              {t('consultationDescription')}
            </p>
            <Link to="/contacts">
              <Button className="bg-cargo-red hover:bg-cargo-red/90">
                {t('contactUs')} <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
