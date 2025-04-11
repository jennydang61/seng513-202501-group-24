import NavBar from "../components/ui/Navbar";
import "../../styles/StockPage.css";
import searchImage from "/src/images/searchIcon.png";
import StockDetails from "../components/stocks/StockDetails";

const Stockpage = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="stockPage">
      <NavBar />
      <main className="stockPageContainer">
        <h1 className="stockPageTitle">Trade Stocks</h1>
        <StockDetails /> {/* This renders the chart */}

        <div className="searchBarWrapper">
          <div className="searchBar">
          <img src={searchImage} className="searchIcon" alt="Search Icon" />
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

