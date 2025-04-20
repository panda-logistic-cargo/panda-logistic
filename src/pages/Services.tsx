
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Define the servicesList array
const servicesList = [
  {
    id: 1,
    title: "Поиск поставщиков",
    description: "Поможем найти надежных производителей товаров в Китае по вашим требованиям и спецификациям.",
    image: "/placeholder.svg",
    link: "/services/supplier-search"
  },
  {
    id: 2,
    title: "Выкуп с маркетплейсов",
    description: "Осуществляем закупки с китайских торговых площадок: Taobao, 1688, Alibaba и других.",
    image: "/placeholder.svg",
    link: "/services/marketplace-purchase"
  },
  {
    id: 3,
    title: "Консолидация грузов",
    description: "Объединяем товары от разных поставщиков на нашем складе в Китае для оптимизации доставки.",
    image: "/placeholder.svg",
    link: "/services/cargo-consolidation"
  },
  {
    id: 4,
    title: "Доставка грузов",
    description: "Организуем доставку из Китая в Россию всеми видами транспорта: авиа, авто, жд, море.",
    image: "/placeholder.svg",
    link: "/services/delivery"
  },
  {
    id: 5,
    title: "Бизнес-туры в Китай",
    description: "Организуем поездки на фабрики и оптовые рынки Китая с опытным сопровождающим.",
    image: "/placeholder.svg",
    link: "/services/business-tours"
  },
  {
    id: 6,
    title: "Таможенное оформление",
    description: "Помощь в подготовке документов и прохождении таможенных процедур при импорте товаров.",
    image: "/placeholder.svg",
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
          <Link to="/">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Button>
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('services')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              Мы предлагаем полный спектр услуг для бизнеса по импорту товаров из Китая.
              От поиска поставщиков до доставки груза до двери.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesList.map((service) => (
              <div key={service.id} className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 w-full relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-cargo-gray-600 mb-4">{service.description}</p>
                  <Link to={service.link}>
                    <Button variant="outline" className="mt-2 border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white">
                      Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cargo-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Нужна консультация?</h2>
            <p className="text-cargo-gray-700 mb-4">
              Свяжитесь с нашими специалистами для получения подробной информации о наших услугах
              и расчета стоимости вашего проекта.
            </p>
            <Link to="/contacts">
              <Button className="bg-cargo-red hover:bg-cargo-red/90">
                Связаться с нами
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
