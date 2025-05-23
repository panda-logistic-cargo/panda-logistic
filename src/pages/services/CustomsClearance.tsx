
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Phone, Mail, Calculator, MessageSquare } from "lucide-react";
import OtherServicesSection from "@/components/OtherServicesSection";

const CustomsClearance = () => {
  const { t } = useLanguage();

  const benefits = [
    "Полное таможенное оформление импортных и экспортных грузов",
    "Расчет таможенных платежей и определение кода ТН ВЭД",
    "Подготовка полного пакета документов для таможни",
    "Консультации по вопросам таможенного законодательства",
    "Представление интересов в таможенных органах"
  ];

  const stages = [
    {
      number: "01",
      title: "Анализ документов",
      description: "Проверяем документы и определяем оптимальный способ оформления"
    },
    {
      number: "02",
      title: "Расчет платежей",
      description: "Рассчитываем таможенные платежи и определяем код ТН ВЭД"
    },
    {
      number: "03",
      title: "Подготовка декларации",
      description: "Готовим таможенную декларацию и сопроводительные документы"
    },
    {
      number: "04",
      title: "Подача документов",
      description: "Подаем документы в таможенные органы и контролируем процесс"
    },
    {
      number: "05",
      title: "Выпуск товара",
      description: "Получаем разрешение на выпуск товара в свободное обращение"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/services">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('allServices')}
            </Button>
          </Link>
          
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Таможенное оформление</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              Предоставляем полный комплекс услуг по таможенному оформлению грузов из Китая. 
              Наши специалисты помогут правильно классифицировать товар, рассчитать таможенные платежи 
              и подготовить все необходимые документы для быстрого прохождения таможенной очистки.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
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
                {stages.map(stage => (
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
                <p className="text-2xl font-bold text-cargo-red mb-4">от $300</p>
                <p className="text-sm text-cargo-gray-600 mb-6">
                  Окончательная стоимость зависит от типа товара, кода ТН ВЭД и сложности оформления
                </p>
                <Link to="/calculator">
                  <Button className="bg-cargo-red hover:bg-cargo-red/90 w-full mb-4">
                    <Calculator className="mr-2 h-4 w-4" />
                    Рассчитать стоимость доставки
                  </Button>
                </Link>
                <Link to="/contacts">
                  <Button variant="outline" className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {t('requestConsultation')}
                  </Button>
                </Link>
              </div>

              <div className="bg-white border border-cargo-gray-200 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-xl mb-4">Остались вопросы?</h3>
                <p className="text-cargo-gray-700 mb-4">
                  Свяжитесь с нашими специалистами для получения подробной консультации по таможенному оформлению.
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

          <OtherServicesSection excludeService="/services/customs-clearance" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomsClearance;
