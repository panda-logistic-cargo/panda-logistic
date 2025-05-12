
import React, { useEffect, useState } from 'react';
import { RefreshCw, DollarSign, AlertCircle } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import { toast } from '@/hooks/use-toast';

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

  const fetchRatesFromCBR = async () => {
    try {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      });
      
      if (!response.ok) {
        throw new Error('CBR API request failed');
      }
      
      const data = await response.json();
      
      setRates({
        cnyToRub: { 
          rate: parseFloat(data.Valute.CNY.Value.toFixed(2)), 
          lastUpdate: new Date(data.Timestamp) 
        },
        usdToRub: { 
          rate: parseFloat(data.Valute.USD.Value.toFixed(2)), 
          lastUpdate: new Date(data.Timestamp) 
        }
      });
      return true;
    } catch (err) {
      console.error("Failed to fetch from CBR API:", err);
      return false;
    }
  };

  const fetchRatesFromBackup = async () => {
    try {
      // Using Open Exchange Rates API as backup
      // In a real implementation, you'd need to replace this with a working API
      // and potentially add an API key
      const response = await fetch('https://open.er-api.com/v6/latest/USD', {
        method: 'GET',
        cache: 'no-cache',
      });
      
      if (!response.ok) {
        throw new Error('Backup API request failed');
      }
      
      const data = await response.json();
      const currentDate = new Date(data.time_last_update_utc);
      
      // Calculate rates against RUB
      const usdToRub = data.rates.RUB;
      const cnyToRub = data.rates.RUB / data.rates.CNY;
      
      setRates({
        cnyToRub: { 
          rate: parseFloat(cnyToRub.toFixed(2)), 
          lastUpdate: currentDate
        },
        usdToRub: { 
          rate: parseFloat(usdToRub.toFixed(2)), 
          lastUpdate: currentDate
        }
      });
      return true;
    } catch (err) {
      console.error("Failed to fetch from backup API:", err);
      return false;
    }
  };
  
  // Last resort fallback to hardcoded recent rates
  const useFallbackRates = () => {
    const currentDate = new Date();
    setRates({
      cnyToRub: { rate: 12.75, lastUpdate: currentDate },
      usdToRub: { rate: 90.56, lastUpdate: currentDate }
    });
    setError(t('currencyFallbackUsed'));
    toast({
      title: t('currencyFetchError'),
      description: t('currencyFallbackUsed'),
      variant: "destructive",
    });
  };

  const fetchRates = async () => {
    setLoading(true);
    try {
      // Try primary source (CBR)
      const cbrSuccess = await fetchRatesFromCBR();
      
      // If CBR fails, try backup source
      if (!cbrSuccess) {
        const backupSuccess = await fetchRatesFromBackup();
        
        // If both fail, use fallback rates
        if (!backupSuccess) {
          useFallbackRates();
        } else {
          setError(null);
        }
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Failed to fetch currency rates:", err);
      useFallbackRates();
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
