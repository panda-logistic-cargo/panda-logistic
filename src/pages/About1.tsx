
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, Users, Globe, TrendingUp } from "lucide-react";

const About1 = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{t('aboutUs')}</h1>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
              <div className="relative h-64 bg-gradient-to-r from-cargo-red to-cargo-red/80">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <p className="text-white text-2xl font-medium max-w-xl text-center px-4">
                    Мы соединяем бизнес с надежными поставщиками из Китая уже более 10 лет
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-lg text-cargo-gray-700 mb-6">
                  Cargo A71 - это команда профессионалов с обширным опытом в сфере международной логистики и ВЭД. 
                  Мы помогаем компаниям наладить эффективные поставки из Китая, предоставляя полный спектр услуг: 
                  от поиска надежных поставщиков до доставки груза до вашего склада.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="flex items-start gap-4">
                    <Award className="h-8 w-8 text-cargo-red flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Гарантия качества</h3>
                      <p className="text-cargo-gray-600">Тщательная проверка поставщиков и контроль качества продукции</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Users className="h-8 w-8 text-cargo-red flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Опытная команда</h3>
                      <p className="text-cargo-gray-600">Специалисты с многолетним опытом работы в сфере ВЭД</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Globe className="h-8 w-8 text-cargo-red flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Международное присутствие</h3>
                      <p className="text-cargo-gray-600">Офисы в России и Китае для эффективной работы</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <TrendingUp className="h-8 w-8 text-cargo-red flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Развитие</h3>
                      <p className="text-cargo-gray-600">Постоянное улучшение сервиса и внедрение новых технологий</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-cargo-red hover:bg-cargo-red/90">
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About1;
