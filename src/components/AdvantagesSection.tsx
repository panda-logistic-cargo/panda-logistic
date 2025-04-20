
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { PackageOpen, DollarSign, User, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, icon, index }) => {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 border-none bg-gradient-to-br from-white to-cargo-gray-100">
      <CardContent className="p-6">
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 rounded-full group-hover:bg-cargo-red/10 transition-all duration-500" />
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-cargo-red/10 group-hover:bg-cargo-red text-cargo-red group-hover:text-white transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-cargo-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
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
    <section className="py-24 bg-gradient-to-b from-white to-cargo-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cargo-red to-cargo-red/70 bg-clip-text text-transparent">
            {t('advantagesTitle')}
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
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center bg-gradient-to-br from-cargo-red/5 to-cargo-red/10 border-none hover:shadow-lg transition-all duration-300">
            <div className="text-4xl font-bold text-cargo-red mb-2">10+</div>
            <p className="text-cargo-gray-700">{t('yearsExperience')}</p>
          </Card>
          <Card className="p-8 text-center bg-gradient-to-br from-cargo-red/5 to-cargo-red/10 border-none hover:shadow-lg transition-all duration-300">
            <div className="text-4xl font-bold text-cargo-red mb-2">15+</div>
            <p className="text-cargo-gray-700">{t('countriesServed')}</p>
          </Card>
          <Card className="p-8 text-center bg-gradient-to-br from-cargo-red/5 to-cargo-red/10 border-none hover:shadow-lg transition-all duration-300">
            <div className="text-4xl font-bold text-cargo-red mb-2">50,000+</div>
            <p className="text-cargo-gray-700">{t('successfulDeliveries')}</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
