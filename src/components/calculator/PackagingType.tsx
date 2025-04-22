
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";

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
    <div className="space-y-4">
      <Label>Тип упаковки</Label>
      <RadioGroup value={value} onValueChange={onValueChange} className="space-y-2">
        {packagingTypes.map((type) => (
          <div key={type.id} className="relative">
            <RadioGroupItem
              value={type.id}
              id={`packaging-${type.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`packaging-${type.id}`}
              className="flex items-center gap-4 rounded-lg border p-3 hover:bg-gray-50 peer-data-[state=checked]:border-cargo-red peer-data-[state=checked]:bg-cargo-red/5"
            >
              <Package className="h-5 w-5 text-cargo-red shrink-0" />
              <div>
                <p className="font-medium leading-none">{type.title}</p>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
