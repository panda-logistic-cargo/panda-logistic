
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, CircleAlert } from "lucide-react";

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
  const selectedType = packagingTypes.find(type => type.id === value);

  return (
    <div className="space-y-2">
      <Label>Тип упаковки</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Выберите тип упаковки">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-cargo-red" />
              <span>{selectedType?.title || "Выберите тип упаковки"}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {packagingTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-cargo-red" />
                <span>{type.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedType && (
        <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
          <CircleAlert className="h-4 w-4 text-cargo-red mt-0.5" />
          <span>{selectedType.description}</span>
        </div>
      )}
    </div>
  );
};

