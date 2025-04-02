import NavBar from "../components/ui/Navbar";
import '../../styles/Leaderboard.css';

const Leaderboard = () => {
    return (
      <div className="leaderboardPage">
        <NavBar />
        <main className="leaderboardContainer">
        <h1 className="leaderboardTitle">Leaderboard</h1>
        </main>
      </div>
    );
  };
  
  export default Leaderboard;