
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Phone, Mail, Calculator, MessageSquare } from "lucide-react";
import OtherServicesSection from "@/components/OtherServicesSection";

const CargoConsolidation = () => {
  const { t } = useLanguage();

  const benefits = [
    "Оптимизация затрат на доставку сборных грузов",
    "Консолидация товаров от разных поставщиков в одну отправку",
    "Уменьшение рисков повреждения или потери груза",
    "Удобный контроль и отслеживание всех этапов доставки",
    "Экономия времени и ресурсов на организацию логистики"
  ];

  const stages = [
    {
      number: "01",
      title: "Приемка товаров",
      description: "Принимаем товары от ваших поставщиков на нашем складе в Китае"
    },
    {
      number: "02",
      title: "Проверка и упаковка",
      description: "Проверяем количество и качество товаров, надежно упаковываем для транспортировки"
    },
    {
      number: "03",
      title: "Формирование партии",
      description: "Формируем оптимальную партию для отправки с учетом габаритов и веса"
    },
    {
      number: "04",
      title: "Оформление документов",
      description: "Подготавливаем все необходимые документы для таможенного оформления"
    },
    {
      number: "05",
      title: "Отправка и доставка",
      description: "Отправляем груз выбранным способом и доставляем до вашего склада"
    }
  ];

  return <div className="min-h-screen">
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('cargoConsolidation')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              Услуга консолидации грузов позволяет объединить товары от разных поставщиков в одну отправку, что значительно снижает стоимость доставки и упрощает логистику. Мы обеспечиваем приемку, проверку, упаковку и оформление всех необходимых документов для таможенного оформления.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-cargo-gray-700 mb-6">
                Услуга консолидации грузов позволяет объединить товары от разных поставщиков в одну отправку, 
                что значительно снижает стоимость доставки и упрощает логистику. Мы обеспечиваем приемку, 
                проверку, упаковку и оформление всех необходимых документов для таможенного оформления.
              </p>

              <h2 className="text-2xl font-bold mb-4">Преимущества консолидации</h2>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Этапы консолидации груза</h2>
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
                <p className="text-2xl font-bold text-cargo-red mb-4">от $30 за м3</p>
                <p className="text-sm text-cargo-gray-600 mb-6">
                  Окончательная стоимость зависит от объема груза, количества поставщиков и дополнительных услуг (упаковка, страхование и т.д.)
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
                  Свяжитесь с нашими специалистами для получения подробной консультации по консолидации грузов и расчета стоимости доставки.
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

          <OtherServicesSection excludeService="/services/cargo-consolidation" />
        </div>
      </div>
      <Footer />
    </div>;
};

export default CargoConsolidation;
