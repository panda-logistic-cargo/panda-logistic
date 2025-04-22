
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Ship, TrainFront, Truck, Plane } from "lucide-react";

interface DeliveryMethodProps {
  value: string;
  onValueChange: (value: string) => void;
}

const deliveryMethods = [
  {
    id: 'economy',
    icon: Ship,
    title: 'Эконом',
    description: 'Морская доставка. Самый экономичный вариант для несрочных грузов.',
  },
  {
    id: 'standard',
    icon: TrainFront,
    title: 'Стандарт',
    description: 'Железнодорожная доставка. Оптимальный баланс скорости и стоимости.',
  },
  {
    id: 'express',
    icon: Truck,
    title: 'Экспресс',
    description: 'Автомобильная доставка. Быстрая доставка для срочных грузов.',
  },
  {
    id: 'urgent',
    icon: Plane,
    title: 'Срочная',
    description: 'Авиа доставка. Максимально быстрая доставка для критически важных грузов.',
  },
];

export const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ value, onValueChange }) => {
  return (
    <div className="space-y-4">
      <Label>Способ доставки</Label>
      <RadioGroup value={value} onValueChange={onValueChange} className="space-y-2">
        {deliveryMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div key={method.id} className="relative">
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={method.id}
                className="flex items-center gap-4 rounded-lg border p-3 hover:bg-gray-50 peer-data-[state=checked]:border-cargo-red peer-data-[state=checked]:bg-cargo-red/5"
              >
                <Icon className="h-5 w-5 text-cargo-red shrink-0" />
                <div>
                  <p className="font-medium leading-none">{method.title}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
