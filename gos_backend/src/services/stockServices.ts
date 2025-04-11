import yahooFinance from 'yahoo-finance2';

export const getHistoricalStockData = async (symbol: string) => {
  try {
    const result = await yahooFinance.historical(symbol, {
      period1: '2023-01-01',
      period2: new Date(),
      interval: '1d',
    });

    // Return the necessary data (date and close)
    return result.map((entry: any) => ({
      date: entry.date,
      close: entry.close,
    }));
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    throw new Error('Failed to fetch stock data');
  }
};
