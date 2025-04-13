
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for our translations
type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Create our translations
const translations: Translations = {
  ru: {
    // Navbar
    home: 'Главная',
    about: 'О компании',
    services: 'Услуги',
    calculator: 'Калькулятор',
    blog: 'Блог',
    contacts: 'Контакты',
    
    // Hero
    heroTitle: 'Международная логистика из Китая',
    heroSubtitle: 'Надежная доставка грузов в Россию и страны СНГ',
    getQuote: 'Рассчитать стоимость',
    contactUs: 'Связаться с нами',
    
    // About
    aboutTitle: 'О Cargo A71',
    aboutText: 'Cargo A71 - международная логистическая компания с многолетним опытом доставки грузов из Китая в Россию и страны СНГ. Наша команда профессионалов обеспечивает полный цикл логистических услуг.',
    yearsExperience: 'Лет опыта',
    countriesServed: 'Стран обслуживания',
    successfulDeliveries: 'Успешных доставок',
    
    // Services
    servicesTitle: 'Наши услуги',
    supplierSearch: 'Поиск поставщиков',
    marketplacePurchase: 'Выкуп с маркетплейсов',
    supplierPayment: 'Оплата поставщикам',
    cargoConsolidation: 'Консолидация груза',
    inspection: 'Проверка и упаковка',
    delivery: 'Доставка',
    businessTours: 'Бизнес-туры в Китай',
    viewAllServices: 'Все услуги',
    
    // Advantages
    advantagesTitle: 'Преимущества работы с нами',
    advantage1Title: 'Комплексный сервис',
    advantage1Text: 'От поиска поставщика до доставки до двери',
    advantage2Title: 'Прозрачные цены',
    advantage2Text: 'Фиксированные тарифы без скрытых платежей',
    advantage3Title: 'Персональный менеджер',
    advantage3Text: 'Сопровождение заказа на всех этапах',
    advantage4Title: 'Страхование груза',
    advantage4Text: 'Ваш груз под защитой на всем пути',
    
    // Calculator
    calculatorTitle: 'Рассчитать стоимость доставки',
    calculatorSubtitle: 'Заполните форму для быстрого расчета',
    calculatorDisclaimer: 'Расчет является предварительным. Для точной оценки свяжитесь с менеджером.',
    origin: 'Откуда',
    destination: 'Куда',
    weight: 'Вес (кг)',
    volume: 'Объем (м³)',
    category: 'Категория товара',
    calculate: 'Рассчитать',
    
    // Testimonials
    testimonialsTitle: 'Отзывы клиентов',
    
    // Contact
    contactTitle: 'Свяжитесь с нами',
    contactSubtitle: 'Оставьте заявку, и мы свяжемся с вами в ближайшее время',
    yourName: 'Ваше имя',
    yourEmail: 'Ваш email',
    yourPhone: 'Ваш телефон',
    message: 'Сообщение',
    send: 'Отправить',
    offices: 'Наши офисы',
    
    // Footer
    allRightsReserved: 'Все права защищены',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
  },
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    services: 'Services',
    calculator: 'Calculator',
    blog: 'Blog',
    contacts: 'Contacts',
    
    // Hero
    heroTitle: 'International Logistics from China',
    heroSubtitle: 'Reliable cargo delivery to Russia and CIS countries',
    getQuote: 'Get a Quote',
    contactUs: 'Contact Us',
    
    // About
    aboutTitle: 'About Cargo A71',
    aboutText: 'Cargo A71 is an international logistics company with years of experience in delivering goods from China to Russia and CIS countries. Our team of professionals provides a full cycle of logistics services.',
    yearsExperience: 'Years Experience',
    countriesServed: 'Countries Served',
    successfulDeliveries: 'Successful Deliveries',
    
    // Services
    servicesTitle: 'Our Services',
    supplierSearch: 'Supplier Search',
    marketplacePurchase: 'Marketplace Purchase',
    supplierPayment: 'Supplier Payment',
    cargoConsolidation: 'Cargo Consolidation',
    inspection: 'Inspection & Packaging',
    delivery: 'Delivery',
    businessTours: 'China Business Tours',
    viewAllServices: 'View All Services',
    
    // Advantages
    advantagesTitle: 'Why Choose Us',
    advantage1Title: 'Comprehensive Service',
    advantage1Text: 'From supplier search to door delivery',
    advantage2Title: 'Transparent Pricing',
    advantage2Text: 'Fixed rates with no hidden fees',
    advantage3Title: 'Personal Manager',
    advantage3Text: 'Order support at all stages',
    advantage4Title: 'Cargo Insurance',
    advantage4Text: 'Your cargo is protected throughout the journey',
    
    // Calculator
    calculatorTitle: 'Calculate Delivery Cost',
    calculatorSubtitle: 'Fill out the form for a quick calculation',
    calculatorDisclaimer: 'This calculation is preliminary. For an accurate quote, contact our manager.',
    origin: 'Origin',
    destination: 'Destination',
    weight: 'Weight (kg)',
    volume: 'Volume (m³)',
    category: 'Product Category',
    calculate: 'Calculate',
    
    // Testimonials
    testimonialsTitle: 'Client Testimonials',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'Submit your inquiry and we will get back to you shortly',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourPhone: 'Your Phone',
    message: 'Message',
    send: 'Send',
    offices: 'Our Offices',
    
    // Footer
    allRightsReserved: 'All Rights Reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
};

// Define our context type
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('ru'); // Default to Russian

  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
