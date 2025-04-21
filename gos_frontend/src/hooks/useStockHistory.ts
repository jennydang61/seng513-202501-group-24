import { useEffect, useState } from 'react';
import { fetchHistoricalStock } from '../lib/api';

interface StockData {
  date: string;
  close: number;
}

export const useStockHistory = (symbol: string, interval: '1d' | '1h' = '1d') => {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchHistoricalStock(symbol, interval);

        // Basic validation and mapping if needed
        if (Array.isArray(result.data)) {
          const formattedData: StockData[] = result.data.map((entry) => ({
            date: new Date(entry.date).toISOString().split('T')[0], // formatted date
            close: entry.close,
          }));
          setData(formattedData);
        } else {
          throw new Error('Invalid data format received');
        }

      } catch (err: any) {
        setError(err.message || 'Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) loadData();
  }, [symbol, interval]);

  return { data, loading, error };
};
