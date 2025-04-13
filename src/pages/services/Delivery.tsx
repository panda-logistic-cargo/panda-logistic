
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Phone, Mail, Plane, Ship, Train, Truck } from "lucide-react";

const Delivery = () => {
  const { t } = useLanguage();

  const deliveryMethods = [
    {
      icon: <Plane className="h-8 w-8 text-cargo-red" />,
      title: "Авиадоставка",
      time: "7-12 дней",
      description: "Самый быстрый способ доставки грузов из Китая. Идеально подходит для срочных отправлений, образцов продукции и дорогостоящих товаров.",
      features: [
        "Минимальные сроки доставки",
        "Высокий уровень безопасности",
        "Возможность отправки небольших партий",
        "Оперативное таможенное оформление"
      ]
    },
    {
      icon: <Train className="h-8 w-8 text-cargo-red" />,
      title: "Железнодорожная доставка",
      time: "18-25 дней",
      description: "Оптимальное соотношение цены и скорости. Подходит для большинства коммерческих грузов средних объемов.",
      features: [
        "Стабильное расписание отправлений",
        "Средние сроки доставки",
        "Доступная стоимость перевозки",
        "Возможность отслеживания груза"
      ]
    },
    {
      icon: <Ship className="h-8 w-8 text-cargo-red" />,
      title: "Морская доставка",
      time: "35-45 дней",
      description: "Экономичный вариант для крупных и тяжелых грузов. Идеально подходит для регулярных поставок больших объемов.",
      features: [
        "Низкая стоимость перевозки",
        "Возможность отправки крупногабаритных грузов",
        "Высокая грузоподъемность",
        "Экологичность перевозки"
      ]
    },
    {
      icon: <Truck className="h-8 w-8 text-cargo-red" />,
      title: "Автодоставка",
      time: "20-30 дней",
      description: "Удобный вариант для доставки в регионы, недоступные для других видов транспорта. Возможность доставки «до двери».",
      features: [
        "Гибкий маршрут перевозки",
        "Доставка до конкретного адреса",
        "Возможность комбинирования с другими видами транспорта",
        "Подходит для средних партий грузов"
      ]
    }
  ];

  const additionalServices = [
    "Таможенное оформление",
    "Страхование грузов",
    "Сертификация продукции",
    "Отслеживание грузов в реальном времени",
    "Ответственное хранение"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Link to="/services" className="text-cargo-red hover:underline mb-2 inline-block">
                &larr; {t('allServices')}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{t('delivery')}</h1>
            </div>
            <Button className="bg-cargo-red hover:bg-cargo-red/90 mt-4 md:mt-0">
              {t('orderService')}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-cargo-gray-700 mb-6">
                Мы предлагаем различные способы доставки грузов из Китая в Россию и страны СНГ, 
                учитывая особенности вашего груза, сроки и бюджет. Наши специалисты помогут выбрать 
                оптимальный маршрут и вид транспорта для вашего груза, обеспечивая его безопасную 
                и своевременную доставку до конечного пункта назначения.
              </p>

              <h2 className="text-2xl font-bold mb-6">Способы доставки</h2>
              <div className="space-y-8 mb-10">
                {deliveryMethods.map((method, index) => (
                  <div key={index} className="bg-white border border-cargo-gray-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
                      <div className="mr-4 mb-4 md:mb-0">{method.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold">{method.title}</h3>
                        <div className="text-cargo-red font-semibold">{method.time}</div>
                      </div>
                    </div>
                    <p className="text-cargo-gray-700 mb-4">{method.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Особенности:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {method.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">Дополнительные услуги</h2>
              <ul className="space-y-3 mb-8">
                {additionalServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-cargo-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-4">Рассчитать стоимость</h3>
                <p className="text-cargo-gray-700 mb-6">
                  Используйте наш онлайн-калькулятор для предварительного расчета стоимости доставки вашего груза
                </p>
                <Link to="/calculator">
                  <Button className="bg-cargo-red hover:bg-cargo-red/90 w-full mb-4">
                    Перейти к калькулятору
                  </Button>
                </Link>
                <p className="text-sm text-cargo-gray-600">
                  Или свяжитесь с нами для получения точного расчета с учетом всех особенностей вашего груза
                </p>
              </div>

              <div className="bg-white border border-cargo-gray-200 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-xl mb-4">Нужна консультация?</h3>
                <p className="text-cargo-gray-700 mb-4">
                  Наши специалисты помогут выбрать оптимальный способ доставки для вашего груза
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

              <div className="bg-cargo-red/5 border border-cargo-red/20 p-6 rounded-lg mt-6">
                <h3 className="font-bold mb-2">Отслеживание груза</h3>
                <p className="text-cargo-gray-700 mb-4">
                  Вы можете отслеживать статус вашего груза в режиме реального времени в личном кабинете
                </p>
                <Button variant="outline" className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white w-full">
                  Отследить груз
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-cargo-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-6">Другие услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to="/services/supplier-search" 
                className="block p-4 border border-cargo-gray-200 rounded-lg hover:border-cargo-red hover:shadow-md transition-all"
              >
                <h3 className="font-bold">{t('supplierSearch')}</h3>
              </Link>
              <Link 
                to="/services/marketplace-purchase" 
                className="block p-4 border border-cargo-gray-200 rounded-lg hover:border-cargo-red hover:shadow-md transition-all"
              >
                <h3 className="font-bold">{t('marketplacePurchase')}</h3>
              </Link>
              <Link 
                to="/services/cargo-consolidation" 
                className="block p-4 border border-cargo-gray-200 rounded-lg hover:border-cargo-red hover:shadow-md transition-all"
              >
                <h3 className="font-bold">{t('cargoConsolidation')}</h3>
              </Link>
              <Link 
                to="/services/business-tours" 
                className="block p-4 border border-cargo-gray-200 rounded-lg hover:border-cargo-red hover:shadow-md transition-all"
              >
                <h3 className="font-bold">{t('businessTours')}</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
