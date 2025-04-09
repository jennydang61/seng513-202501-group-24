import NavBar from "../components/ui/Navbar2";
import '../../styles/Profile.css';
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const { username, createdAt } = user;

    return (
      <div className="profilePage">
        <NavBar />
        <main className="profileContainer">
            <h1 className="profileTitle">Profile</h1>
            <p>
              Username: {username}
            </p>
            <p>
              Created on {new Date(createdAt).toLocaleDateString("en-US")}
            </p>
        </main>
      </div>
    );
  };
  
  export default ProfilePage;