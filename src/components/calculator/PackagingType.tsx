
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, CircleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PackagingTypeProps {
  value: string;
  onValueChange: (value: string) => void;
}

const packagingTypes = [
  {
    id: 'standard',
    title: 'Стандартная упаковка',
    description: 'Базовая упаковка для большинства грузов.',
  },
  {
    id: 'reinforced',
    title: 'Усиленная упаковка',
    description: 'Дополнительная защита для хрупких грузов.',
  },
  {
    id: 'pallet',
    title: 'Паллетная упаковка',
    description: 'Размещение на палетах для крупногабаритных грузов.',
  },
  {
    id: 'special',
    title: 'Специальная упаковка',
    description: 'Индивидуальное решение для сложных грузов.',
  },
];

export const PackagingType: React.FC<PackagingTypeProps> = ({ value, onValueChange }) => {
  return (
    <div className="space-y-2">
      <Label>Тип упаковки</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Выберите тип упаковки" />
        </SelectTrigger>
        <SelectContent>
          {packagingTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-cargo-red" />
                <span>{type.title}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleAlert className="h-4 w-4 text-cargo-red cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[200px]">{type.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

