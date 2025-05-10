
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "@/components/PhoneInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Search, ShoppingCart, Package, Truck, Plane, FileText, HelpCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
type ServiceOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};
const Contacts = () => {
  const {
    t
  } = useLanguage();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    serviceType: "",
    message: "",
    captchaAnswer: ""
  });

  // Math CAPTCHA state
  const [captcha, setCaptcha] = useState({
    num1: 0,
    num2: 0,
    operator: "+",
    correctAnswer: 0
  });

  // Generate math captcha
  const generateCaptcha = () => {
    const operators = ["+", "-", "*"];
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];

    // Generate appropriate numbers for the operator
    let num1, num2, result;
    switch (randomOperator) {
      case "+":
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        result = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * 10) + 5;
        num2 = Math.floor(Math.random() * 5) + 1;
        result = num1 - num2;
        break;
      case "*":
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        result = num1 * num2;
        break;
      default:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        result = num1 + num2;
    }
    setCaptcha({
      num1,
      num2,
      operator: randomOperator,
      correctAnswer: result
    });
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);
  const serviceOptions: ServiceOption[] = [{
    value: "supplier-search",
    label: "Поиск поставщиков",
    icon: <Search className="h-4 w-4" />
  }, {
    value: "marketplace-purchase",
    label: "Выкуп с маркетплейсов",
    icon: <ShoppingCart className="h-4 w-4" />
  }, {
    value: "cargo-consolidation",
    label: "Консолидация груза",
    icon: <Package className="h-4 w-4" />
  }, {
    value: "delivery",
    label: "Доставка",
    icon: <Truck className="h-4 w-4" />
  }, {
    value: "business-tours",
    label: "Бизнес-туры в Китай",
    icon: <Plane className="h-4 w-4" />
  }, {
    value: "customs-clearance",
    label: "Таможенное оформление",
    icon: <FileText className="h-4 w-4" />
  }, {
    value: "other",
    label: "Другое",
    icon: <HelpCircle className="h-4 w-4" />
  }];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if captcha is correct
    const userAnswer = parseInt(formData.captchaAnswer);
    if (isNaN(userAnswer) || userAnswer !== captcha.correctAnswer) {
      toast({
        title: "Ошибка проверки",
        description: "Неправильный ответ на математическую задачу. Пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
      generateCaptcha(); // Generate a new captcha
      setFormData(prev => ({
        ...prev,
        captchaAnswer: ""
      }));
      return;
    }
    console.log("Form submitted with service type:", formData.serviceType);
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время."
    });

    // Reset form and generate new captcha
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      serviceType: "",
      message: "",
      captchaAnswer: ""
    });
    generateCaptcha();
  };

  // Format operator for display
  const formatOperator = (op: string) => {
    switch (op) {
      case "*":
        return "×";
      default:
        return op;
    }
  };
  return <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 bg-cargo-gray-100 p-8 rounded-lg">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("contacts")}</h1>
              <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
                {t("contactsSubtitle")}
              </p>
            </div>

            {/* Стилизованные карточки преимуществ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {/* Телефон */}
              <div className="relative group overflow-hidden">
                <div className="bg-white border border-cargo-gray-100 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition-all duration-300 z-10 relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cargo-red/5 to-cargo-gray-100/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-10"></div>
                  
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cargo-red/10 text-cargo-red mb-3 group-hover:bg-cargo-red/20 transition-colors duration-300">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div className="mb-1 text-cargo-gray-600 text-sm">Телефон для связи</div>
                  <div className="font-bold text-xl mb-2">8 909 801 08 88</div>
                  <Button asChild variant="outline" className="w-full bg-white border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white transition-all group-hover:bg-cargo-red group-hover:text-white">
                    <a href="https://wa.me/89098010888" target="_blank" rel="noopener noreferrer">
                      <Phone className="mr-2 w-4 h-4" />
                      Написать в WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Почта */}
              <div className="relative group overflow-hidden">
                <div className="bg-white border border-cargo-gray-100 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition-all duration-300 z-10 relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cargo-red/5 to-cargo-gray-100/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-10"></div>
                  
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cargo-red/10 text-cargo-red mb-3 group-hover:bg-cargo-red/20 transition-colors duration-300">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div className="mb-1 text-cargo-gray-600 text-sm">Электронная почта</div>
                  <div className="font-bold text-base mb-1">
                    <a href="mailto:example@mail.ru" className="hover:text-cargo-red transition-all">example@mail.ru</a>
                  </div>
                  <div className="text-xs text-cargo-gray-500 mt-1">Среднее время ответа: <span className="font-semibold">24 часа</span></div>
                </div>
              </div>
              
              {/* Адрес */}
              <div className="relative group overflow-hidden">
                <div className="bg-white border border-cargo-gray-100 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition-all duration-300 z-10 relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cargo-red/5 to-cargo-gray-100/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-10"></div>
                  
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cargo-red/10 text-cargo-red mb-3 group-hover:bg-cargo-red/20 transition-colors duration-300">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="mb-1 text-cargo-gray-600 text-sm">Адрес офиса</div>
                  <div className="font-bold text-base mb-2 text-center">
                    г. Хабаровск <br /> ул. Ленина 28
                  </div>
                  <Button asChild variant="outline" className="w-full bg-white border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white transition-all group-hover:bg-cargo-red group-hover:text-white">
                    <a href="https://www.google.com/maps?q=ул.+Ленина+28,+Хабаровск" target="_blank" rel="noopener noreferrer">
                      Открыть на карте
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Форма и карта-с колонками */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Левая колонка: Форма обратной связи */}
              <div className="bg-cargo-gray-100 rounded-xl p-8 shadow">
                <h2 className="text-2xl font-bold mb-4">Обратная связь</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cargo-gray-700 mb-1 text-sm" htmlFor="name">Ваше имя</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Иван" required />
                    </div>
                    <div>
                      <label className="block text-cargo-gray-700 mb-1 text-sm" htmlFor="email">Электронная почта</label>
                      <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-cargo-gray-700 mb-1 text-sm" htmlFor="phone">Телефон</label>
                    <PhoneInput id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} required />
                  </div>
                  <div>
                    <label className="block text-cargo-gray-700 mb-1 text-sm" htmlFor="subject">Тема</label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Уточнить сроки доставки" />
                  </div>
                  <div>
                    <label className="block text-cargo-gray-700 mb-1 text-sm" htmlFor="serviceType">
                      Какой тип услуги наиболее соответствует вашим потребностям?
                    </label>
                    <Select value={formData.serviceType} onValueChange={handleSelectChange} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите тип услуги" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map(option => <SelectItem key={option.value} value={option.value} className="flex items-center">
                            <div className="flex items-center gap-2">
                              {option.icon}
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-cargo-gray-700 mb-1 text-sm" htmlFor="message">Сообщение</label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Опишите суть вашего вопроса или запроса" rows={4} required />
                  </div>
                  
                  {/* Math CAPTCHA */}
                  <div className="border border-cargo-gray-200 rounded-lg p-4 bg-white">
                    <label className="block text-cargo-gray-700 mb-2 text-sm font-medium">Подтверждение</label>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-cargo-gray-600">
                        Решите пример: <span className="font-medium">{captcha.num1} {formatOperator(captcha.operator)} {captcha.num2} = ?</span>
                      </p>
                      <div className="flex items-center">
                        <Input id="captchaAnswer" name="captchaAnswer" value={formData.captchaAnswer} onChange={handleChange} placeholder="Введите ответ" className="max-w-[120px]" type="number" required />
                        <Button type="button" variant="outline" size="sm" className="ml-2 text-xs" onClick={() => {
                        generateCaptcha();
                        setFormData(prev => ({
                          ...prev,
                          captchaAnswer: ""
                        }));
                      }}>
                          Обновить
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-cargo-red hover:bg-cargo-red/90 transition-all">
                    <Send className="mr-2 h-4 w-4" />
                    Отправить сообщение
                  </Button>
                  
                  <p className="text-xs text-cargo-gray-500 text-center mt-2">
                    *Нажимая на кнопку, вы будете перенаправлены в WhatsApp для отправки сообщения.
                  </p>
                </form>
              </div>
              
              {/* Правая колонка: Адрес + карта */}
              <div className="flex flex-col rounded-xl p-0 lg:p-2">
                <div className="bg-cargo-gray-100 rounded-xl p-8 mb-4 shadow">
                  <h2 className="text-2xl font-bold mb-2">Расположение офиса</h2>
                  <div className="text-cargo-gray-700 mb-2">г. Хабаровск, ул. Ленина 28</div>
                  <Button asChild variant="outline" className="mb-4 border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white w-full">
                    <a href="https://www.google.com/maps?q=ул.+Ленина+28,+Хабаровск" target="_blank" rel="noopener noreferrer">
                      Открыть в Google Картах
                    </a>
                  </Button>
                  <div className="aspect-video w-full mt-2 rounded-lg overflow-hidden border border-cargo-gray-200">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.1959652883166!2d135.0714791251825!3d48.47855064661679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5efae9a4d42c06cf%3A0xdc555ffa4f6e1c53!2z0YPQuy4g0JvQtdC90LjQvdCwLCAyOCwg0KXQsNCx0LDRgNC-0LLRgdC6LCDQpdCw0LHQsNGA0L7QstGB0LrQuNC5INC60YDQsNC5LCDQoNC-0YHRgdC40Y8sIDY4MDAwMA!5e0!3m2!1sru!2sru!4v1715169332989!5m2!1sru!2sru" width="100%" height="100%" style={{
                    border: 0
                  }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Офис на карте"></iframe>
                  </div>
                </div>
              </div>
            </div>
            {/* END форма+карта */}
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};
export default Contacts;
