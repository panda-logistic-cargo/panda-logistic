
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/PhoneInput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Loader2, 
  Search, 
  ShoppingCart, 
  Package, 
  Truck, 
  Plane, 
  FileText, 
  HelpCircle 
} from "lucide-react";

type ServiceOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if captcha is correct
    const userAnswer = parseInt(captchaAnswer);
    
    if (isNaN(userAnswer) || userAnswer !== captcha.correctAnswer) {
      toast({
        title: "Ошибка проверки",
        description: "Неправильный ответ на математическую задачу. Пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
      generateCaptcha(); // Generate a new captcha
      setCaptchaAnswer("");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Сообщение отправлено",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setServiceType('');
      setMessage('');
      setCaptchaAnswer('');
      setIsSubmitting(false);
      
      // Generate new captcha
      generateCaptcha();
    }, 1500);
  };
  
  // Format operator for display
  const formatOperator = (op: string) => {
    switch (op) {
      case "*": return "×";
      default: return op;
    }
  };
  
  const serviceOptions: ServiceOption[] = [
    { value: "supplier-search", label: "Поиск поставщиков", icon: <Search className="h-4 w-4" /> },
    { value: "marketplace-purchase", label: "Выкуп с маркетплейсов", icon: <ShoppingCart className="h-4 w-4" /> },
    { value: "cargo-consolidation", label: "Консолидация груза", icon: <Package className="h-4 w-4" /> },
    { value: "delivery", label: "Доставка", icon: <Truck className="h-4 w-4" /> },
    { value: "business-tours", label: "Бизнес-туры в Китай", icon: <Plane className="h-4 w-4" /> },
    { value: "customs-clearance", label: "Таможенное оформление", icon: <FileText className="h-4 w-4" /> },
    { value: "other", label: "Другое", icon: <HelpCircle className="h-4 w-4" /> }
  ];
  
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Телефон",
      value: "+7 (495) 123-45-67",
      link: "tel:+74951234567"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "info@cargoa71.com",
      link: "mailto:info@cargoa71.com"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: t('offices'),
      value: "Москва, Санкт-Петербург, Гуанчжоу",
      link: "#"
    }
  ];
  
  const socialLinks = [
    { name: "WhatsApp", link: "#" },
    { name: "Telegram", link: "#" },
    { name: "WeChat", link: "#" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contactTitle')}</h2>
          <p className="text-cargo-gray-500 max-w-2xl mx-auto">{t('contactSubtitle')}</p>
          <div className="w-20 h-1 bg-cargo-red mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-cargo-gray-100 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cargo-red/10 text-cargo-red mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-cargo-gray-500">{item.label}</div>
                      <a href={item.link} className="text-cargo-gray-800 font-medium hover:text-cargo-red transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="text-lg font-semibold mt-8 mb-4">Мессенджеры</h4>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="px-4 py-2 border border-cargo-gray-300 rounded-full text-sm hover:bg-cargo-red hover:text-white hover:border-cargo-red transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
              
              <div className="mt-8">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5887659093777!2d37.62044081582621!3d55.75318999841034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sRed%20Square%2C%20Moscow%2C%20Russia!5e0!3m2!1sen!2s!4v1650804719214!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">{t('yourName')}</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('yourEmail')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('yourPhone')}</Label>
                    <PhoneInput
                      id="phone"
                      value={phone}
                      onChange={setPhone}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="serviceType">Какой тип услуги наиболее соответствует вашим потребностям?</Label>
                  <Select 
                    value={serviceType} 
                    onValueChange={setServiceType}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите тип услуги" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map(option => (
                        <SelectItem key={option.value} value={option.value} className="flex items-center">
                          <div className="flex items-center gap-2">
                            {option.icon}
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">{t('message')}</Label>
                  <Textarea
                    id="message"
                    placeholder="Ваше сообщение..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                {/* Math CAPTCHA */}
                <div className="border border-cargo-gray-200 rounded-lg p-4 bg-gray-50">
                  <Label htmlFor="captcha" className="mb-2">Подтверждение</Label>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-cargo-gray-600">
                      Решите пример: <span className="font-medium">{captcha.num1} {formatOperator(captcha.operator)} {captcha.num2} = ?</span>
                    </p>
                    <div className="flex items-center">
                      <Input
                        id="captchaAnswer"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        placeholder="Введите ответ"
                        className="max-w-[120px]"
                        type="number"
                        required
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="ml-2 text-xs"
                        onClick={() => {
                          generateCaptcha();
                          setCaptchaAnswer("");
                        }}
                      >
                        Обновить
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cargo-red hover:bg-cargo-red/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t('send')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
