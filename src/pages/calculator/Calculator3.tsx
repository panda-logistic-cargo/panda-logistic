
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
  Truck,
  Package2,
  BoxesIcon,
  Warehouse,
  Scale,
  Ruler,
  CircleDollarSign,
  CheckCircle2
} from "lucide-react";

const Calculator3 = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    pieces: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    type: "",
  });
  const [result, setResult] = React.useState<number | null>(null);

  const cargoTypes = [
    { id: "standard", name: "Стандартный груз", rate: 10 },
    { id: "fragile", name: "Хрупкий груз", rate: 15 },
    { id: "dangerous", name: "Опасный груз", rate: 20 },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateVolume = () => {
    const { length, width, height } = formData;
    return (parseFloat(length) * parseFloat(width) * parseFloat(height)) / 1000000;
  };

  const handleCalculate = () => {
    const volume = calculateVolume();
    const pieces = parseInt(formData.pieces);
    const weight = parseFloat(formData.weight);
    const selectedType = cargoTypes.find(t => t.id === formData.type);
    
    if (!selectedType) return;

    const volumetricWeight = volume * 167 * pieces;
    const actualWeight = weight * pieces;
    const chargeableWeight = Math.max(volumetricWeight, actualWeight);
    
    const cost = Math.round(chargeableWeight * selectedType.rate);
    setResult(cost);

    toast({
      title: "Расчет выполнен",
      description: `Стоимость доставки: $${cost}`,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <BoxesIcon className="h-12 w-12 mx-auto text-cargo-red mb-4" />
              <h3 className="text-xl font-semibold mb-2">Количество мест</h3>
              <p className="text-cargo-gray-600">Укажите количество грузовых мест</p>
            </div>
            <div>
              <Label>Количество мест</Label>
              <Input
                type="number"
                value={formData.pieces}
                onChange={(e) => setFormData(prev => ({ ...prev, pieces: e.target.value }))}
                placeholder="1"
                min="1"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Scale className="h-12 w-12 mx-auto text-cargo-red mb-4" />
              <h3 className="text-xl font-semibold mb-2">Вес груза</h3>
              <p className="text-cargo-gray-600">Укажите вес одного места</p>
            </div>
            <div>
              <Label>Вес (кг)</Label>
              <Input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="10.5"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Ruler className="h-12 w-12 mx-auto text-cargo-red mb-4" />
              <h3 className="text-xl font-semibold mb-2">Размеры груза</h3>
              <p className="text-cargo-gray-600">Укажите размеры одного места в сантиметрах</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Длина (см)</Label>
                <Input
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                  placeholder="100"
                />
              </div>
              <div>
                <Label>Ширина (см)</Label>
                <Input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
                  placeholder="50"
                />
              </div>
              <div>
                <Label>Высота (см)</Label>
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="30"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Package2 className="h-12 w-12 mx-auto text-cargo-red mb-4" />
              <h3 className="text-xl font-semibold mb-2">Тип груза</h3>
              <p className="text-cargo-gray-600">Выберите тип вашего груза</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {cargoTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.type === type.id ? 'border-cargo-red bg-cargo-red/5' : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <span>{type.name}</span>
                    {formData.type === type.id && (
                      <CheckCircle2 className="h-5 w-5 text-cargo-red" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cargo-gray-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Truck className="h-12 w-12 mx-auto text-cargo-red mb-4" />
            <h1 className="text-3xl font-bold mb-4">Пошаговый калькулятор</h1>
            <p className="text-cargo-gray-600">
              Расчет стоимости доставки за 4 простых шага
            </p>
          </div>

          <div className="mb-8 flex justify-between items-center">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s > 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s <= step
                      ? 'bg-cargo-red text-white'
                      : 'bg-cargo-gray-200 text-cargo-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? 'bg-cargo-red' : 'bg-cargo-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Назад
                </Button>
                {step < 4 ? (
                  <Button onClick={handleNext}>Далее</Button>
                ) : (
                  <Button onClick={handleCalculate}>Рассчитать</Button>
                )}
              </div>
            </CardContent>
          </Card>

          {result !== null && (
            <Card className="bg-gradient-to-r from-cargo-red/5 to-cargo-red/10 border-none animate-fade-in">
              <CardContent className="p-6 text-center">
                <CircleDollarSign className="h-8 w-8 mx-auto text-cargo-red mb-2" />
                <h3 className="text-xl font-semibold mb-2">Стоимость доставки:</h3>
                <div className="text-3xl font-bold text-cargo-red">${result}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calculator3;
