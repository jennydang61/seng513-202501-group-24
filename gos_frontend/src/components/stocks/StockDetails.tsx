import React, { useEffect, useState } from "react";
import { fetchHistoricalStock } from "../../lib/api"; // API call to fetch historical stock data
import StockChart from "./StockChart"; // Your StockChart component for displaying the chart

// Define types for the stock data
interface StockHistory {
  date: string;
  close: number; // Use 'close' instead of 'price'
}

interface StockData {
  symbol: string;
  latestPrice: number;
  history: StockHistory[];
  icon: string;
}

const StockDetails = () => {
  const [stocks, setStocks] = useState<StockData[]>([]); // Set the type as StockData[]

  // List of stock symbols
  const stockSymbols = [
    "AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META", "NKE", "LYFT", "MCD", "TWTR", "IBM", "AMD", "NVDA", "NFLX", "SPY"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch historical stock data for each symbol and store them in the state
        const stockData = await Promise.all(
          stockSymbols.map(async (symbol) => {
            const response = await fetchHistoricalStock(symbol);
            // Map the data to include 'date' and 'close'
            return {
              symbol,
              latestPrice: response.data.latestPrice, // Assuming latestPrice is a direct field
              icon: response.data.icon, // Assuming icon is part of the response
              history: response.data.history.map((entry: any) => ({
                date: entry.date, // Ensure 'date' exists in the response
                close: entry.close, // Map 'price' to 'close'
              })),
            };
          })
        );
        setStocks(stockData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, []); // Run only once when the component mounts

  return (
    <div className="container">
      <h2 className="title">Trade Stocks</h2>
      <div className="stock-buttons">
        {stocks.map((stock, index) => (
          <div key={index} className="stock-button">
            <img src={stock.icon} alt={stock.symbol} className="stock-icon" />
            <div className="stock-info">
              <h3>{stock.symbol}</h3>
              <p className="stock-price">${stock.latestPrice.toFixed(2)}</p>
            </div>
            <div className="actions">
              <button className="buy-btn">Buy</button>
              <button className="sell-btn">Sell</button>
            </div>
            <div className="chart">
              <StockChart data={stock.history} /> {/* Pass the stock's historical data to StockChart */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockDetails;
