import NavBar from "../components/ui/Navbar2";
import "../../styles/Profile.css";
import Modal from "../components/ui/Modal";
import useAuth from "../hooks/useAuth";
import profileImage from "/src/images/happyPlant.png";
import { useState } from "react";


const ProfilePage = () => {
  const { user } = useAuth();
  const { username } = user; // deconstructing

  // hard code will need to change later
  const startingFunds = 10000;
  const remainingFunds = 5056;
  const portfolioValue = 13256.0;
  
  // calculations for total value and gain/loss
  const totalValue = remainingFunds + portfolioValue;
  const gainLoss = totalValue - startingFunds;
  const returnPercentage = (gainLoss / startingFunds) * 100;  


  const [modalType, setModalType] = useState<"edit" | "password" | "delete" | null>(null);
  const closeModal = () => setModalType(null);

  return (
    <div className="profilePage">
      <NavBar />
      <main className="profileContainer">
        <h1 className="profileTitle">Profile</h1>

        <div className="profileCard">
          <div className="profileGrid">

            <div className="profileLeft">
              <div className="profileTop">
                <img src={profileImage} alt="Profile" className="avatar" />
                <h2 className="username">{username}</h2>
              </div>

              <div className="profileButtons">
                <button onClick={() => setModalType("edit")}>Edit name</button>
                <button onClick={() => setModalType("password")}>Change password</button>
                <button onClick={() => setModalType("delete")}>Delete account</button>
              </div>
            </div>

            <div className="profileRight">
              <div className="statsSection">

              {/* hard code need to replace later */}
              <div className="statCard">
                <span className="label">Remaining funds</span>
                <span className="amount">${remainingFunds.toLocaleString()}</span>
              </div>
              <div className="statCard">
                <span className="label">Current</span>
                <span className="amount">${totalValue.toLocaleString()}</span>
                <span className={`return ${returnPercentage >= 0 ? "positive" : "negative"}`}>
                  {returnPercentage >= 0 ? "+" : ""}
                  {returnPercentage.toFixed(2)}%
                </span>
              </div>
              </div>

              {/* hard code */}
              <p className="statusMessage">
                Congratulations! You are 12th position on the leaderboard
              </p>

              <div className="portfolioSection">
                <h2>Your Portfolio</h2>
                <div className="portfolioItem placeholder"></div>
                <div className="portfolioItem placeholder"></div>
                <div className="portfolioItem placeholder"></div>
                <div className="portfolioItem placeholder"></div>
                {/* doesn't work yet */}
                <a href="#" className="viewMore">See All Assets →</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* functions don't work yet */}
      {modalType === "edit" && (
        <Modal title="Edit Username" onClose={closeModal}>
          <input type="text" className="inputBar" placeholder="New username" />
          <button className="saveButton">Save</button>
        </Modal>
      )}

      {modalType === "password" && (
        <Modal title="Change Password" onClose={closeModal}>
          <input type="password" className="inputBar" placeholder="New password" />
          <button className="changeButton">Change</button>
        </Modal>
      )}

      {modalType === "delete" && (
        <Modal title="Are you sure?" onClose={closeModal}>
          <p>This action cannot be undone.</p>
          <button className="deleteButton">Confirm Delete</button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
