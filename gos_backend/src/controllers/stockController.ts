import { Request, Response } from 'express';
import { getHistoricalStockData } from '../services/stockServices';

export const fetchStockHistory = async (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();  // Ensure symbol is in uppercase
  try {
    const data = await getHistoricalStockData(symbol);
    res.json(data);  // Send the stock data as JSON
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Could not retrieve stock history.' });
  }
};
