import NavBar from "../components/ui/Navbar2";
import '../../styles/Profile.css';
import profileImage from "/src/images/happyPlant.png";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const { username, createdAt } = user;

  return (
    <div className="profilePage">
      <NavBar />
      <main className="profileContainer">
        <h1 className="profileTitle">Profile</h1>
        <div className="profileCard">

          {/* pfp + username */}
          <div className="profileTop">
            <img src={profileImage} alt="Profile" className="avatar" />
            <h2 className="username">{username}</h2>
          </div>

          {/* funds*/}
          <div className="statsSection">
            <div className="statCard">
              <span className="label">Remaining funds</span>
            </div>
            <div className="statCard">
              <span className="label">Current</span>
            </div>
          </div>

          {/* Leaderboard message */}
          <p className="statusMessage">
            Congratulations! You are 12th position on the leaderboard
          </p>

          <div className="profileGrid">
            <div className="profileButtons">
              <button>Edit name</button>
              <button>Change password</button>
              <button>Delete account</button>
            </div>

            <div className="portfolioSection">
              <h2>Your Portfolio</h2>
              <a href="#" className="viewMore">See All Assets →</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
