
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  
  return (
    <div>
      <Label className="block mb-2">{t('category')}</Label>
      <RadioGroup 
        value={value} 
        onValueChange={onValueChange}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
      >
        <Label
          htmlFor="electronics-category"
          className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors hover:bg-cargo-gray-50 ${
            value === 'electronics' ? 'border-cargo-red bg-cargo-red/5' : 'border-cargo-gray-200'
          }`}
        >
          <RadioGroupItem value="electronics" id="electronics-category" className="sr-only" />
          <Smartphone className="h-5 w-5 text-cargo-red" />
          <span>{t('electronicsCategory')}</span>
        </Label>
        
        <Label
          htmlFor="clothing-category"
          className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors hover:bg-cargo-gray-50 ${
            value === 'clothing' ? 'border-cargo-red bg-cargo-red/5' : 'border-cargo-gray-200'
          }`}
        >
          <RadioGroupItem value="clothing" id="clothing-category" className="sr-only" />
          <ShoppingBag className="h-5 w-5 text-cargo-red" />
          <span>{t('clothingCategory')}</span>
        </Label>
        
        <Label
          htmlFor="furniture-category"
          className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors hover:bg-cargo-gray-50 ${
            value === 'furniture' ? 'border-cargo-red bg-cargo-red/5' : 'border-cargo-gray-200'
          }`}
        >
          <RadioGroupItem value="furniture" id="furniture-category" className="sr-only" />
          <Sofa className="h-5 w-5 text-cargo-red" />
          <span>{t('furnitureCategory')}</span>
        </Label>
        
        <Label
          htmlFor="toys-category"
          className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors hover:bg-cargo-gray-50 ${
            value === 'toys' ? 'border-cargo-red bg-cargo-red/5' : 'border-cargo-gray-200'
          }`}
        >
          <RadioGroupItem value="toys" id="toys-category" className="sr-only" />
          <Puzzle className="h-5 w-5 text-cargo-red" />
          <span>{t('toysCategory')}</span>
        </Label>
        
        <Label
          htmlFor="other-category"
          className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors hover:bg-cargo-gray-50 ${
            value === 'other' ? 'border-cargo-red bg-cargo-red/5' : 'border-cargo-gray-200'
          }`}
        >
          <RadioGroupItem value="other" id="other-category" className="sr-only" />
          <Package className="h-5 w-5 text-cargo-red" />
          <span>{t('otherCategory')}</span>
        </Label>
      </RadioGroup>
    </div>
  );
};
