import yahooFinance from 'yahoo-finance2';

export const getHistoricalStockData = async (
  symbol: string,
  interval: '1d' | '1h' = '1d'
) => {
  try {
    const now = new Date();
    let period1: Date;

    // Define time range based on interval
    if (interval === '1h') {
      // Limit to recent data (Yahoo limits hourly data range)
      period1 = new Date(now);
      period1.setDate(period1.getDate() - 2); // past 2 days
    } else {
      // Daily data since Jan 1, 2023
      period1 = new Date('2023-01-01');
    }

    const result = await yahooFinance.chart(symbol, {
      period1,
      period2: now,
      interval,
    });

    return result.quotes.map((entry: any) => ({
      date: entry.date,
      close: entry.close,
    }));
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    throw new Error('Failed to fetch stock data');
  }
};
