import React, { createContext, useContext, useState, ReactNode } from 'react';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

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
  zh: {
    // Navbar
    home: '首页',
    about: '关于我们',
    services: '服务',
    calculator: '计算器',
    blog: '博客',
    contacts: '联系我们',
    
    // Hero
    heroTitle: '来自中国的国际物流',
    heroSubtitle: '可靠的货物运输到俄罗斯和独联体国家',
    getQuote: '计算成本',
    contactUs: '联系我们',
    
    // About
    aboutTitle: '关于 Cargo A71',
    aboutText: 'Cargo A71是一家国际物流公司，在从中国向俄罗斯和独联体国家运送货物方面拥有多年经验。我们的专业团队提供全方位的物流服务。',
    yearsExperience: '年经验',
    countriesServed: '服务国家',
    successfulDeliveries: '成功交付',
    
    // Services
    servicesTitle: '我们的服务',
    supplierSearch: '供应商搜索',
    marketplacePurchase: '市场采购',
    supplierPayment: '供应商付款',
    cargoConsolidation: '货物集运',
    inspection: '检验和包装',
    delivery: '配送',
    businessTours: '中国商务考察',
    viewAllServices: '查看所有服务',
    
    // Advantages
    advantagesTitle: '为什么选择我们',
    advantage1Title: '全面服务',
    advantage1Text: '从供应商搜索到上门配送',
    advantage2Title: '透明定价',
    advantage2Text: '固定费率，无隐藏费用',
    advantage3Title: '个人经理',
    advantage3Text: '全程订单支持',
    advantage4Title: '货物保险',
    advantage4Text: '全程货物受保护',
    
    // Calculator
    calculatorTitle: '计算运输成本',
    calculatorSubtitle: '填写表格快速计算',
    calculatorDisclaimer: '这是初步计算。要获得准确报价，请联系我们的经理。',
    origin: '始发地',
    destination: '目的地',
    weight: '重量（公斤）',
    volume: '体积（立方米）',
    category: '产品类别',
    calculate: '计算',
    
    // Testimonials
    testimonialsTitle: '客户评价',
    
    // Contact
    contactTitle: '联系我们',
    contactSubtitle: '提交您的询问，我们会尽快回复',
    yourName: '您的姓名',
    yourEmail: '您的邮箱',
    yourPhone: '您的电话',
    message: '留言',
    send: '发送',
    offices: '我们的办事处',
    
    // Footer
    allRightsReserved: '版权所有',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
  }
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('ru');

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

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
