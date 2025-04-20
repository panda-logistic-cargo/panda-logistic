
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Search, ShoppingCart, CreditCard, Package, CheckCircle, Truck, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-cargo-red/20 transition-all group">
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cargo-red/10 text-cargo-red group-hover:bg-cargo-red group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-cargo-gray-500">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('supplierSearch'),
      description: 'Поможем найти надежных поставщиков в Китае под ваши требования и бюджет.',
      icon: <Search className="h-6 w-6" />
    },
    {
      title: t('marketplacePurchase'),
      description: 'Выкуп товаров с популярных китайских площадок Taobao, 1688, Alibaba и других.',
      icon: <ShoppingCart className="h-6 w-6" />
    },
    {
      title: t('supplierPayment'),
      description: 'Безопасные платежи китайским поставщикам в любой валюте с минимальной комиссией.',
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      title: t('cargoConsolidation'),
      description: 'Объединение нескольких поставок на нашем складе для оптимизации расходов.',
      icon: <Package className="h-6 w-6" />
    },
    {
      title: t('inspection'),
      description: 'Проверка качества, количества и комплектности товара перед отправкой.',
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      title: t('delivery'),
      description: 'Доставка любым способом: авиа, жд, морем, автотранспортом до вашего склада.',
      icon: <Truck className="h-6 w-6" />
    },
    {
      title: t('businessTours'),
      description: 'Организация поездок в Китай для посещения выставок и встреч с поставщиками.',
      icon: <Plane className="h-6 w-6" />
    }
  ];

  return (
    <section className="py-20 bg-cargo-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('servicesTitle')}</h2>
          <div className="w-20 h-1 bg-cargo-red mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/services">
            <Button 
              variant="outline" 
              className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white"
            >
              {t('viewAllServices')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
