import NavBar from "../components/ui/Navbar2";
import '../../styles/Leaderboard.css';
import pfpImage from "/src/images/pfp.png";
import useLeaderboard from "../hooks/useLeaderboard";

// defining user object
interface User {
  username: string;
  netWorth: number;
  gainLoss: number;
}

const Leaderboard = () => {

  const {
    leaderboardUsers: users,
    isPending,
    isSuccess,
    isError
  } = useLeaderboard();

  return (
    <div className="leaderboardPage">
      {/* add nav bar */}
      <NavBar />
      <main className="leaderboardContainer">
        <h1 className="leaderboardTitle">Leaderboard</h1> {/* title */}
        <div className="leaderboardHeader">
          <span>Ranking</span>
          <span>Total Assets</span>
          <span>Total Return</span>
        </div>
        { isPending && ( // load leaderboard
          <div classname="leaderboardList">Loading...</div>
        )}
        { isSuccess && ( // loading is successful
          <div className="leaderboardList">
            {users.map((user, index) => (
              <div key={index} className="leaderboardRow">
                <div className="userInfo">
                  <span className="ranking">{user.leaderboardRank || index + 1}</span> {/* display user rank */}
                  <img className="userAvatar" src={pfpImage}/> {/* display avatar */}
                  <span className="username">{user.username}</span> {/* display username */}
                </div>
                <span>$ {user.netWorth.toLocaleString()}</span> {/* displat total assets */}
                <span className={user.gainLoss >= 0 ? "positive" : "negative"}> {/* conditional class for gain or loss */}
                    {user.gainLoss >= 0 ? `+${user.gainLoss.toFixed(5)}%` : `${user.gainLoss.toFixed(5)}%`} {/* display total return */}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;
