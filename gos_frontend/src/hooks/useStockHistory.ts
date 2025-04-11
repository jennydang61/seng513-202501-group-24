import { useEffect, useState } from 'react';
import { fetchHistoricalStock } from '../lib/api';

// Define the structure of the stock data
interface StockData {
  date: string;
  close: number;
}

export const useStockHistory = (symbol: string) => {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true); // Ensure loading state is set before fetch
        const result = await fetchHistoricalStock(symbol);
        console.log(result);
        // Ensure the result is an AxiosResponse and then access the 'data' property
        const historicalData = result.data as StockData[]; // Access `data` from the AxiosResponse
        
        // Now set the state with the fetched data
        setData(historicalData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch stock data');
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    if (symbol) {
      loadData();
    }
  }, [symbol]);

  return { data, loading, error };
};
