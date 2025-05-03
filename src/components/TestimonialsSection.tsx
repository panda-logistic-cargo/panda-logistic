
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Star, Quote } from "lucide-react";
import { 
  Carousel,
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, position, company, content, rating, image 
}) => {
  return (
    <div className="h-full flex flex-col bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
          />
        ))}
      </div>
      
      <div className="relative mb-6">
        <Quote className="absolute top-0 left-0 h-8 w-8 text-cargo-red/20 -translate-x-2 -translate-y-2" />
        <p className="text-cargo-gray-600 relative z-10">{content}</p>
      </div>
      
      <div className="mt-auto flex items-center">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-cargo-gray-200 flex items-center justify-center mr-4">
            <span className="text-cargo-gray-600 font-semibold">{name.charAt(0)}</span>
          </div>
        )}
        
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-cargo-gray-500">{position}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: t('testimonial1Name'),
      position: t('testimonial1Position'),
      company: t('testimonial1Company'),
      content: t('testimonial1Content'),
      rating: 5
    },
    {
      name: t('testimonial2Name'),
      position: t('testimonial2Position'),
      company: t('testimonial2Company'),
      content: t('testimonial2Content'),
      rating: 5
    },
    {
      name: t('testimonial3Name'),
      position: t('testimonial3Position'),
      company: t('testimonial3Company'),
      content: t('testimonial3Content'),
      rating: 4
    },
    {
      name: t('testimonial4Name'),
      position: t('testimonial4Position'),
      company: t('testimonial4Company'),
      content: t('testimonial4Content'),
      rating: 5
    },
    {
      name: t('testimonial5Name'),
      position: t('testimonial5Position'),
      company: t('testimonial5Company'),
      content: t('testimonial5Content'),
      rating: 5
    },
    {
      name: t('testimonial6Name'),
      position: t('testimonial6Position'),
      company: t('testimonial6Company'),
      content: t('testimonial6Content'),
      rating: 5
    },
    {
      name: t('testimonial7Name'),
      position: t('testimonial7Position'),
      company: t('testimonial7Company'),
      content: t('testimonial7Content'),
      rating: 4
    },
    {
      name: t('testimonial8Name'),
      position: t('testimonial8Position'),
      company: t('testimonial8Company'),
      content: t('testimonial8Content'),
      rating: 5
    },
    {
      name: t('testimonial9Name'),
      position: t('testimonial9Position'),
      company: t('testimonial9Company'),
      content: t('testimonial9Content'),
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-cargo-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonialsTitle')}</h2>
          <div className="w-20 h-1 bg-cargo-red mx-auto"></div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4 py-2">
                  <TestimonialCard {...testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative inset-auto" />
              <CarouselNext className="relative inset-auto" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
