
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { PackageOpen, DollarSign, User, Shield } from "lucide-react";

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, icon, index }) => {
  return (
    <div className="relative group p-8 rounded-2xl bg-white border border-cargo-gray-200 hover:border-cargo-red/20 transition-all duration-300 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-cargo-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative z-10">
        <div className="mb-6 inline-block p-3 bg-gradient-to-br from-cargo-red/10 to-cargo-red/5 rounded-xl group-hover:from-cargo-red/20 group-hover:to-cargo-red/10 transition-all duration-300">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-8 h-8 text-cargo-red",
            strokeWidth: 1.5
          })}
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-cargo-red transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-cargo-gray-600">
          {description}
        </p>
        
        <div className="absolute top-6 right-8 text-6xl font-bold text-cargo-gray-100 group-hover:text-cargo-red/10 transition-colors duration-300">
          {index + 1}
        </div>
      </div>
    </div>
  );
};

const AdvantagesSection: React.FC = () => {
  const { t } = useLanguage();
  
  const advantages = [
    {
      title: t('advantage1Title'),
      description: t('advantage1Text'),
      icon: <PackageOpen />
    },
    {
      title: t('advantage2Title'),
      description: t('advantage2Text'),
      icon: <DollarSign />
    },
    {
      title: t('advantage3Title'),
      description: t('advantage3Text'),
      icon: <User />
    },
    {
      title: t('advantage4Title'),
      description: t('advantage4Text'),
      icon: <Shield />
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cargo-gray-50/50 to-white" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cargo-red to-cargo-red/70 bg-clip-text text-transparent">
              {t('advantagesTitle')}
            </span>
          </h2>
          <p className="text-cargo-gray-600 max-w-2xl mx-auto">
            Мы предоставляем полный спектр услуг по доставке грузов из Китая
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard
              key={index}
              title={advantage.title}
              description={advantage.description}
              icon={advantage.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;

