import NavBar from "../components/ui/Navbar";
import stockImage from "/src/images/stock_trading_computer.png";
import '../../styles/LandingPage.css';

// landing page
const LandingPage = () => {
  return (
    <>
      <div className={'pageContainer'}>
        <div className={'contentWrapper'}>
            {/* add nav bar */}
            <NavBar/>
          {/* hero container */}
          <main className={'heroContainer'}>
            <section className={'heroContent'}>
              {/* hero text content */}
              <h1 className={'heroTitle'}>The Game of Stocks</h1>
              <h2 className={'heroTagline'}>TRADE. LEARN. INVEST.</h2>
              <p className={'heroDescription'}>
                a beginner's guide to investing
              </p>
            </section>
            <div className={'heroImageContainer'}>
              <img
                src={stockImage}
                alt="Stock trading illustration"
                className={'heroImage'}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
  
export default LandingPage;
  