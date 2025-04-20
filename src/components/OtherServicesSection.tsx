
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Search, ShoppingCart, Package, Truck } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  link: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, link, icon }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-cargo-red/20 transition-all group">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cargo-red/10 text-cargo-red group-hover:bg-cargo-red group-hover:text-white transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
};

const OtherServicesSection = ({ excludeService }: { excludeService: string }) => {
  const services = [
    {
      title: "Поиск поставщиков",
      link: '/services/supplier-search',
      icon: <Search className="h-6 w-6" />
    },
    {
      title: "Выкуп с маркетплейсов",
      link: '/services/marketplace-purchase',
      icon: <ShoppingCart className="h-6 w-6" />
    },
    {
      title: "Консолидация груза",
      link: '/services/cargo-consolidation',
      icon: <Package className="h-6 w-6" />
    },
    {
      title: "Доставка",
      link: '/services/delivery',
      icon: <Truck className="h-6 w-6" />
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              link={service.link}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServicesSection;
