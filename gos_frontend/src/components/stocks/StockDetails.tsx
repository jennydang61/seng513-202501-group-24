import React, { useEffect, useState } from "react";
import { fetchHistoricalStock, updateStats } from "../../lib/api";
import StockChart from "./StockChart";
import useAuth from "../../hooks/useAuth";
import BuyModal from "../ui/BuyModal";
import ConfirmationModal from "../ui/ConfirmationModal";
import FundsErrorModal from "../ui/FundsErrorModal";
import SellModal from "../ui/SellModal";
import StockErrorModal from "../ui/StockErrorModal";
import SharesErrorModal from "../ui/SharesErrorModal";


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
  const {user, updateUserData} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showConfirmationModal, setConfirmationModal] = useState(false);
  const [showFundsErrorModal, setFundsErrorModal] = useState(false);
  const [showStockErrorModal, setStockErrorModal] = useState(false);
  const [showSharesErrorModal, setSharesErrorModal] = useState(false);
  const [quantity, setQuantity] = useState<string>("1");


  // handles buy button function when user clicks
  const handleBuyButton = () => {
    if (latestPrice != null) {
      const stock = {
        stock: selectedSymbol,
        quantity: quantity,
        price: latestPrice
      }

      const total = (latestPrice * (Number(quantity) >= 1 ? Number(quantity) : 1)).toFixed(2);
      // caution, using as any
      const currentBalance = (user as any).cashBalance;

      // if the user has the money to buy the stocks, then it the user's data will be updated, reflecting the
      // purchased stock
      if (currentBalance >= Number(total)) {
        const newBalance = currentBalance - Number(total);
        updateUserData({ portfolio: stock, cashBalance: Number(newBalance.toFixed(2))});
        updateStats();

        setTimeout(() => {
          setShowModal(false);
          handleOpenConModal();
        }, 500); 

      // if the user does not have the money, then an error pop up appears
      } else {
        handleErrorFundsModal();
      }

    } 
  }

  // handles sell button function when user clicks
  const handleSellButton = () => {
    if (latestPrice != null) {
      const stock = {
        stock: selectedSymbol,
        quantity: quantity,
        price: latestPrice
      }

      const total = (latestPrice * (Number(quantity) >= 1 ? Number(quantity) : 1)).toFixed(2);

      // caution, using as any
      const currentBalance = (user as any).cashBalance;
      const userPortfolio = (user as any).portfolio;

      const stockIndex = userPortfolio.findIndex((stocks: any) => 
        stocks.stock === stock.stock);
 
      //if the user has the specified stock that they want to sell and has shares from that stock, then 
      // the user's data will updated reflecting the sold stocks
      if (stockIndex > -1) { 
        if (userPortfolio[stockIndex].quantity >= Number(quantity)) {
          const newBalance = currentBalance + Number(total);
          // need it to be negative since updateController updates it through addition, if quantity is 0, it gets set to 0
          const newStockQuantity = Number(stock.quantity) * -1;
          stock.quantity = newStockQuantity.toString();
          updateUserData({ portfolio: stock, cashBalance: Number(newBalance.toFixed(2))});
          updateStats();

          setTimeout(() => {
            setShowSellModal(false);
            handleOpenConModal();
          }, 1000); 
        // if the user does not have enough shares to sell, then an error popup will appear
        } else {
          handleErrorSharesModal();
        }
      // if the user does not own shares from a selected stock, then an error popup will appear
      } else {
        handleErrorStockModal();
      }
    }
  }

  // pop up for buying stocks
  const handleOpenModal = () => {
    setShowModal(true);
  }

  // closes buy popup
  const handleCloseModal = () => {
    setShowModal(false);
    setShowSellModal(false);
  }

  // pop up for selling stocks
  const handleOpenSellModal = () => {
    setShowSellModal(true);
  }

  // confirmation pop up
  const handleOpenConModal = () => {
    setConfirmationModal(true);
    setTimeout(() => {
      setConfirmationModal(false);
    }, 1000)
  }

  // no funds error pop up
  const handleErrorFundsModal = () => {
    setFundsErrorModal(true);
    setTimeout(() => {
      setFundsErrorModal(false);
    }, 1000)
  }

  // stock not found error pop up
  const handleErrorStockModal= () => {
    setStockErrorModal(true);
    setTimeout(() => {
      setStockErrorModal(false);
    }, 1000)
  }

  // not enough shares error pop up
  const handleErrorSharesModal = () => {
    setSharesErrorModal(true);
    setTimeout(() => {
      setSharesErrorModal(false);
    }, 1000)
  }

  const getIntervalFromTimeframe = (tf: string): '1d' | '1h' => {
    return tf === "1D" ? "1h" : "1d";
  };

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const interval = getIntervalFromTimeframe(timeframe);
        const data = await fetchHistoricalStock(selectedSymbol, interval); // ✅ already raw array

        if (!Array.isArray(data)) throw new Error("Invalid data format");

        const formatted = data.map((entry: any) => ({
          date: interval === "1h"
            ? new Date(entry.date).toISOString()
            : new Date(entry.date).toISOString().split("T")[0],
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
  }, [selectedSymbol, timeframe]);

  const filterDataByTimeframe = (): StockHistory[] => {
    if (timeframe === "1D") return history;
    if (timeframe === "7D") return history.slice(-7);
    if (timeframe === "1M") return history.slice(-30);
    if (timeframe === "1Y") return history.slice(-365);
    return history;
  };

  return (
    <div className="stockDetails">
      <div className="stockHeader">
        <h2 style={{ color: "#FFFFFF", scale: 2 }}>{selectedSymbol}</h2>
        {latestPrice !== null && (
          <span className="stockPriceLarge">${latestPrice.toFixed(2)}</span>
        )}
        <div className="actionButtons">
          <button onClick={handleOpenModal} className="buyButton">Buy</button>
          <button onClick={handleOpenSellModal}className="sellButton">Sell</button>
        </div>
      </div>

      <div className="chartContainer">
        <StockChart data={filterDataByTimeframe()} interval={getIntervalFromTimeframe(timeframe)} />
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

      {/* buy stocks popup*/}
      {showModal && selectedSymbol && (
          <BuyModal buySellTitle={selectedSymbol} onClose={handleCloseModal}>
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
          </BuyModal>
      )}

      {/* sell stocks popup*/} 
      {showSellModal && selectedSymbol && (
        <SellModal buySellTitle={selectedSymbol} onClose={handleCloseModal}>
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
                <p><strong>Total Value:</strong></p>
                {latestPrice !== null && (
                  <span>${(latestPrice * (Number(quantity) >= 1 ? Number(quantity) : 1)).toFixed(2)}</span>
                )}
              </div>
              <button onClick={handleSellButton} className="confirmBuyButton">Confirm Sell</button>

        </SellModal>
      )}

      {/* confirmation popup*/}
      {showConfirmationModal && ( 
        <ConfirmationModal></ConfirmationModal>
      )}

      {/* error popups*/}
      {showFundsErrorModal && (
        <FundsErrorModal></FundsErrorModal>
      )}

      {showStockErrorModal && (
        <StockErrorModal></StockErrorModal>
      )}

      {showSharesErrorModal && (
        <SharesErrorModal></SharesErrorModal>
      )}

    </div>
  );
};

export default StockDetails;

