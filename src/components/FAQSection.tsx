
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer')
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer')
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer')
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer')
    },
    {
      question: t('faq5Question'),
      answer: t('faq5Answer')
    },
    {
      question: t('faq6Question'),
      answer: t('faq6Answer')
    },
    {
      question: t('faq7Question'),
      answer: t('faq7Answer')
    }
  ];
  
  return (
    <section className="mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('faqTitle')}</h2>
          <div className="w-20 h-1 bg-cargo-red mx-auto"></div>
          <p className="mt-4 text-lg text-cargo-gray-600">Ответы на часто задаваемые вопросы о доставке грузов из Китая</p>
        </div>
        
        <div className="relative z-10 bg-white rounded-xl shadow-lg overflow-hidden p-6 border-t-4 border-cargo-red">
          <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-cargo-gray-200 rounded-md overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <AccordionTrigger 
                  className="text-left font-semibold px-6 py-4 bg-cargo-gray-50 hover:bg-cargo-red/5 hover:text-cargo-red transition-colors flex items-center"
                >
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cargo-red/10 text-cargo-red mr-4 text-lg font-bold">
                      {index + 1}
                    </span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent 
                  className="text-cargo-gray-700 bg-white px-6 py-4 border-t border-cargo-gray-100"
                >
                  <div className="pl-12 border-l-2 border-cargo-red/20">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-cargo-red/5 -z-10"></div>
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-cargo-red/5 -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
