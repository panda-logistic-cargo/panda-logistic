
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { CurrencyIcon } from "lucide-react";

interface Rate {
  code: string;
  value: number;
  lastUpdated: Date;
}

const CurrencyRates: React.FC = () => {
  const [rates, setRates] = useState<{ [key: string]: Rate }>({
    CNY: { code: 'CNY', value: 0, lastUpdated: new Date() },
    USD: { code: 'USD', value: 0, lastUpdated: new Date() }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const fetchRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate.host/latest?base=RUB&symbols=CNY,USD');
      const data = await response.json();
      
      if (data && data.rates) {
        // Convert from RUB to target currency rates to target currency to RUB
        setRates({
          CNY: { 
            code: 'CNY', 
            value: data.rates.CNY ? (1 / data.rates.CNY) : 0,
            lastUpdated: new Date() 
          },
          USD: { 
            code: 'USD', 
            value: data.rates.USD ? (1 / data.rates.USD) : 0,
            lastUpdated: new Date() 
          }
        });
        setError(null);
      } else {
        setError(t('currencyFetchError'));
      }
    } catch (err) {
      console.error('Error fetching currency rates:', err);
      setError(t('currencyFetchError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    
    // Update rates every 15 minutes
    const intervalId = setInterval(fetchRates, 15 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-cargo-gray-300">
        <CurrencyIcon className="h-4 w-4" />
        {t('loadingCurrencyRates')}
      </div>
    );
  }

  if (error) {
    return null; // Don't show anything if there's an error
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <CurrencyIcon className="h-4 w-4 text-cargo-red" />
        <h4 className="text-sm font-medium">{t('currencyRates')}</h4>
      </div>
      <div className="text-cargo-gray-300 text-sm space-y-1">
        <div className="flex items-center">
          <span className="font-medium">1 CNY</span>
          <span className="mx-2">=</span>
          <span>{rates.CNY.value.toFixed(2)} RUB</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">1 USD</span>
          <span className="mx-2">=</span>
          <span>{rates.USD.value.toFixed(2)} RUB</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyRates;
