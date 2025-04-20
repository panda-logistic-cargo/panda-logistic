
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Phone, Mail } from "lucide-react";
import OtherServicesSection from "@/components/OtherServicesSection";

const SupplierSearch = () => {
  const { t } = useLanguage();

  const benefits = [
    "Доступ к проверенной базе производителей и оптовых поставщиков в Китае",
    "Верификация поставщиков: проверка бизнес-лицензии, производственных мощностей и опыта",
    "Организация переговоров и заключение контрактов на выгодных условиях",
    "Контроль качества образцов продукции",
    "Полное сопровождение на всех этапах работы с поставщиком"
  ];

  const stages = [
    {
      number: "01",
      title: "Анализ потребностей",
      description: "Изучаем ваши требования к товару, целевую цену, объемы закупки и другие параметры"
    },
    {
      number: "02",
      title: "Поиск поставщиков",
      description: "Подбираем варианты производителей и оптовых поставщиков, соответствующих вашим критериям"
    },
    {
      number: "03",
      title: "Проверка и верификация",
      description: "Проводим проверку потенциальных поставщиков, их опыта и производственных возможностей"
    },
    {
      number: "04",
      title: "Запрос образцов",
      description: "Организуем получение и проверку качества образцов продукции"
    },
    {
      number: "05",
      title: "Переговоры и контракты",
      description: "Ведем переговоры по условиям сотрудничества и помогаем заключить контракт"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Link to="/services">
                <Button variant="outline" className="mb-8">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('allServices')}
                </Button>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{t('supplierSearch')}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-cargo-gray-700 mb-6">
                Поиск надежных поставщиков — ключевой этап при импорте товаров из Китая. 
                Наши специалисты помогут найти проверенных производителей, соответствующих вашим требованиям 
                по качеству, цене и объемам производства, защищая вас от рисков работы с ��енадежными контрагентами.
              </p>

              <h2 className="text-2xl font-bold mb-4">Преимущества услуги</h2>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Как мы работаем</h2>
              <div className="space-y-6 mb-8">
                {stages.map((stage) => (
                  <div key={stage.number} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cargo-red/10 text-cargo-red flex items-center justify-center mr-4">
                      {stage.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{stage.title}</h3>
                      <p className="text-cargo-gray-700">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-cargo-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-4">Стоимость услуги</h3>
                <p className="text-cargo-gray-700 mb-2">Базовая стоимость:</p>
                <p className="text-2xl font-bold text-cargo-red mb-4">от $500</p>
                <p className="text-sm text-cargo-gray-600 mb-6">
                  Окончательная стоимость зависит от сложности поиска, категории товара и количества требуемых поставщиков
                </p>
                <Button className="bg-cargo-red hover:bg-cargo-red/90 w-full mb-4">
                  Рассчитать стоимость доставки
                </Button>
                <Button variant="outline" className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white w-full">
                  {t('requestConsultation')}
                </Button>
              </div>

              <div className="bg-white border border-cargo-gray-200 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-xl mb-4">Остались вопросы?</h3>
                <p className="text-cargo-gray-700 mb-4">
                  Свяжитесь с нашими специалистами для получения подробной консультации по услуге поиска поставщиков.
                </p>
                <div className="flex items-center mb-2">
                  <Phone className="h-5 w-5 text-cargo-red mr-2" />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-cargo-red mr-2" />
                  <span>info@cargoa71.com</span>
                </div>
              </div>
            </div>
          </div>

          <OtherServicesSection excludeService="/services/supplier-search" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupplierSearch;
