import React, { useEffect, useState } from "react";
import { fetchHistoricalStock } from "../../lib/api"; // Your API function
import StockChart from "./StockChart";

// Types
interface StockHistory {
  date: string;
  close: number;
}

interface StockData {
  symbol: string;
  latestPrice: number;
  history: StockHistory[];
  icon?: string;
}

const StockDetails = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);

  const stockSymbols = [
    "AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META", "NKE", "LYFT", "MCD", "UBER", "IBM", "AMD", "NVDA", "NFLX", "SPY"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStocks: StockData[] = [];

      for (const symbol of stockSymbols) {
        try {
          const history = await fetchHistoricalStock(symbol); // Returns array of history

          if (!Array.isArray(history) || history.length === 0) continue;

          // Sort by date just in case
          const sortedHistory = history.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const latest = sortedHistory[sortedHistory.length - 1];

          fetchedStocks.push({
            symbol,
            latestPrice: latest.close,
            history: sortedHistory.map((entry: any) => ({
              date: entry.date,
              close: entry.close,
            })),
            icon: `/icons/${symbol.toLowerCase()}.png`, // Optional icon logic
          });
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error);
        }
      }

      setStocks(fetchedStocks);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Trade Stocks</h2>
      <div className="stock-buttons">
        {stocks.map((stock, index) => (
          <div key={index} className="stock-button">
            {stock.icon && <img src={stock.icon} alt={stock.symbol} className="stock-icon" />}
            <div className="stock-info">
              <h3>{stock.symbol}</h3>
              <p className="stock-price">${stock.latestPrice.toFixed(2)}</p>
            </div>
            <div className="actions">
              <button className="buy-btn">Buy</button>
              <button className="sell-btn">Sell</button>
            </div>
            <div className="chart">
              <StockChart data={stock.history} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockDetails;
