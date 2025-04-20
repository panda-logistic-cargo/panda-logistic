
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Phone, Mail } from "lucide-react";

const CargoConsolidation = () => {
  const { t } = useLanguage();

  const benefits = [
    "Существенная экономия на международной доставке",
    "Оптимизация логистических расходов",
    "Снижение рисков повреждения или утери груза",
    "Упрощение документооборота",
    "Контроль качества товаров перед отправкой"
  ];

  const services = [
    {
      title: "Приём и хранение грузов",
      description: "Принимаем товары от разных поставщиков на наш склад в Китае и храним их до формирования полной партии"
    },
    {
      title: "Проверка товаров",
      description: "Проводим базовую проверку качества и соответствия товаров заявленным характеристикам"
    },
    {
      title: "Фото- и видеоотчёты",
      description: "Предоставляем подробные фото и видеоотчёты о состоянии и количестве поступивших товаров"
    },
    {
      title: "Переупаковка и маркировка",
      description: "Оптимизируем упаковку для минимизации объёма и предотвращения повреждений при транспортировке"
    },
    {
      title: "Формирование партии",
      description: "Объединяем товары в одну партию для международной перевозки"
    },
    {
      title: "Подготовка документации",
      description: "Оформляем все необходимые документы для международной перевозки и таможенного оформления"
    }
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
              <h1 className="text-3xl md:text-4xl font-bold">{t('cargoConsolidation')}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-cargo-gray-700 mb-6">
                Консолидация груза — это объединение нескольких небольших партий товаров в одну крупную отправку. 
                Такой подход позволяет существенно снизить затраты на международную перевозку и упростить логистические процессы.
                Наши склады в Китае принимают товары от различных поставщиков, проводят проверку качества и формируют оптимальные партии для отправки.
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

              <h2 className="text-2xl font-bold mb-4">Включенные услуги</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-cargo-gray-100 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-cargo-gray-700">{service.description}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">Процесс консолидации</h2>
              <div className="relative">
                {/* Вертикальная линия для соединения шагов */}
                <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-cargo-gray-200"></div>
                
                <div className="space-y-8">
                  <div className="relative flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cargo-red text-white flex items-center justify-center mr-4 z-10">
                      1
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-lg">Получение персонального адреса склада</h3>
                      <p className="text-cargo-gray-700">После оформления заказа вы получаете персональный адрес нашего склада в Китае для отправки товаров</p>
                    </div>
                  </div>
                  
                  <div className="relative flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cargo-red text-white flex items-center justify-center mr-4 z-10">
                      2
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-lg">Прием и проверка товаров</h3>
                      <p className="text-cargo-gray-700">Мы принимаем товары от поставщиков, проверяем их количество и базовое качество</p>
                    </div>
                  </div>
                  
                  <div className="relative flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cargo-red text-white flex items-center justify-center mr-4 z-10">
                      3
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-lg">Подтверждение и отчеты</h3>
                      <p className="text-cargo-gray-700">Отправляем вам фото и видеоотчеты о принятых товарах, ожидаем подтверждения для дальнейших действий</p>
                    </div>
                  </div>
                  
                  <div className="relative flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cargo-red text-white flex items-center justify-center mr-4 z-10">
                      4
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-lg">Оптимизация упаковки</h3>
                      <p className="text-cargo-gray-700">Переупаковываем товары для минимизации объема и обеспечения сохранности при транспортировке</p>
                    </div>
                  </div>
                  
                  <div className="relative flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cargo-red text-white flex items-center justify-center mr-4 z-10">
                      5
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-lg">Формирование партии и отправка</h3>
                      <p className="text-cargo-gray-700">Объединяем все товары в одну партию и отправляем выбранным способом доставки</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-cargo-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-4">Стоимость услуги</h3>
                <p className="text-cargo-gray-700 mb-2">Базовая стоимость:</p>
                <p className="text-2xl font-bold text-cargo-red mb-4">от $10 за место</p>
                <p className="text-sm text-cargo-gray-600 mb-6">
                  Точная стоимость зависит от количества мест, веса, объема и необходимости дополнительных услуг по переупаковке и проверке товара
                </p>
                <Button className="bg-cargo-red hover:bg-cargo-red/90 w-full mb-4">
                  {t('orderService')}
                </Button>
                <Button variant="outline" className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white w-full">
                  {t('requestConsultation')}
                </Button>
              </div>

              <div className="bg-white border border-cargo-gray-200 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-xl mb-4">Остались вопросы?</h3>
                <p className="text-cargo-gray-700 mb-4">
                  Свяжитесь с нашими специалистами для получения подробной консультации по услуге консолидации груза.
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
                to="/services/delivery" 
                className="block p-4 border border-cargo-gray-200 rounded-lg hover:border-cargo-red hover:shadow-md transition-all"
              >
                <h3 className="font-bold">{t('delivery')}</h3>
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

export default CargoConsolidation;
