import NavBar from "../components/ui/Navbar2";
import "../../styles/Admin.css";
import Modal from "../components/ui/Modal";
import { useState } from "react";
// import pfpImage from "/src/images/pfp.png";
import useUsers from "../hooks/useUsers";
import UserCard from "../components/dashboard/UserCard";

{/* hard code */}
const dummyUsers = [
  { name: "user1", total: "$1,000,598", return: "+4.23%" },
  { name: "user2", total: "$990,231", return: "+3.09%" },
  { name: "user3", total: "$867,283", return: "-1.01%" },
  { name: "user4", total: "$840,331", return: "+2.47%" },
  { name: "user5", total: "$801,221", return: "+1.22%" },
  { name: "user6", total: "$780,900", return: "+3.63%" },
  { name: "user7", total: "$760,124", return: "-0.79%" },
  { name: "user8", total: "$720,123", return: "+2.91%" },
];

const AdminPage = () => {

  const {
    users,
    isPending,
    isSuccess,
    isError
  } = useUsers();

  const [modalType, setModalType] = useState<"edit" | null>(null);
  const [selectedUser, setSelectedUser] = useState<{ name: string; total: string } | null>(null);

  const openEditModal = (user: { name: string; total: string }) => {
    setSelectedUser(user);
    setModalType("edit");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
  };

  return (
    <div className="adminPage">
      <NavBar />
      <main className="adminPageContainer">
        <h1 className="adminPageTitle">Admin</h1>

        <div className="adminPanel">
          {/* user list */}
          <div className="adminUsers">
            <h2>Users</h2>
            <div className="userSearchBar">
              <img src="/src/images/searchIcon.png" className="searchIcon" />
              <input type="text" placeholder="Search for users" />
            </div>
            {isPending && <p>loading...</p>}
            {isError && <p>Failed to get users.</p>}
            {isSuccess && (
              <div className="userList">
              {users.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
            )}
          </div>

          {/* set funds */}
          <div className="adminFunds">
            <h2>Set Starting Fund Amount</h2>
            <p className="currentFund">Current: <strong>$</strong></p>
            <div className="fundInputGroup">
              <input type="text" placeholder="$ New Starting Amount" />
              <button className="setButton">SET</button>
            </div>
          </div>
        </div>
      </main>

      {/* modal */}
      {modalType === "edit" && selectedUser && (
        <Modal title={`Edit Funds for ${selectedUser.name}`} onClose={closeModal}>
          <div className="editFundsModal">
            <div className="editFundsRow">
              <div className="fundLabel">Current Balance<br />(Cash only):</div>
              <div className="fundAmount">{selectedUser.total}</div>
            </div>

            <div className="editFundsRow">
              <div className="fundLabel">New Balance:</div>
              <div className="inputGroup">
                <span className="dollarSign">$</span>
                <input className="newBalanceInput" placeholder="1,000,000" />
              </div>
            </div>

            <div className="editFundsButtons">
              <button className="cancelButton" onClick={closeModal}>Cancel</button>
              <button className="confirmButton">Edit Funds</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
