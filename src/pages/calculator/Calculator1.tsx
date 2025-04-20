
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plane, Ship, TrainFront, Package2 } from "lucide-react";

const Calculator1 = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [weight, setWeight] = React.useState("");
  const [volume, setVolume] = React.useState("");
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<number | null>(null);

  const deliveryMethods = [
    { id: "air", name: "Авиа", icon: Plane, time: "7-12 дней", rate: 15 },
    { id: "sea", name: "Море", icon: Ship, time: "35-45 дней", rate: 5 },
    { id: "rail", name: "ЖД", icon: TrainFront, time: "18-25 дней", rate: 8 }
  ];

  const calculateCost = () => {
    if (!weight || !volume || !selectedMethod) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }

    const method = deliveryMethods.find(m => m.id === selectedMethod);
    if (!method) return;

    const volumetricWeight = parseFloat(volume) * 167;
    const actualWeight = parseFloat(weight);
    const chargeableWeight = Math.max(volumetricWeight, actualWeight);
    const cost = Math.round(chargeableWeight * method.rate);

    setResult(cost);
    toast({
      title: "Расчет выполнен",
      description: `Предварительная стоимость: $${cost}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cargo-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Package2 className="h-12 w-12 mx-auto text-cargo-red mb-4" />
            <h1 className="text-3xl font-bold mb-4">Экспресс калькулятор</h1>
            <p className="text-cargo-gray-600">
              Быстрый расчет стоимости доставки из Китая различными способами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {deliveryMethods.map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedMethod === method.id 
                    ? 'border-cargo-red bg-cargo-red/5' 
                    : 'border-transparent'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-6 text-center">
                  <method.icon className={`h-8 w-8 mx-auto mb-4 ${
                    selectedMethod === method.id ? 'text-cargo-red' : 'text-cargo-gray-500'
                  }`} />
                  <h3 className="font-semibold mb-2">{method.name}</h3>
                  <p className="text-sm text-cargo-gray-500">{method.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="10.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="volume">Объем (м³)</Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder="1.5"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-cargo-red hover:bg-cargo-red/90"
                onClick={calculateCost}
              >
                Рассчитать стоимость
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-gradient-to-r from-cargo-red/5 to-cargo-red/10 border-none">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Предварительная стоимость:</h3>
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

export default Calculator1;
