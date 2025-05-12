
import React, { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketplaceSection from "@/components/MarketplaceSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import TestimonialsSection from "@/components/TestimonialsSection";

const About2 = () => {
  const {
    t
  } = useLanguage();
  const milestones = [{
    year: 2013,
    title: "Основание компании",
    description: "Открытие первого офиса в Москве"
  }, {
    year: 2015,
    title: "Выход на международный рынок",
    description: "Открытие представительства в Гуанчжоу"
  }, {
    year: 2018,
    title: "Расширение услуг",
    description: "Запуск услуг по поиску поставщиков"
  }, {
    year: 2020,
    title: "Цифровая трансформация",
    description: "Внедрение системы онлайн-отслеживания"
  }, {
    year: 2023,
    title: "Новые горизонты",
    description: "Расширение географии услуг"
  }];
  
  // Логотипы партнеров из загруженных изображений
  const partners = [
    {
      id: 1,
      name: 'Taobao',
      logo: '/lovable-uploads/768be0ca-55ce-4420-975c-2e2c79aa0d58.png'
    },
    {
      id: 2,
      name: '1688',
      logo: '/lovable-uploads/bee6355e-6274-4677-b6af-13b0572dd39b.png'
    },
    {
      id: 3,
      name: 'AliExpress',
      logo: '/lovable-uploads/c1d88838-e60f-41d0-8f25-145aadf5735c.png'
    },
    {
      id: 4,
      name: 'Alibaba Group',
      logo: '/lovable-uploads/77bee6e6-1ac0-44bc-8a72-1da84293d1c3.png'
    },
    {
      id: 5,
      name: 'DHgate',
      logo: '/lovable-uploads/f1995843-4af0-44b9-b341-94593f27a452.png'
    },
    {
      id: 6,
      name: 'POIZON',
      logo: '/lovable-uploads/c90a3165-a6b1-40b0-87ff-e688c49c0e00.png'
    },
    {
      id: 7,
      name: 'Pinduoduo',
      logo: '/lovable-uploads/c99ad8bf-1032-4a55-b521-f055aef8aee9.png'
    },
    {
      id: 8,
      name: 'Tmall',
      logo: '/lovable-uploads/efb6fea5-499d-4406-9d7d-7b243e6ec2ad.png'
    }
  ];
  
  // Ref для карусели
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Эффект для автоматической прокрутки карусели
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let animationId: number;
    let isPaused = false;
    
    // Функция прокрутки
    const scroll = () => {
      if (!carousel || isPaused) return;
      
      carousel.scrollLeft += 1;
      
      // Если достигли конца, вернуться в начало
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
      }
      
      animationId = requestAnimationFrame(scroll);
    };
    
    // Запуск анимации
    animationId = requestAnimationFrame(scroll);
    
    // Обработчики событий для паузы при наведении
    const handleMouseEnter = () => {
      isPaused = true;
      cancelAnimationFrame(animationId);
    };
    
    const handleMouseLeave = () => {
      isPaused = false;
      animationId = requestAnimationFrame(scroll);
    };
    
    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    
    // Очистка эффекта
    return () => {
      cancelAnimationFrame(animationId);
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutUs')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              {t('aboutSubtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-lg text-cargo-gray-700 mb-6">Panda Logistic - международная логистическая компания, специализирующаяся на организации поставок из Китая. Наша миссия - сделать международную торговлю доступной и безопасной для каждого клиента.</p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 bg-cargo-gray-100 rounded-lg">
                    <div className="text-3xl font-bold text-cargo-red">10+</div>
                    <div className="text-sm text-cargo-gray-600">лет опыта</div>
                  </div>
                  <div className="text-center p-6 bg-cargo-gray-100 rounded-lg">
                    <div className="text-3xl font-bold text-cargo-red">5000+</div>
                    <div className="text-sm text-cargo-gray-600">клиентов</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-cargo-red/10 rounded-lg transform rotate-3"></div>
                <img alt="Team" className="relative rounded-lg shadow-lg" src="/lovable-uploads/903ecf9d-7422-48eb-b6de-a76e64a037c6.jpg" />
              </div>
            </div>

            {/* Наши партнеры - карусель */}
            <div className="mb-16 relative">
              <h2 className="text-3xl font-bold mb-8 text-center">Наши партнеры</h2>
              <div className="w-20 h-1 bg-cargo-red mx-auto mb-8"></div>
              
              <div className="relative overflow-hidden">
                {/* Затемнение слева */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
                
                {/* Затемнение справа */}
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
                
                {/* Карусель партнеров */}
                <div 
                  ref={carouselRef} 
                  className="flex space-x-12 py-8 overflow-x-hidden whitespace-nowrap"
                >
                  {/* Повторяем логотипы дважды для непрерывной прокрутки */}
                  {[...partners, ...partners].map((partner, index) => (
                    <div 
                      key={`${partner.id}-${index}`}
                      className="inline-flex items-center justify-center min-w-[150px]"
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="max-h-16 w-auto filter grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" 
                        title={partner.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <MarketplaceSection />
            
            {/* Наша история - стилизованная секция */}
            <div className="relative mb-16 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cargo-red/90 to-cargo-red/70 z-0"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576189737246-8a2a792337c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20 z-0"></div>
              
              <div className="relative z-10 p-10 md:p-16">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Наша история</h2>
                  <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-white">
                      <div className="text-3xl font-bold mb-2">2019</div>
                      <p>Основание компании и первые шаги на рынке международной логистики</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-white">
                      <div className="text-3xl font-bold mb-2">2021</div>
                      <p>Открытие офиса в Китае и расширение спектра услуг</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-white">
                      <div className="text-3xl font-bold mb-2">2023</div>
                      <p>Запуск новых маршрутов доставки и технологическое обновление сервисов</p>
                    </div>
                  </div>
                  
                  <Link to="/contacts">
                    <Button className="bg-white text-cargo-red hover:bg-white/90 transition-all">
                      Начать сотрудничество <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};
export default About2;
