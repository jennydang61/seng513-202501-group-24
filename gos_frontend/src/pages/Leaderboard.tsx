import NavBar from "../components/ui/Navbar2";
import '../../styles/Leaderboard.css';
import pfpImage from "/src/images/pfp.png";
import useUsers from "../hooks/useUsers";
import useLeaderboard from "../hooks/useLeaderboard";

// {/* hard code for now */}
// const users = [
//   { username: "user1", assets: "$1,000,598", return: "+4.23%" },
//   { username: "user2", assets: "$990,231", return: "+3.09%" },
//   { username: "user3", assets: "$867,283", return: "-1.01%" },
//   { username: "user4", assets: "$840,331", return: "+2.47%" },
//   { username: "user5", assets: "$801,221", return: "+1.22%" },
//   { username: "user6", assets: "$780,900", return: "+3.63%" },
//   { username: "user7", assets: "$760,124", return: "-0.79%" },
//   { username: "user8", assets: "$720,123", return: "+2.91%" },
//   { username: "user9", assets: "$609,123", return: "+1.69%" },
// ];

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
        <div className="leaderboardList">
          {users.map((user, index) => (
            <div key={index} className="leaderboardRow">
              <div className="userInfo">
                <span className="ranking">{index + 1}</span>
                <img className="userAvatar" src={pfpImage}/>
                <span className="username">{user.username}</span>
              </div>
              <span>$ {user.netWorth.toLocaleString()}</span>
              <span className={user.gainLoss >= 0 ? "positive" : "negative"}>
                  {user.gainLoss >= 0 ? `+${user.gainLoss.toFixed(2)}%` : `${user.gainLoss.toFixed(2)}%`}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
