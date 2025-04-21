import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Phone, Mail, Calendar } from "lucide-react";
import OtherServicesSection from "@/components/OtherServicesSection";

const BusinessTours = () => {
  const { t } = useLanguage();
  
  const benefits = [
    "Посещение крупнейших выставок и торговых центров Китая",
    "Встречи с потенциальными поставщиками и производителями",
    "Посещение фабрик и производств для оценки качества",
    "Переговоры о сотрудничестве с профессиональным переводчиком",
    "Заключение контрактов напрямую с производителями",
    "Полное сопровождение и организация логистики внутри Китая"
  ];
  
  const tourIncludes = [
    "Встреча в аэропорту и трансфер в отель",
    "Проживание в комфортабельном отеле 4*",
    "Транспортное обслуживание по программе тура",
    "Услуги профессионального переводчика",
    "Организация посещения выставок и фабрик",
    "Помощь в переговорах и заключении контрактов",
    "Консультации по вопросам импорта и логистики"
  ];
  
  const upcomingEvents = [
    // Все события удалены по просьбе пользователя
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('businessTours')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              Организуем индивидуальные и групповые бизнес-туры в Китай с целью посещения выставок, поиска поставщиков, проверки фабрик и налаживания деловых контактов. Наши специалисты со знанием китайского языка и бизнес-культуры помогут вам провести успешные переговоры и заключить выгодные контракты.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-cargo-gray-700 mb-6">Организуем индивидуальные и групповые бизнес-туры в Китай с целью посещения выставок, поиска поставщиков, проверки фабрик и налаживания деловых контактов. Наши специалисты со знанием китайского языка и бизнес-культуры помогут вам провести успешные переговоры и заключить выгодные контракты.</p>

              <h2 className="text-2xl font-bold mb-4">Преимущества бизнес-туров</h2>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">В стоимость тура включено</h2>
              <ul className="space-y-3 mb-8">
                {tourIncludes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 mb-8">
                {/* Нет событий для отображения */}
              </div>
            </div>

            <div>
              <div className="bg-cargo-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-4">Стоимость услуги</h3>
                <p className="text-cargo-gray-700 mb-2">Базовая стоимость:</p>
                <p className="text-2xl font-bold text-cargo-red mb-4">от $1500</p>
                <p className="text-sm text-cargo-gray-600 mb-6">
                  Точная стоимость зависит от города посещения, длительности поездки, необходимости 
                  посещения определенных фабрик и выставок, а также класса отеля.
                </p>
                <Button className="bg-cargo-red hover:bg-cargo-red/90 w-full">
                  Запросить консультацию
                </Button>
              </div>

              <div className="bg-white border border-cargo-gray-200 rounded-lg p-6 mt-6 py-[20px]">
                <h3 className="font-bold text-xl mb-4">Популярные направления</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Гуанчжоу</span>
                    <span className="text-cargo-red font-medium">от $1500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Шэньчжэнь</span>
                    <span className="text-cargo-red font-medium">от $1600</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Иу</span>
                    <span className="text-cargo-red font-medium">от $1550</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Шанхай</span>
                    <span className="text-cargo-red font-medium">от $1700</span>
                  </div>
                </div>
              </div>

              <div className="bg-cargo-red/5 border border-cargo-red/20 p-6 rounded-lg mt-6">
                <h3 className="font-bold mb-2">Подготовка к поездке</h3>
                <p className="text-cargo-gray-700 mb-4">
                  Перед организацией бизнес-тура мы проводим предварительную консультацию для 
                  выяснения ваших целей и составления оптимального маршрута.
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

          <OtherServicesSection excludeService="/services/business-tours" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessTours;
