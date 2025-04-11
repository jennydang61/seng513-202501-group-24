import NavBar from "../components/ui/Navbar";
import '../../styles/StockPage.css';
import searchImage from "/src/images/searchIcon.png";
import StockDetails from "../components/stocks/StockDetails";

const Stockpage = () => {
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
        </div>
      </main>
    </div>
  );
};

export default Stockpage;
