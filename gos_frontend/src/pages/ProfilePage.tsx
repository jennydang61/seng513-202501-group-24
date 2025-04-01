import NavBar from "../components/ui/Navbar2";
import '../../styles/Profile.css';

const ProfilePage = () => {
    return (
      <div className="profilePage">
        <NavBar />
        <main className="profileContainer">
            <h1 className="profileTitle">Profile</h1>
        </main>
      </div>
    );
  };
  
  export default ProfilePage;