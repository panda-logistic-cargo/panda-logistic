
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 mt-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('aboutUs')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-xl font-bold mb-4">{t('companyDescription')}</h2>
              <p className="text-cargo-gray-700 mb-4">
                Cargo A71 - это международная логистическая компания с многолетним опытом доставки грузов из Китая в Россию и страны СНГ. 
                Мы предлагаем полный комплекс услуг по организации импорта товаров из Китая, включая поиск поставщиков, 
                выкуп с маркетплейсов, консолидацию грузов, проверку качества и доставку различными способами.
              </p>
              <p className="text-cargo-gray-700 mb-4">
                Наша миссия - сделать импорт из Китая доступным и безопасным для каждого клиента, 
                независимо от масштаба его бизнеса. Мы стремимся к постоянному совершенствованию наших услуг, 
                внедрению новых технологий и оптимизации логистических процессов.
              </p>
            </div>
            <div className="bg-cargo-gray-100 p-8 rounded-lg">
              <h2 className="text-xl font-bold mb-4">{t('statistics')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-cargo-red">10+</p>
                  <p className="text-sm text-cargo-gray-600">{t('yearsInMarket')}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-cargo-red">5000+</p>
                  <p className="text-sm text-cargo-gray-600">{t('happyClients')}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-cargo-red">100+</p>
                  <p className="text-sm text-cargo-gray-600">{t('professionalTeam')}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-cargo-red">50000+</p>
                  <p className="text-sm text-cargo-gray-600">{t('deliveredTons')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{t('ourHistory')}</h2>
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="h-10 w-10 rounded-full bg-cargo-red text-white flex items-center justify-center mx-auto">
                    2013
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{t('companyFounded')}</h3>
                  <p className="text-cargo-gray-700">
                    Основание компании Cargo A71 с небольшого офиса и штата из 5 сотрудников.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="h-10 w-10 rounded-full bg-cargo-red text-white flex items-center justify-center mx-auto">
                    2015
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{t('expansion')}</h3>
                  <p className="text-cargo-gray-700">
                    Открытие представительства в Гуанчжоу и расширение штата до 25 сотрудников.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="h-10 w-10 rounded-full bg-cargo-red text-white flex items-center justify-center mx-auto">
                    2018
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{t('newServices')}</h3>
                  <p className="text-cargo-gray-700">
                    Запуск услуг по поиску поставщиков и организации бизнес-туров в Китай.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="h-10 w-10 rounded-full bg-cargo-red text-white flex items-center justify-center mx-auto">
                    2020
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{t('digitalTransformation')}</h3>
                  <p className="text-cargo-gray-700">
                    Внедрение новой системы отслеживания грузов и запуск онлайн-калькулятора стоимости.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="h-10 w-10 rounded-full bg-cargo-red text-white flex items-center justify-center mx-auto">
                    2023
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{t('internationalExpansion')}</h3>
                  <p className="text-cargo-gray-700">
                    Расширение географии услуг на все страны СНГ и открытие новых маршрутов доставки.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{t('ourTeam')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center">
                  <div className="w-40 h-40 bg-cargo-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold text-lg">Иван Иванов</h3>
                  <p className="text-cargo-gray-600">{t('director')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
