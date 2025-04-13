
import React, { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator as CalculatorIcon } from "lucide-react";

const Calculator: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [origin, setOrigin] = useState('China');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState<number | null>(null);
  
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple calculation example (this would typically be more complex)
    if (!weight || !volume) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const weightNum = parseFloat(weight);
    const volumeNum = parseFloat(volume);
    
    if (isNaN(weightNum) || isNaN(volumeNum)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректные числовые значения",
        variant: "destructive",
      });
      return;
    }
    
    // Very simplified calculation logic
    const volumetricWeight = volumeNum * 167;
    const chargeableWeight = Math.max(weightNum, volumetricWeight);
    const baseRate = 10; // USD per kg
    const calculatedPrice = Math.round(chargeableWeight * baseRate);
    
    setResult(calculatedPrice);
    
    toast({
      title: "Расчет выполнен",
      description: `Предварительная стоимость доставки: $${calculatedPrice}`,
    });
  };
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cargo-gray-100 transform skew-x-12 -translate-x-20 z-0"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-cargo-red/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('calculatorTitle')}</h2>
          <p className="text-cargo-gray-500 max-w-2xl mx-auto">{t('calculatorSubtitle')}</p>
          <div className="w-20 h-1 bg-cargo-red mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-cargo-red p-8">
              <div className="h-full flex flex-col justify-center">
                <CalculatorIcon className="text-white h-16 w-16 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold text-white mb-4">{t('calculatorTitle')}</h3>
                <p className="text-white/80">
                  Получите предварительный расчет стоимости доставки вашего груза из Китая. 
                  Для более точного расчета свяжитесь с нашими менеджерами.
                </p>
                <div className="mt-6 text-xs text-white/70">{t('calculatorDisclaimer')}</div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="origin">{t('origin')}</Label>
                    <Select value={origin} onValueChange={setOrigin} disabled>
                      <SelectTrigger>
                        <SelectValue placeholder={t('origin')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="China">China</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="destination">{t('destination')}</Label>
                    <Select value={destination} onValueChange={setDestination} required>
                      <SelectTrigger>
                        <SelectValue placeholder={t('destination')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Russia">Russia</SelectItem>
                        <SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
                        <SelectItem value="Belarus">Belarus</SelectItem>
                        <SelectItem value="Kyrgyzstan">Kyrgyzstan</SelectItem>
                        <SelectItem value="Armenia">Armenia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">{t('weight')}</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0.1"
                      step="0.1"
                      placeholder="10.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="volume">{t('volume')}</Label>
                    <Input
                      id="volume"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="1.5"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">{t('category')}</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('category')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="toys">Toys</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cargo-red hover:bg-cargo-red/90"
                >
                  {t('calculate')}
                </Button>
                
                {result !== null && (
                  <div className="mt-4 p-4 bg-cargo-gray-100 rounded-md">
                    <div className="text-lg font-semibold">Предварительная стоимость:</div>
                    <div className="text-2xl font-bold text-cargo-red">${result}</div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
