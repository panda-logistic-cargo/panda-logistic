
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const servicesList = [
    {
      id: "supplier-search",
      title: t("supplierSearch"),
      description: "Поиск надежных поставщиков в Китае по вашим критериям с проверкой их репутации и производственных возможностей.",
      link: "/services/supplier-search",
    },
    {
      id: "marketplace-purchase",
      title: t("marketplacePurchase"),
      description: "Выкуп товаров с популярных китайских маркетплейсов, таких как Taobao, Tmall, 1688 и других.",
      link: "/services/marketplace-purchase",
    },
    {
      id: "cargo-consolidation",
      title: t("cargoConsolidation"),
      description: "Объединение грузов от разных поставщиков на нашем складе в Китае для оптимизации расходов на международную доставку.",
      link: "/services/cargo-consolidation",
    },
    {
      id: "delivery",
      title: t("delivery"),
      description: "Организация доставки вашего груза из Китая различными способами: авиа, железнодорожным, морским и автомобильным транспортом.",
      link: "/services/delivery",
    },
    {
      id: "business-tours",
      title: t("businessTours"),
      description: "Организация бизнес-туров в Китай для посещения выставок, фабрик и проведения переговоров с потенциальными партнерами.",
      link: "/services/business-tours",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 mt-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('services')}</h1>
          <p className="text-lg text-cargo-gray-700 mb-10 max-w-3xl">
            Мы предлагаем полный спектр услуг для бизнеса по импорту товаров из Китая.
            От поиска поставщиков до доставки груза до двери, мы берем на себя все этапы логистического процесса.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesList.map((service) => (
              <div key={service.id} className="border border-cargo-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-cargo-gray-600 mb-4">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="outline" className="mt-2 border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white">
                    Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
