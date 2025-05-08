
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, ShoppingBag, Sofa, Puzzle, Package } from "lucide-react";

interface ProductCategoryProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const ProductCategory: React.FC<ProductCategoryProps> = ({
  value,
  onValueChange
}) => {
  const { t } = useLanguage();
  
  const categories = [
    {
      id: 'electronics',
      icon: Smartphone,
      title: t('electronicsCategory')
    },
    {
      id: 'clothing',
      icon: ShoppingBag,
      title: t('clothingCategory')
    },
    {
      id: 'furniture',
      icon: Sofa,
      title: t('furnitureCategory')
    },
    {
      id: 'toys',
      icon: Puzzle,
      title: t('toysCategory')
    },
    {
      id: 'other',
      icon: Package,
      title: t('otherCategory')
    }
  ];
  
  return (
    <div className="space-y-2">
      <Label className="block">{t('category')}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={t('category')} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cargo-red" />
                  <span>{category.title}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
