
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";
import { LanguageSelector } from "./navbar/LanguageSelector";
import { MobileMenu } from "./navbar/MobileMenu";
import { NavLink } from "./navbar/NavLink";

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
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-cargo-red">
              CARGO <span className={isScrolled ? "text-cargo-black" : isHomePage ? "text-white" : "text-cargo-gray-800"}>A71</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${textColorClass} hover:text-cargo-red`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <LanguageSelector className={textColorClass} />
            <Button 
              variant="default" 
              className="ml-4 bg-cargo-red hover:bg-cargo-red/90 transition-colors"
            >
              {t('contactUs')}
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <LanguageSelector className={`mr-2 ${textColorClass}`} />
            <MobileMenu navLinks={navLinks} textColorClass={textColorClass} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
