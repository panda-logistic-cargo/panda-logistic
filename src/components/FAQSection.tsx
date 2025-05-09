
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
    <div className="bg-white p-6 rounded-lg shadow-sm mt-12">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-cargo-red" />
        <h3 className="text-2xl font-bold">{t('faqTitle')}</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="border border-cargo-gray-200 mb-3 rounded-lg overflow-hidden"
          >
            <AccordionTrigger 
              className="text-left font-medium px-4 py-3 bg-cargo-gray-50 hover:bg-cargo-gray-100 hover:text-cargo-red transition-colors"
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent 
              className="text-cargo-gray-700 bg-white p-4 border-t border-cargo-gray-100"
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
