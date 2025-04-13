
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  mobilePadding?: string;
  desktopPadding?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  mobilePadding = "px-4 py-6",
  desktopPadding = "px-6 py-8 md:py-12",
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "container mx-auto", 
      isMobile ? mobilePadding : desktopPadding,
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
