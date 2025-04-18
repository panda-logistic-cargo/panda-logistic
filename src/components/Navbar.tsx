import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, ChevronDown, Languages } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('calculator'), href: '/calculator' },
    { name: t('blog'), href: '/blog' },
    { name: t('contacts'), href: '/contacts' }
  ];

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

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
              CARGO <span className={isScrolled ? "text-cargo-black" : "text-white"}>A71</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? 'text-cargo-gray-700 hover:text-cargo-red' 
                    : 'text-white hover:text-cargo-red'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-2 ${
                    isScrolled ? 'text-cargo-gray-700' : 'text-white'
                  }`}
                >
                  <Languages className="h-4 w-4" />
                  <span className="flex items-center gap-2">
                    <span>{currentLanguage?.flag}</span>
                    <span className="uppercase">{currentLanguage?.code}</span>
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="flex items-center gap-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="default" 
              className="ml-4 bg-cargo-red hover:bg-cargo-red/90 transition-colors"
            >
              {t('contactUs')}
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`mr-2 flex items-center gap-2 ${
                    isScrolled ? 'text-cargo-gray-700' : 'text-white'
                  }`}
                >
                  <Languages className="h-5 w-5" />
                  <span>{currentLanguage?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="flex items-center gap-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={`hover:text-cargo-red ${
                    isScrolled ? 'text-cargo-gray-800' : 'text-white'
                  }`}
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                <div className="flex flex-col h-full bg-white">
                  <div className="p-6">
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="py-2 text-lg font-medium text-cargo-gray-700 hover:text-cargo-red transition-colors"
                          onClick={closeMenu}
                        >
                          {link.name}
                        </a>
                      ))}
                      <Button 
                        variant="default" 
                        className="mt-4 bg-cargo-red hover:bg-cargo-red/90 transition-colors w-full"
                      >
                        {t('contactUs')}
                      </Button>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
