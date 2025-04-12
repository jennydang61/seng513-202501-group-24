import NavBar from "../components/ui/Navbar";
import "../../styles/StockPage.css";
import searchImage from "/src/images/searchIcon.png";
import Modal from "../components/ui/Modal";
import { useState } from "react";

// all hard code
type Stock = {
  symbol: string;
  name: string;
  price: number;
  color: string;
};

const mockStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 218.27, color: "black" },
  { symbol: "META", name: "Meta Platforms", price: 596.25, color: "blue" },
  { symbol: "AMZN", name: "Amazon", price: 196.21, color: "orange" },
  { symbol: "NKE", name: "Nike", price: 98.43, color: "orange" },
  { symbol: "LYFT", name: "Lyft", price: 11.98, color: "purple" },
  { symbol: "MCD", name: "McDonald's", price: 305.44, color: "red" },
  { symbol: "TWTR", name: "Twitter", price: 30.87, color: "purple" },
];

const Stockpage = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="stockPage">
      <NavBar />
      <main className="stockPageContainer">
        <h1 className="stockPageTitle">Trade Stocks</h1>

        <div className="searchBarWrapper">
          <div className="searchBar">
            <img src={searchImage} className="searchIcon" />
            <input type="text" placeholder="Search for stocks" />
          </div>
        </div>

        {/* stocks */}
        <div className="stockGrid">
          {mockStocks.map((stock, index) => (
            <div
              key={index}
              className={`stockCard ${stock.color}`}
              onClick={() => {
                setSelectedStock(stock);
                setShowModal(true);
              }}
            >
              <span className="stockSymbol">{stock.symbol}</span>
              <span className="stockPrice">${stock.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* modal */}
        {showModal && selectedStock && (
          <Modal title={selectedStock.name} onClose={() => setShowModal(false)}>
            <p><strong>Symbol:</strong> {selectedStock.symbol}</p>
            <p><strong>Price:</strong> ${selectedStock.price.toFixed(2)}</p>
            <button className="buyButton">Buy</button>
            <button className="sellButton">Sell</button>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default Stockpage;

