
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <div className="space-y-2">
      <Label>Способ доставки</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Выберите способ доставки" />
        </SelectTrigger>
        <SelectContent>
          {deliveryMethods.map((method) => {
            const Icon = method.icon;
            return (
              <SelectItem key={method.id} value={method.id}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cargo-red" />
                  <span>{method.title}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
