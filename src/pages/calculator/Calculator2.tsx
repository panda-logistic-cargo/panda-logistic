
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package2, CircleDollarSign } from "lucide-react";

const Calculator2 = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = React.useState({
    weight: "",
    volume: "",
    category: "",
    insurance: false,
    destination: ""
  });
  
  const [result, setResult] = React.useState<{
    cost: number;
    insurance: number;
    total: number;
  } | null>(null);

  const destinations = [
    { value: "russia", label: "Россия", rate: 12 },
    { value: "kazakhstan", label: "Казахстан", rate: 10 },
    { value: "belarus", label: "Беларусь", rate: 11 },
  ];

  const categories = [
    { value: "electronics", label: "Электроника", multiplier: 1.2 },
    { value: "clothing", label: "Одежда", multiplier: 1 },
    { value: "furniture", label: "Мебель", multiplier: 1.5 },
  ];

  const handleCalculate = () => {
    const { weight, volume, category, destination } = formData;
    
    if (!weight || !volume || !category || !destination) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    const selectedDestination = destinations.find(d => d.value === destination);
    const selectedCategory = categories.find(c => c.value === category);
    
    if (!selectedDestination || !selectedCategory) return;

    const volumetricWeight = parseFloat(volume) * 167;
    const actualWeight = parseFloat(weight);
    const chargeableWeight = Math.max(volumetricWeight, actualWeight);
    
    const baseCost = chargeableWeight * selectedDestination.rate;
    const categoryMultiplier = selectedCategory.multiplier;
    const subtotal = baseCost * categoryMultiplier;
    
    const insuranceCost = formData.insurance ? subtotal * 0.01 : 0;
    const total = subtotal + insuranceCost;

    setResult({
      cost: Math.round(subtotal),
      insurance: Math.round(insuranceCost),
      total: Math.round(total)
    });

    toast({
      title: "Расчет выполнен",
      description: `Итоговая стоимость: $${Math.round(total)}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cargo-gray-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <CircleDollarSign className="h-12 w-12 mx-auto text-cargo-red mb-4" />
            <h1 className="text-3xl font-bold mb-4">Расширенный калькулятор</h1>
            <p className="text-cargo-gray-600">
              Детальный расчет стоимости доставки с учетом категории товара
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="10.5"
                  />
                </div>
                <div>
                  <Label htmlFor="volume">Объем (м³)</Label>
                  <Input
                    id="volume"
                    type="number"
                    value={formData.volume}
                    onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                    placeholder="1.5"
                  />
                </div>
                <div>
                  <Label>Категория товара</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Страна назначения</Label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((destination) => (
                        <SelectItem key={destination.value} value={destination.value}>
                          {destination.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={formData.insurance}
                  onChange={(e) => setFormData(prev => ({ ...prev, insurance: e.target.checked }))}
                  className="w-4 h-4 text-cargo-red"
                />
                <Label htmlFor="insurance" className="cursor-pointer">
                  Добавить страховку груза (1% от стоимости)
                </Label>
              </div>

              <Button 
                onClick={handleCalculate}
                className="w-full mt-6 bg-cargo-red hover:bg-cargo-red/90"
              >
                Рассчитать стоимость
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-gradient-to-r from-cargo-red/5 to-cargo-red/10 border-none">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Базовая стоимость:</span>
                    <span className="font-semibold">${result.cost}</span>
                  </div>
                  {result.insurance > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Страховка:</span>
                      <span className="font-semibold">${result.insurance}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-bold">Итого:</span>
                    <span className="text-xl font-bold text-cargo-red">
                      ${result.total}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calculator2;
