import NavBar from "../components/ui/Navbar2";
import '../../styles/Leaderboard.css';
import pfpImage from "/src/images/pfp.png";
import useLeaderboard from "../hooks/useLeaderboard";

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
      <NavBar />
      <main className="leaderboardContainer">
        <h1 className="leaderboardTitle">Leaderboard</h1>
        <div className="leaderboardHeader">
          <span>Ranking</span>
          <span>Total Assets</span>
          <span>Total Return</span>
        </div>
        { isPending && (
          <div classname="leaderboardList">Loading...</div>
        )}
        { isSuccess && (
          <div className="leaderboardList">
            {users.map((user, index) => (
              <div key={index} className="leaderboardRow">
                <div className="userInfo">
                  <span className="ranking">{user.leaderboardRank || index + 1}</span>
                  <img className="userAvatar" src={pfpImage}/>
                  <span className="username">{user.username}</span>
                </div>
                <span>$ {user.netWorth.toLocaleString()}</span>
                <span className={user.gainLoss >= 0 ? "positive" : "negative"}>
                    {user.gainLoss >= 0 ? `+${user.gainLoss.toFixed(5)}%` : `${user.gainLoss.toFixed(5)}%`}
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
