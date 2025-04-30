
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "./NavLink";

interface MobileMenuProps {
  navLinks: Array<{ name: string; href: string; }>;
  textColorClass: string;
}

export const MobileMenu = ({ navLinks, textColorClass }: MobileMenuProps) => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={`hover:text-cargo-red ${textColorClass}`}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  className="py-2 text-lg font-medium text-cargo-gray-700 hover:text-cargo-red transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
              
              {user ? (
                <Button 
                  variant="outline" 
                  className="mt-4 border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white transition-colors"
                  onClick={signOut}
                >
                  Выйти
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white transition-colors w-full"
                    onClick={() => window.location.href = '/auth'}
                  >
                    Вход
                  </Button>
                  <Button 
                    variant="default" 
                    className="mt-2 bg-cargo-red hover:bg-cargo-red/90 transition-colors w-full"
                    onClick={() => window.location.href = '/contacts'}
                  >
                    {t('contactUs')}
                  </Button>
                </>
              )}
            </nav>
          </div>
          <div className="p-6 border-t border-gray-200">
            <p className="text-sm text-cargo-gray-500 text-center">
              © 2025 CARGO A71
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
