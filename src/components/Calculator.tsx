
import React, { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalculatorIcon, Smartphone, ShoppingBag, Sofa, Puzzle, Package, MapPin } from "lucide-react";
import { DeliveryMethod } from './calculator/DeliveryMethod';
import { PackagingType } from './calculator/PackagingType';
import { ProductCategory } from './calculator/ProductCategory';

const Calculator: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [origin, setOrigin] = useState('guangzhou');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [category, setCategory] = useState('electronics');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [packagingType, setPackagingType] = useState('standard');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || !volume || !deliveryMethod || !packagingType) {
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
    
    const volumetricWeight = volumeNum * 167;
    const chargeableWeight = Math.max(weightNum, volumetricWeight);
    const baseRate = 10;
    const calculatedPrice = Math.round(chargeableWeight * baseRate);
    
    setResult(calculatedPrice);
    
    toast({
      title: "Расчет выполнен",
      description: `Предварительная стоимость доставки: $${calculatedPrice}`,
    });
  };
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cargo-gray-100 transform skew-x-12 -translate-x-20 z-0"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-cargo-red/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('calculatorTitle')}</h2>
          <p className="text-cargo-gray-500 max-w-2xl mx-auto">{t('calculatorFormSubtitle')}</p>
          <div className="w-20 h-1 bg-cargo-red mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-cargo-red p-8">
              <div className="h-full flex flex-col justify-center">
                <CalculatorIcon className="text-white h-16 w-16 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold text-white mb-4">{t('calculatorTitle')}</h3>
                <p className="text-white/80">
                  {t('calculatorDescription')}
                </p>
                <div className="mt-6 text-xs text-white/70">{t('calculatorDisclaimer')}</div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="origin">{t('origin')}</Label>
                    <Select value={origin} onValueChange={setOrigin}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('origin')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guangzhou">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Гуанчжоу</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="shenzhen">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Шеньчжень</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="yiwu">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Иу</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="shanghai">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Шанхай</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="beijing">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Пекин</span>
                          </div>
                        </SelectItem>
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
                        <SelectItem value="Russia">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Russia</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Kazakhstan">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Kazakhstan</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Belarus">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Belarus</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Kyrgyzstan">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Kyrgyzstan</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Armenia">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cargo-red" />
                            <span>Armenia</span>
                          </div>
                        </SelectItem>
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
                
                <ProductCategory 
                  value={category}
                  onValueChange={setCategory}
                />
                
                <DeliveryMethod 
                  value={deliveryMethod}
                  onValueChange={setDeliveryMethod}
                />
                
                <PackagingType
                  value={packagingType}
                  onValueChange={setPackagingType}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-cargo-red hover:bg-cargo-red/90"
                >
                  {t('calculate')}
                </Button>
                
                {result !== null && (
                  <div className="mt-4 p-4 bg-cargo-gray-100 rounded-md animate-fade-in">
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
