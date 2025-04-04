import NavBar from "../components/ui/Navbar";
import '../../styles/Leaderboard.css';

const Leaderboard = () => {
  return (
    <div className="leaderboardPage">
      <NavBar />
      <main className="leaderboardContainer">
        <h1 className="leaderboardTitle">Leaderboard</h1>
        <div className="leaderboardHeader">
          <span>Ranking</span>
          <span>Total Assets</span>
          <span>Daily Return</span>
        </div>
        <div className="leaderboardList">
          {/* User rows will go here later */}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
