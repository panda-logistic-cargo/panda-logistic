
import React, { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };
  
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
                    <Input
                      id="phone"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
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
