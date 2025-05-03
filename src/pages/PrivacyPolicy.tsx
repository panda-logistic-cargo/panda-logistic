
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 bg-cargo-gray-100">
        <div className="container mx-auto px-4 mt-10">
          <Link to="/">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('home')}
            </Button>
          </Link>
          
          <article className="prose prose-lg max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('privacyPolicyTitle') || "Политика конфиденциальности"}</h1>
            
            <p className="text-cargo-gray-700 mb-6 text-base font-normal">
              {t('privacyPolicyIntro') || "Настоящая Политика конфиденциальности (далее – Политика) действует в отношении всей информации, которую (далее – Компания), может получить о пользователе во время использования им сайта pandalogist.ru."}
            </p>
            
            <p className="text-cargo-gray-700 mb-8">
              {t('privacyPolicyConsent') || "Использование сайта pandalogist.ru означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации. В случае несогласия с этими условиями пользователь должен воздержаться от использования сайта."}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('privacyPolicySection1Title') || "1. Персональная информация пользователей, которую получает и обрабатывает Компания"}</h2>
            <div className="pl-4">
              <h3 className="text-xl font-semibold mb-3">{t('privacyPolicySection1_1Title') || "1.1. В рамках настоящей Политики под «персональной информацией пользователя» понимаются:"}</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('privacyPolicySection1_1Item1') || "Имя, фамилия, email, телефон, которые пользователь предоставляет о себе самостоятельно через формы регистрации или обратной связи на сайте."}</li>
              </ul>
              <p className="mb-4">{t('privacyPolicySection1_2') || "1.2. Настоящая Политика применима только к сайту Компании pandalogist.ru. Компания не контролирует и не несет ответственность за сайты третьих лиц, на которые пользователь может перейти по ссылкам, доступным на сайте."}</p>
              <p>{t('privacyPolicySection1_3') || "1.3. Компания исходит из того, что пользователь предоставляет достоверную и достаточную персональную информацию по вопросам, предлагаемым в формах регистрации, и поддерживает эту информацию в актуальном состоянии."}</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('privacyPolicySection2Title') || "2. Цели сбора и обработки персональной информации пользователей"}</h2>
            <p className="mb-4">{t('privacyPolicySection2Text1') || "Компания собирает и хранит только те персональные данные, которые необходимы для улучшения качества сервиса и взаимодействия с пользователями."}</p>
            <p>{t('privacyPolicySection2Text2') || "Персональную информацию пользователя Компания может использовать в следующих целях:"}</p>
            <ul className="list-disc pl-6 mb-6">
              <li>{t('privacyPolicySection2Item1') || "Улучшение качества работы сайта и сервисов Компании."}</li>
              <li>{t('privacyPolicySection2Item2') || "Связь с пользователем, включая направление уведомлений, запросов и информации."}</li>
              <li>{t('privacyPolicySection2Item3') || "Обработка заявок и запросов от пользователя."}</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('privacyPolicySection3Title') || "3. Условия обработки персональной информации"}</h2>
            <div className="pl-4">
              <p className="mb-4">{t('privacyPolicySection3_1') || "3.1. Компания хранит персональную информацию пользователей до завершения взаимодействия с пользователем, если иное не предусмотрено законодательством РФ."}</p>
              <p className="mb-4">{t('privacyPolicySection3_2') || "3.2. В отношении персональной информации пользователя сохраняется её конфиденциальность."}</p>
            </div>

            <div className="mt-12 p-4 bg-cargo-gray-100 rounded-lg">
              <p className="text-sm text-cargo-gray-600 font-bold">
                {t('privacyPolicyLastUpdated') || "Дата последнего обновления"}: {new Date().toLocaleDateString()}
              </p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
