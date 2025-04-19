
import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; }>;
  textColorClass: string;
  contactButtonText: string;
}

export const DesktopNav = ({ navLinks, textColorClass, contactButtonText }: DesktopNavProps) => {
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
        <Button 
          variant="default" 
          className="ml-4 bg-cargo-red hover:bg-cargo-red/90 transition-colors"
        >
          {contactButtonText}
        </Button>
      </div>
    </>
  );
};
