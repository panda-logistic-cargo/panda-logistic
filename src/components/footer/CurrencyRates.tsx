
import React, { useEffect, useState } from 'react';
import { RefreshCw, DollarSign } from 'lucide-react';
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
      // Use mock data since the CBR API is not accessible in the preview environment
      const mockData = {
        Valute: {
          USD: { Value: 90.56 },
          CNY: { Value: 12.75 },
        },
        Timestamp: new Date().toISOString()
      };
      
      // Set the mock rates
      setRates({
        cnyToRub: { rate: parseFloat(mockData.Valute.CNY.Value.toFixed(2)), lastUpdate: new Date(mockData.Timestamp) },
        usdToRub: { rate: parseFloat(mockData.Valute.USD.Value.toFixed(2)), lastUpdate: new Date(mockData.Timestamp) }
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
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="text-cargo-gray-300 text-sm flex flex-col">
        <div className="flex items-center justify-between">
          <span className="font-bold flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            USD → RUB
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
            <span className="inline-flex items-center justify-center mr-1 text-xs">¥</span>
            CNY → RUB
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
  );
};
