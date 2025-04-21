import React, { useEffect, useState } from "react";
import { fetchHistoricalStock } from "../../lib/api";
import StockChart from "./StockChart";
import useAuth from "../../hooks/useAuth";
import BuySellModal from "../ui/BuySellModal";
import ConfirmationModal from "../ui/ConfirmationModal";
import FundsErrorModal from "../ui/FundsErrorModal";

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
  const {user, updateUserData, isUpdateError} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setConfirmationModal] = useState(false);
  const [showFundsErrorModal, setFundsErrorModal] = useState(false);
  const [quantity, setQuantity] = useState<string>("1");


  const handleBuyButton = () => {
    // add error handling for insufficient funds,
    if (latestPrice != null) {
      const stock = {
        stock: selectedSymbol,
        quantity: quantity,
        price:(latestPrice * (Number(quantity) >= 1 ? Number(quantity) : 1)).toFixed(2)
      }

      // caution, using as any
      const currentBalance = (user as any).cashBalance;

      if (currentBalance >= (latestPrice * (Number(quantity) >= 1 ? Number(quantity) : 1)).toFixed(2)) {
        const newBalance = currentBalance - Number(stock.price);
        updateUserData({ portfolio: stock, cashBalance: newBalance});

        setTimeout(() => {
          setShowModal(false);
          handleOpenConModal();
        }, 500); 

      } else {
        handleErrorFundsModal();
      }
      
    } 
  }
  
  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleOpenConModal = () => {
    setConfirmationModal(true);
    setTimeout(() => {
      setConfirmationModal(false);
    }, 1000)
  }

  const handleErrorFundsModal = () => {
    setFundsErrorModal(true);
    setTimeout(() => {
      setFundsErrorModal(false);
    }, 1000)
  }

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
          <button onClick={handleOpenModal}className="buyButton">Buy</button>
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
      {showModal && selectedSymbol && (
          <BuySellModal buySellTitle={selectedSymbol} onClose={handleCloseModal}>
              {latestPrice !== null && (
                <div className="currentPriceContainer">
                  <p><strong>Current Price:</strong></p>
                  <span>${latestPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="quantityContainer">
                <p><strong>Quantity:</strong></p>
                <input 
                  type="number" 
                  className="bsInputBar" 
                  placeholder="Quantity (Minimum: 1)" 
                  min={1} 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)} 
                  onBlur={() => {
                    if (quantity === "" || Number(quantity) < 1) {
                      setQuantity("1"); 
                    }
                  }}
                />
              </div>
              <div className="totalContainer">
                <p><strong>Total Price:</strong></p>
                {latestPrice !== null && (
                  <span>${(latestPrice * (Number(quantity) >= 1 ? Number(quantity) : 1)).toFixed(2)}</span>
                )}
              </div>
              <button onClick={handleBuyButton} className="confirmBuyButton">Confirm Buy</button>
          </BuySellModal>
      )}

      {showConfirmationModal && ( 
        <ConfirmationModal>
        </ConfirmationModal>
      )}

      {showFundsErrorModal && (
        <FundsErrorModal></FundsErrorModal>
      )}

    </div>
  );
};

export default StockDetails;

