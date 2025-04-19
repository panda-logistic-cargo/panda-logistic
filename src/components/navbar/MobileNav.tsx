
import { LanguageSelector } from "./LanguageSelector";
import { MobileMenu } from "./MobileMenu";

interface MobileNavProps {
  navLinks: Array<{ name: string; href: string; }>;
  textColorClass: string;
}

export const MobileNav = ({ navLinks, textColorClass }: MobileNavProps) => {
  return (
    <div className="md:hidden flex items-center">
      <LanguageSelector className={`mr-2 ${textColorClass}`} />
      <MobileMenu navLinks={navLinks} textColorClass={textColorClass} />
    </div>
  );
};
