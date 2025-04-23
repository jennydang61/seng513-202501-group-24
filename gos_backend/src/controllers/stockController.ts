import { Request, Response } from 'express';
import { getHistoricalStockData } from '../services/stockServices';

export const fetchStockHistory = async (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const interval = (req.query.interval as '1d' | '1h') || '1d'; // Default to '1d' if not provided

  try {
    const data = await getHistoricalStockData(symbol, interval);
    res.json(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Could not retrieve stock history.' });
  }
};
