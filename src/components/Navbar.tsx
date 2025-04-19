
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";
import { Logo } from "./navbar/Logo";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileNav } from "./navbar/MobileNav";

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('calculator'), href: '/calculator' },
    { name: t('blog'), href: '/blog' },
    { name: t('contacts'), href: '/contacts' }
  ];

  const getTextColorClass = () => {
    if (isScrolled) return 'text-cargo-gray-700';
    if (isHomePage) return 'text-white';
    return 'text-cargo-gray-800';
  };

  const textColorClass = getTextColorClass();

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo isScrolled={isScrolled} isHomePage={isHomePage} />
          <DesktopNav 
            navLinks={navLinks} 
            textColorClass={textColorClass} 
            contactButtonText={t('contactUs')} 
          />
          <MobileNav navLinks={navLinks} textColorClass={textColorClass} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
