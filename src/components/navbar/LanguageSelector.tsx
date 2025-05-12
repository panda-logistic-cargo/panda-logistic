
import { Languages, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/translations";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

// Определяем языки и их флаги в формате unicode emoji
const languages: LanguageOption[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  { code: 'kg', name: 'Кыргызча', flag: '🇰🇬' }
];

export const LanguageSelector = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={className}
        >
          <Languages className="h-4 w-4 mr-1" />
          <span className="flex items-center gap-1">
            <span className="inline-block mr-1">{currentLanguage?.flag}</span>
            <span className="uppercase text-xs">{currentLanguage?.code}</span>
          </span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center gap-2 px-3 py-2"
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="ml-1">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
