import NavBar from "../components/ui/Navbar2";
import "../../styles/Profile.css";
import Modal from "../components/ui/Modal";
import useAuth from "../hooks/useAuth";
import profileImage from "/src/images/happyPlant.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUsername, updatePassword, deleteAccount } from "../lib/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { username, cashBalance, netWorth, gainLoss } = user;

  // Hardcoded values (replace with real data)
  const startingFunds = 10000;
  const remainingFunds = 5056;
  const portfolioValue = 13256.0;

  // const totalValue = remainingFunds + portfolioValue;
  // const returnPercentage = (gainLoss / startingFunds) * 100;

  const [modalType, setModalType] = useState<"edit" | "password" | "delete" | null>(null);
  const closeModal = () => setModalType(null);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // 🔧 HANDLERS
  const handleSaveUsername = async () => {
    try {
      await updateUsername(newUsername);
      alert("Username updated!");
      closeModal();
      window.location.reload(); // Refresh to reflect change or update user context
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to update username.");
    }
  };

  const handleChangePassword = async () => {
    try {
      await updatePassword(newPassword);
      alert("Password changed successfully.");
      closeModal();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to change password.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      alert("Account deleted.");
      localStorage.removeItem("token");
      closeModal();
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete account.");
    }
  };

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
                <div className="statCard">
                  <span className="label">Remaining Cash Balance: </span>
                  <span className="amount">${cashBalance.toLocaleString()}</span>
                </div>
                <div className="statCard">
                  <span className="label">Current Net Worth: </span>
                  <span className="amount">${netWorth}  </span>
                  {/* <span className={`return ${gainLoss >= 0 ? "positive" : "negative"}`}>
                    {gainLoss >= 0 ? "+" : ""}
                    {gainLoss.toFixed(2)}%
                  </span> */}
                </div>
              </div>

              <p className="statusMessage">
                Congratulations! You are 12th position on the leaderboard
              </p>

              <div className="portfolioSection">
                <h2>Your Portfolio</h2>
                <div className="portfolioItem placeholder"></div>
                <div className="portfolioItem placeholder"></div>
                <div className="portfolioItem placeholder"></div>
                <div className="portfolioItem placeholder"></div>
                <a href="#" className="viewMore">See All Assets →</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* === MODALS === */}
      {modalType === "edit" && (
        <Modal title="Edit Username" onClose={closeModal}>
          <input
            type="text"
            className="inputBar"
            placeholder="New username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button className="saveButton" onClick={handleSaveUsername}>Save</button>
        </Modal>
      )}

      {modalType === "password" && (
        <Modal title="Change Password" onClose={closeModal}>
          <input
            type="password"
            className="inputBar"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="changeButton" onClick={handleChangePassword}>Change</button>
        </Modal>
      )}

      {modalType === "delete" && (
        <Modal title="Are you sure?" onClose={closeModal}>
          <p>This action cannot be undone.</p>
          <button className="deleteButton" onClick={handleDeleteAccount}>Confirm Delete</button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
