
import React, { useEffect, useState } from 'react';
import { RefreshCw, DollarSign, BadgeRussianRuble } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";

type CurrencyRate = {
  rate: number;
  lastUpdate: Date;
};

export const CurrencyRates = () => {
  const { t } = useLanguage();
  const [rates, setRates] = useState<{
    cnyToRub: CurrencyRate | null;
    usdToRub: CurrencyRate | null;
  }>({
    cnyToRub: null,
    usdToRub: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    try {
      // In a real app, you'd use a real API like this:
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      // const data = await response.json();
      
      // For demo purposes, we're using mock data
      // This simulates data as if it came from the Central Bank of Russia API
      const mockData = {
        cnyToRub: Math.random() * (12 - 10) + 10, // Random rate between 10 and 12
        usdToRub: Math.random() * (95 - 90) + 90, // Random rate between 90 and 95
      };
      
      setRates({
        cnyToRub: { rate: parseFloat(mockData.cnyToRub.toFixed(2)), lastUpdate: new Date() },
        usdToRub: { rate: parseFloat(mockData.usdToRub.toFixed(2)), lastUpdate: new Date() }
      });
      setError(null);
    } catch (err) {
      setError(t('currencyFetchError'));
      console.error("Failed to fetch currency rates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    
    // Update rates every 15 minutes (900,000 milliseconds)
    const interval = setInterval(fetchRates, 900000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6">
      <div className="text-cargo-gray-300 text-sm mb-2">
        <p className="text-white mb-1">
          {t('currencyRates')} <span className="text-xs text-cargo-gray-400">({t('cbr')})</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="text-cargo-gray-300 text-sm flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-1" /> USD → <BadgeRussianRuble className="h-3.5 w-3.5 mx-1" /> RUB
            </span>
            {loading ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <span>{rates.usdToRub?.rate || '—'}</span>
            )}
          </div>
          <div className="text-xs text-cargo-gray-400 mt-1">
            {!loading && !error && rates.usdToRub
              ? t('lastUpdate') + ': ' + rates.usdToRub.lastUpdate.toLocaleTimeString()
              : error || t('updating')}
          </div>
        </div>
        
        <div className="text-cargo-gray-300 text-sm flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center">
              <span className="mr-1">¥</span> CNY → <BadgeRussianRuble className="h-3.5 w-3.5 mx-1" /> RUB
            </span>
            {loading ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <span>{rates.cnyToRub?.rate || '—'}</span>
            )}
          </div>
          <div className="text-xs text-cargo-gray-400 mt-1">
            {!loading && !error && rates.cnyToRub
              ? t('lastUpdate') + ': ' + rates.cnyToRub.lastUpdate.toLocaleTimeString()
              : error || t('updating')}
          </div>
        </div>
      </div>
    </div>
  );
};
