import React, { useEffect, useState } from "react";
import NavBar from "../components/ui/Navbar";
import "../../styles/StockPage.css";
import searchImage from "/src/images/searchIcon.png";
import StockDetails from "../components/stocks/StockDetails";
import { fetchHistoricalStock } from "../lib/api"; // Adjust if path is different



// API format:
// {
//   date: "2021-02-02T00:00:00.000Z",
//   open: 844.679993,
//   high: 880.5,
//   low: 842.200623,
//   close: 872.789978,
//   adjClose: 872.789978,
//   volume: 24346213
// }

interface StockData {
  symbol: string;
  latestPrice: number;
  history: {
    date: string;
    close: number;
  }[];
}

const stockSymbols = [
  "AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META",
  "NKE", "LYFT", "MCD", "UBER"
];

const getColorBySymbol = (symbol: string): string => {
  switch (symbol) {
    case "AAPL":
    case "UBER":
      return "black";
    case "GOOG":
    case "MSFT":
    case "META":
      return "blue";
    case "AMZN":
    case "NKE":
      return "orange";
    case "TSLA":
    case "MCD":
      return "red";
    case "LYFT":
      return "purple";
    default:
      return "black";
  }
};

const Stockpage = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("MSFT");
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllStocks = async () => {
      const fetched: StockData[] = [];

      for (const symbol of stockSymbols) {
        try {
          const data = await fetchHistoricalStock(symbol);
          const formattedHistory = data.map((entry: any) => ({
            date: new Date(entry.date).toISOString().split("T")[0],
            close: entry.close
          }));

          const latest = formattedHistory[formattedHistory.length - 1]?.close;

          if (latest !== undefined) {
            fetched.push({
              symbol,
              latestPrice: latest,
              history: formattedHistory
            });
          }
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
        }
      }

      setStocks(fetched);
    };

    fetchAllStocks();
  }, []);

  return (
    <div className="stockPage">
      <NavBar />

      <main className="stockPageContainer">
        <h1 className="stockPageTitle">Trade Stocks</h1>

        {/* Search Bar */}
        <div className="searchBarWrapper">
          <div className="searchBar">
            <img src={searchImage} className="searchIcon" alt="Search Icon" />
            <input 
              type="text" 
              placeholder="Search for stocks" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const match = stocks.find(
                    (s) => s.symbol.toLowerCase() === searchInput.toLowerCase()
                  );
                  if (match) {
                    setSelectedSymbol(match.symbol);
                    setError(""); 
                  } else {
                    setError(`Stock ${searchInput.toUpperCase()} not found`);
                  }
                }
              }}              
            />
            {error && <div className="searchError">{error}</div>}
          </div>
        </div>

        {/* Stock Buttons */}
        <div className="stockGrid">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className={`stockButton ${getColorBySymbol(stock.symbol)}`}
              onClick={() => setSelectedSymbol(stock.symbol)}
              style={{ 
                cursor: "pointer"
              }}
            >
              <span className="stockSymbol">{stock.symbol}</span>
              <span className="stockPrice">${stock.latestPrice.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Chart + Details */}
        <StockDetails selectedSymbol={selectedSymbol} />
      </main>
    </div>
  );
};

export default Stockpage;