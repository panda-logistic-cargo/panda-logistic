
import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { useAuth } from "@/context/AuthContext";

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; }>;
  textColorClass: string;
  contactButtonText: string;
}

export const DesktopNav = ({ navLinks, textColorClass, contactButtonText }: DesktopNavProps) => {
  const { user, signOut } = useAuth();

  return (
    <>
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
        
        {user ? (
          <Button 
            variant="outline" 
            className="ml-4 border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white transition-colors"
            onClick={signOut}
          >
            Выйти
          </Button>
        ) : (
          <Button 
            variant="default" 
            className="ml-4 bg-cargo-red hover:bg-cargo-red/90 transition-colors"
            onClick={() => window.location.href = '/contacts'}
          >
            {contactButtonText}
          </Button>
        )}
      </div>
    </>
  );
};
