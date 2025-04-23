
import { useState } from "react";
import pfpImage from "/src/images/pfp.png";
import Modal from "../ui/Modal";
import { deleteUser } from "../../lib/api";
import queryClient from "../../config/queryClient";
import { useMutation } from "@tanstack/react-query";

interface UsercardParam {
  username: string;
  cashBalance: number;
  netWorth: number;
}

interface UserCardProps {
  user: UsercardParam;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { username, cashBalance, netWorth } = user;

  // managing modal component type
    const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
    const closeModal = () => setModalType(null);

  // state for new cash balance
  const [newCashBalance, setNewCashBalance] = useState("");

  // using mutation to delete the selected account
  const {
    mutate: deleteUserAccount,
  } = useMutation({
    mutationFn: deleteUser, 
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });

  const handleSaveBalance = async () => {
    
  }

  // handler for deleting account
  const handleDeleteAccount = async () => {
    try {
      deleteUserAccount(user.username);
      alert(`${user.username}'s account deleted.`);
      closeModal();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete account.");
    }
  };

  return(
    <div className="userCard">
      <div className="userInfo">
        <img className="userAvatar" src={pfpImage} alt=""/>
        <div>
          <p className="username">{ username }</p>
        </div>
      </div>
      <span className="userCash">$ { cashBalance.toLocaleString() }</span>
      <span className="userTotal">$ { netWorth.toLocaleString() }</span>
      <div className="userActions">
        <button className="editButton" onClick={() => setModalType("edit")}>Edit Funds</button>
        <button className="removeButton" onClick={() => setModalType("delete")}>Remove User</button>
      </div>

      {/* MODALS */}
      {modalType === "edit" && (
        <Modal title="Edit Funds" onClose={closeModal}>
          <input
            type="text"
            className="inputBar"
            placeholder="New cash balance"
            value={newCashBalance}
            onChange={(e) => setNewCashBalance(e.target.value)}
          />
          <button className="saveButton" onClick={handleSaveBalance}>Save</button>
        </Modal>
      )}

      {modalType === "delete" && (
        <Modal title="Are you sure?" onClose={closeModal}>
          <p>This action cannot be undone.</p>
          <button className="deleteButton" onClick={handleDeleteAccount}>Confirm Delete</button>
        </Modal>
      )}
    </div>
  )
}

export default UserCard;//