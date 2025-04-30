
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const TermsOfUse = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 bg-cargo-gray-100">
        <div className="container mx-auto px-4 mt-10">
          <Link to="/">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Button>
          </Link>
          
          <article className="prose prose-lg max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Условия использования сайта</h1>
            
            <p className="text-cargo-gray-700 mb-6">
              Настоящие Условия использования (далее – Условия) регулируют порядок использования сайта www.panda-logistic.ru, принадлежащего (далее – Компания). Использование сайта означает безоговорочное согласие пользователя с настоящими Условиями.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Общие положения</h2>
            <div className="pl-4">
              <p className="mb-4">1.1. Сайт www.panda-logistic.ru предназначен для предоставления информации о деятельности, включая услуги по поиску поставщиков, выкупу с маркетплейсов, консолидации грузов а также для обработки запросов пользователей.</p>
              <p className="mb-4">1.2. Настоящие Условия распространяются на всех посетителей и пользователей сайта.</p>
              <p>1.3. Использование сайта подразумевает согласие пользователя с <Link to="/privacy-policy" className="text-cargo-red hover:underline">Политикой конфиденциальности</Link>, которая является неотъемлемой частью настоящих Условий.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Права и обязанности пользователя</h2>
            <div className="pl-4">
              <h3 className="text-xl font-semibold mb-3">2.1. Пользователь обязуется:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Предоставлять достоверную информацию при заполнении форм.</li>
                <li>Не использовать сайт в противоправных целях.</li>
                <li>Не нарушать права других пользователей или третьих лиц.</li>
              </ul>
            </div>

            {/* Продолжение разделов 3-7... */}

            <div className="mt-12 p-4 bg-cargo-gray-100 rounded-lg">
              <p className="text-sm text-cargo-gray-600 font-bold">
                Дата последнего обновления: 01.05.2025
              </p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
