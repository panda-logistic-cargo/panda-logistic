
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
    <div 
      className="flex flex-col items-center p-6 text-center"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-cargo-red text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-cargo-gray-500">{description}</p>
    </div>
  );
};

const AdvantagesSection: React.FC = () => {
  const { t } = useLanguage();
  
  const advantages = [
    {
      title: t('advantage1Title'),
      description: t('advantage1Text'),
      icon: <PackageOpen className="h-8 w-8" />
    },
    {
      title: t('advantage2Title'),
      description: t('advantage2Text'),
      icon: <DollarSign className="h-8 w-8" />
    },
    {
      title: t('advantage3Title'),
      description: t('advantage3Text'),
      icon: <User className="h-8 w-8" />
    },
    {
      title: t('advantage4Title'),
      description: t('advantage4Text'),
      icon: <Shield className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('advantagesTitle')}</h2>
          <div className="w-20 h-1 bg-cargo-red mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-cargo-gray-100 rounded-lg">
            <div className="text-4xl font-bold text-cargo-red mb-2">10+</div>
            <p className="text-cargo-gray-700">{t('yearsExperience')}</p>
          </div>
          <div className="text-center p-6 bg-cargo-gray-100 rounded-lg">
            <div className="text-4xl font-bold text-cargo-red mb-2">15+</div>
            <p className="text-cargo-gray-700">{t('countriesServed')}</p>
          </div>
          <div className="text-center p-6 bg-cargo-gray-100 rounded-lg">
            <div className="text-4xl font-bold text-cargo-red mb-2">50,000+</div>
            <p className="text-cargo-gray-700">{t('successfulDeliveries')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
