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
          <div className="profileGrid">
            {/* LEFT: Avatar + Username + Buttons */}
            <div className="profileLeft">
              <div className="profileTop">
                <img src={profileImage} alt="Profile" className="avatar" />
                <h2 className="username">{username}</h2>
              </div>

              <div className="profileButtons">
                <button>Edit name</button>
                <button>Change password</button>
                <button>Delete account</button>
              </div>
            </div>

            {/* RIGHT: Stats + Status + Portfolio */}
            <div className="profileRight">
              <div className="statsSection">
                <div className="statCard">
                  <span className="label">Remaining funds</span>
                </div>
                <div className="statCard">
                  <span className="label">Current</span>
                </div>
              </div>

              <p className="statusMessage">
                Congratulations! You are 12th position on the leaderboard
              </p>

              <div className="portfolioSection">
                <h2>Your Portfolio</h2>
                <a href="#" className="viewMore">See All Assets →</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
