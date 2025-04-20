import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import OtherServicesSection from "@/components/OtherServicesSection";

const Delivery = () => {
  const { t } = useLanguage();

  const deliveryOptions = [
    {
      title: "Авиа доставка",
      description: "Самый быстрый способ доставки. Сроки: 7-15 дней",
      priceRange: "от $15 за кг"
    },
    {
      title: "Железнодорожная доставка",
      description: "Оптимальное соотношение стоимости и сроков. Сроки: 18-25 дней",
      priceRange: "от $5 за кг"
    },
    {
      title: "Морская доставка",
      description: "Экономичный вариант для крупных грузов. Сроки: 35-45 дней",
      priceRange: "от $2 за кг"
    },
    {
      title: "Автомобильная доставка",
      description: "Гибкий вариант с возможностью доставки до двери. Сроки: 20-30 дней",
      priceRange: "от $3 за кг"
    }
  ];

  const benefits = [
    "Полное таможенное оформление грузов",
    "Страхование и обеспечение безопасности перевозки",
    "Отслеживание местоположения груза в режиме реального времени",
    "Гибкая система тарификации в зависимости от объема и веса",
    "Доставка до двери или до указанного склада"
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
              <h1 className="text-3xl md:text-4xl font-bold">{t('delivery')}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-cargo-gray-700 mb-6">
                Предлагаем комплексные решения по доставке грузов из Китая в Россию и страны СНГ. 
                Выбирайте оптимальный способ доставки в зависимости от ваших приоритетов: сроки, стоимость или специфика груза.
              </p>

              <h2 className="text-2xl font-bold mb-4">Способы доставки</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {deliveryOptions.map((option, index) => (
                  <div key={index} className="border border-cargo-gray-200 rounded-lg p-4 hover:border-cargo-red hover:shadow-md transition-all">
                    <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                    <p className="text-cargo-gray-700 mb-2">{option.description}</p>
                    <p className="text-cargo-red font-medium">{option.priceRange}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">Преимущества нашей логистики</h2>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Типы грузов</h2>
              <div className="bg-cargo-gray-100 p-6 rounded-lg mb-8">
                <p className="mb-4">Мы осуществляем доставку различных типов грузов:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Коммерческие грузы для бизнеса</li>
                  <li>Консолидированные сборные грузы</li>
                  <li>Личные вещи и посылки</li>
                  <li>Негабаритные и тяжеловесные грузы</li>
                  <li>Опасные грузы (требуется дополнительное согласование)</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-cargo-gray-100 p-6 rounded-lg sticky top-24">
                <h3 className="font-bold text-xl mb-4">Расчет стоимости доставки</h3>
                <p className="text-sm text-cargo-gray-600 mb-6">
                  Для получения точного расчета стоимости доставки вашего груза, пожалуйста, укажите детали отправления через форму заказа или свяжитесь с нашими специалистами
                </p>
                <Button className="bg-cargo-red hover:bg-cargo-red/90 w-full mb-4">
                  {t('calculateDeliveryCost')}
                </Button>
                <Button variant="outline" className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white w-full">
                  {t('requestConsultation')}
                </Button>

                <div className="mt-6 pt-6 border-t border-cargo-gray-200">
                  <h4 className="font-bold mb-2">Нужна консультация?</h4>
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-cargo-red mr-2" />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-cargo-red mr-2" />
                    <span>logistics@cargoa71.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OtherServicesSection excludeService="/services/delivery" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
