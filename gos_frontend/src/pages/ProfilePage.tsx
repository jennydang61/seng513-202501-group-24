import NavBar from "../components/ui/Navbar2";
import "../../styles/Profile.css";
import Modal from "../components/ui/Modal";
import useAuth from "../hooks/useAuth";
import profileImage from "/src/images/happyPlant.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUsername, updatePassword, deleteAccount } from "../lib/api";
import { getColorBySymbol } from "./StockPage";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { username, cashBalance, netWorth, portfolio, leaderboardRank,gainLoss, role } = user;

  // managing modal component type
  const [modalType, setModalType] = useState<"edit" | "password" | "delete" | null>(null);
  const closeModal = () => setModalType(null);

  // state for new username and password
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // HANDLERS

  // handler for saving new username
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

  // handler for changing password
  const handleChangePassword = async () => {
    try {
      await updatePassword(newPassword);
      alert("Password changed successfully.");
      closeModal();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to change password.");
    }
  };

  // handler for deleting account
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
      <NavBar /> {/* add nav bar component */}
      <main className="profileContainer">
        <h1 className="profileTitle">Profile</h1>

        <div className="profileCard">
          <div className="profileGrid">
            {/* left section of page */}
            <div className="profileLeft">
              <div className="profileTop">
                <img src={profileImage} alt="Profile" className="avatar" /> {/* profile image */}
                <h2 className="username">{username}</h2> {/* display username */}
              </div>

              <div className="profileButtons">
                <button onClick={() => setModalType("edit")}>Edit name</button>
                <button onClick={() => setModalType("password")}>Change password</button>
                <button onClick={() => setModalType("delete")}>Delete account</button>
              </div>
            </div>
            {/* right section of page */}
            <div className="profileRight">
              {role === "user" ? (
                <>
                  <div className="statsSection">
                    <div className="statCard">
                      <span className="label">Remaining Cash Balance: </span>
                      <span className="amount">${cashBalance.toLocaleString()}</span> {/* display remaining balance */}
                    </div>
                    <div className="statCard">
                      <span className="label">Current Net Worth: </span>
                      <span className="amount">${netWorth.toLocaleString()}  </span> {/* display net worth */}
                      <span className={`return ${gainLoss >= 0 ? "positive" : "negative"}`}>
                        {gainLoss >= 0 ? "+" : ""}
                        {gainLoss.toFixed(5)}%
                      </span>
                    </div>
                  </div>

                  {/* to show leaderboard status */}
              {
                    leaderboardRank === 0 ? (
                      <p className="statusMessage">
                        You are not on the leaderboard yet, keep trading!
                      </p>
                    ) : (
                      <p className="statusMessage">
                        Congratulations! You are #{leaderboardRank} on the leaderboard
                      </p>
                    )  
                  }
              {/* section to display assets */}
                  <div className="portfolioSection">
                    <h2>Your Portfolio</h2>
                    {portfolio.length > 0 ? (
                      portfolio
                        .slice()
                        .sort((a,b) => b.bookValue - a.bookValue)
                        .map((stock, index) => (
                          <div 
                            key={index} 
                            className={`stockButton ${getColorBySymbol(stock.stock)}`}
                            style={{ cursor: "default", margin:"10px 0"}}
                          >
                            <span className="stockSymbol">{stock.stock}
                              <span className={`return ${stock.return >= 0 ? "positive" : "negative"}`}>
                                {stock.return >= 0 ? " +" : " "}
                                {stock.return.toFixed(5)}%
                              </span>
                            </span>
                            <span className="stockQuantity">Quantity: {stock.quantity}</span>
                            <span className="stockCurrentWorth">Current Worth: ${stock.current.toFixed(2)}</span>
                            <span className="stockBookValue">
                              Book Value: ${stock.bookValue.toLocaleString()} 
                            </span>
                          </div>
                        ))
                    ) : (
                      <p className="noAssetsMessage">You don't own any stocks yet.</p>
                    )}
                  </div>
                </>
              ) : (
                <> {/* need styling */} 
                  <div className="adminSection">
                    <h2>Admin Dashboard</h2>
                    <p>Welcome, Admin! You have full control over the platform.</p>
                    <div className="profileButtons">
                      <button
                        className="adminButton"
                        onClick={() => navigate("/admin")}
                      >
                        Go to Admin Page
                      </button>
                    </div>
                  </div>
                </>
              )
            }
            </div>
          </div>
        </div>
      </main>

      {/* MODALS */}
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