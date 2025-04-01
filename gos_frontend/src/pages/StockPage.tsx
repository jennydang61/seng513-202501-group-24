import NavBar from "../components/ui/Navbar2";
import '../../styles/StockPage.css';
import searchImage from "/src/images/searchIcon.png";

const Stockpage = () => {
    return (
      <div className="stockPage">
        <NavBar />
        <main className="stockPageContainer">
          <h1 className="stockPageTitle">Trade Stocks</h1>
  
          <div className="searchBar">
            <img src={searchImage} className="searchIcon" />
            <input type="text" placeholder="Search for stocks" />
          </div>
        </main>
      </div>
    );
  };
  
  export default Stockpage;