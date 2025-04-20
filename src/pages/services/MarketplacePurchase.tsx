import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Phone, Mail } from "lucide-react";
import OtherServicesSection from "@/components/OtherServicesSection";

const MarketplacePurchase = () => {
  const { t } = useLanguage();

  const marketplaces = [
    "Taobao — популярная В2С площадка с миллионами товаров",
    "Tmall — маркетплейс с брендовыми товарами и гарантией качества",
    "1688.com — оптовая B2B площадка для прямых покупок у производителей",
    "JD.com — платформа с акцентом на электронику и бытовую технику",
    "Pinduoduo — площадка с групповыми покупками и низкими ценами"
  ];

  const benefits = [
    "Доступ к миллионам товаров китайских производителей",
    "Выкуп товаров без знания китайского языка",
    "Проверка товара перед отправкой",
    "Консолидация заказов с разных площадок",
    "Защита от недобросовестных продавцов"
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
              <h1 className="text-3xl md:text-4xl font-bold">{t('marketplacePurchase')}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-cargo-gray-700 mb-6">
                Услуга выкупа товаров с китайских маркетплейсов позволяет вам получить доступ к миллионам товаров 
                напрямую от производителей, даже если вы не владеете китайским языком и не имеете возможности оплаты 
                через китайские платежные системы.
              </p>

              <h2 className="text-2xl font-bold mb-4">Основные китайские маркетплейсы</h2>
              <ul className="space-y-3 mb-8">
                {marketplaces.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Преимущества услуги</h2>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cargo-red mr-2 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Как работает услуга выкупа</h2>
              <div className="bg-cargo-gray-100 p-6 rounded-lg mb-8">
                <ol className="list-decimal list-inside space-y-4">
                  <li className="pl-2">
                    <span className="font-bold">Вы отправляете нам ссылки</span> на товары, которые хотите приобрести, с указанием необходимых характеристик (размер, цвет, количество и т.д.)
                  </li>
                  <li className="pl-2">
                    <span className="font-bold">Мы проверяем товары</span> и предоставляем вам расчет полной стоимости, включая стоимость товара, комиссию за выкуп и доставку до нашего склада
                  </li>
                  <li className="pl-2">
                    <span className="font-bold">После согласования и оплаты</span> мы выкупаем товары и организуем их доставку на наш склад в Китае
                  </li>
                  <li className="pl-2">
                    <span className="font-bold">Товары проходят проверку</span> на соответствие заявленным характеристикам и отсутствие видимых дефектов
                  </li>
                  <li className="pl-2">
                    <span className="font-bold">Полученные товары</span> консолидируются в одну отправку и отправляются в Россию выбранным способом доставки
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <div className="bg-cargo-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-4">Стоимость услуги</h3>
                <p className="text-cargo-gray-700 mb-2">Комиссия за выкуп:</p>
                <p className="text-2xl font-bold text-cargo-red mb-4">от 5%</p>
                <p className="text-sm text-cargo-gray-600 mb-6">
                  Минимальная комиссия - 15$ за заказ. 
                  В стоимость включается выкуп товара, проверка и доставка до нашего склада в Китае.
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
                  Свяжитесь с нашими специалистами для получения под��обной консультации по выкупу товаров с китайских маркетплейсов.
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

          <OtherServicesSection excludeService="/services/marketplace-purchase" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketplacePurchase;
