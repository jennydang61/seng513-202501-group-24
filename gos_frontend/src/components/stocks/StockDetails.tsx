import React, { useEffect, useState } from "react";
import { fetchHistoricalStock } from "../../lib/api";
import StockChart from "./StockChart";

interface StockHistory {
  date: string;
  close: number;
}

interface StockDetailsProps {
  selectedSymbol: string;
}

const StockDetails: React.FC<StockDetailsProps> = ({ selectedSymbol }) => {
  const [history, setHistory] = useState<StockHistory[]>([]);
  const [latestPrice, setLatestPrice] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState<"1D" | "7D" | "1M" | "1Y">("1D");

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const data = await fetchHistoricalStock(selectedSymbol);

        const formatted = data.map((entry: any) => ({
          date: new Date(entry.date).toISOString().split("T")[0],
          close: entry.close
        }));

        setHistory(formatted);
        if (formatted.length > 0) {
          setLatestPrice(formatted[formatted.length - 1].close);
        }
      } catch (err) {
        console.error("Error loading stock data", err);
      }
    };

    loadStockData();
  }, [selectedSymbol]);

  const filterDataByTimeframe = (): StockHistory[] => {
    if (timeframe === "1D") return history.slice(-1);
    if (timeframe === "7D") return history.slice(-7);
    if (timeframe === "1M") return history.slice(-30);
    if (timeframe === "1Y") return history.slice(-365);
    return history;
  };

  const displayData = filterDataByTimeframe();

  return (
    <div className="stockDetails">
      <div className="stockHeader">
        <h2 style={{ color: "#FFFFFF" , scale: 2 }}>{selectedSymbol}</h2>
        {latestPrice !== null && (
          <span className="stockPriceLarge">${latestPrice.toFixed(2)}</span>
        )}
        <div className="actionButtons">
          <button className="buyButton">Buy</button>
          <button className="sellButton">Sell</button>
        </div>
      </div>

      <div className="chartContainer">
        <StockChart data={displayData} />
      </div>

      <div className="timeframeButtons">
        {["1D", "7D", "1M", "1Y"].map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf as any)}
            className={timeframe === tf ? "timeframeButton active" : "timeframeButton"}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockDetails;
