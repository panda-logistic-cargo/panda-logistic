
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Search, ShoppingCart, Package, Truck, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, link, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-cargo-red/20 transition-all group h-full flex flex-col">
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cargo-red/10 text-cargo-red group-hover:bg-cargo-red group-hover:text-white transition-colors">
        {icon}
      </div>
      <Link to={link} className="flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 break-words">{title}</h3>
        <p className="text-cargo-gray-500 line-clamp-2 break-words">{description}</p>
      </Link>
    </div>
  );
};

const OtherServicesSection = ({ excludeService }: { excludeService: string }) => {
  const services = [
    {
      title: "Поиск поставщиков",
      description: "Поможем найти надежных производителей товаров в Китае под ваши требования.",
      link: '/services/supplier-search',
      icon: <Search className="h-6 w-6" />
    },
    {
      title: "Выкуп с маркетплейсов",
      description: "Выкуп товаров с популярных китайских площадок Taobao, 1688, Alibaba.",
      link: '/services/marketplace-purchase',
      icon: <ShoppingCart className="h-6 w-6" />
    },
    {
      title: "Консолидация груза",
      description: "Объединение нескольких поставок на нашем складе для оптимизации расходов.",
      link: '/services/cargo-consolidation',
      icon: <Package className="h-6 w-6" />
    },
    {
      title: "Доставка",
      description: "Доставка любым способом: авиа, жд, морем, автотранспортом до вашего склада.",
      link: '/services/delivery',
      icon: <Truck className="h-6 w-6" />
    },
    {
      title: "Бизнес-туры",
      description: "Организация поездок в Китай для посещения выставок и встреч с поставщиками.",
      link: '/services/business-tours',
      icon: <Plane className="h-6 w-6" />
    }
  ];

  const filteredServices = services.filter(service => service.link !== excludeService);

  return (
    <section className="py-16 bg-cargo-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Другие услуги</h2>
          <div className="w-20 h-1 bg-cargo-red mx-auto"></div>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {filteredServices.map((service, index) => (
              <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/3 lg:basis-1/3 p-2">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  link={service.link}
                  icon={service.icon}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious className="relative static translate-y-0 left-0" />
            <CarouselNext className="relative static translate-y-0 right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default OtherServicesSection;
