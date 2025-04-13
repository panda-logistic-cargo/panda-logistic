
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  variant = 'ghost'
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={toggleTheme}
      className={cn("relative", className)}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Sun className={cn(
        "h-4 w-4 transition-all",
        theme === 'dark' ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100'
      )} />
      <Moon className={cn(
        "h-4 w-4 transition-all",
        theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'
      )} />
    </Button>
  );
};

export default ThemeToggle;
