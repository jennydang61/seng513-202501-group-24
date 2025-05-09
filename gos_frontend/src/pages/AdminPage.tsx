import NavBar from "../components/ui/Navbar2";
import "../../styles/Admin.css";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import { setStartingFund } from "../lib/api";
import useUsers from "../hooks/useUsers";
import useInitialFund from "../hooks/useInitialFund";
import UserCard from "../components/dashboard/UserCard";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/queryClient";

const AdminPage = () => {

  // state for search bar
  const [searchTerm, setSearchTerm] = useState(""); 

  // retrieving all users from DB
  const {
    users,
    isPending,
    isSuccess,
    isError
  } = useUsers();

  // retrieving the existing initial fund amount from DB
  const {
    initialFundAmount: startingAmount,
    isPending: saPending,
    isSuccess: saSuccess,
    isError: saError
  } = useInitialFund();

  // using mutation to set/update the new initial fund amount in DB
  const {
    mutate: setAmount,
    isPending: isMtnPending,
    isError: isMtnError,
    error: mtnError,
    isSuccess: isMtnSuccess,
  } = useMutation({
    mutationFn: setStartingFund, 
    onSuccess: () => {
      queryClient.invalidateQueries(["fund"]);
    }
  });
  
  // for the edit user pop up window 
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
  
    // formattedAmount required to display numbers in money format with commas in the input field
    const [formattedAmount, setFormattedAmount] = useState<string>
  ("");

  const formatWithCommas = (value: string): string => {
    // Remove non-numeric characters except for the decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    
    // Format the number with commas
    const parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ("$ " + parts.join("."));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value; // Get the raw input value
    const formattedValue = formatWithCommas(rawValue); // Format the value
    setFormattedAmount(formattedValue); // Update the state
  }

  // handleClick for setting the initial fund amount
  const handleClick = async () => {
    // const inputElement = document.getElementById("amount") as HTMLInputElement;
    // Remove commas and parse the number
    const amount = parseFloat(formattedAmount.replace(/[$,]/g, ""));

    // Validate input
    if (isNaN(amount) || amount < 0) {
      alert("Please enter a valid starting amount.");
      return;
    }
    setAmount(amount); // Submit the numeric value
    
  }

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
              <input 
                type="text" 
                placeholder="Search for users" 
                value={searchTerm} // Bind to searchTerm state
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
                />
            </div>
            {isPending && <p>loading...</p>}
            {isError && <p>Failed to get users.</p>}
            {isSuccess && (
              <div className="userList">
              {users
                .filter((user) =>
                  user.username.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
                )
                .slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => a.username.localeCompare(b.username)) // Sort by username
                .map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
            )}
          </div>

          {/* set funds */}
          <div className="adminFunds">
            <h2>Set Starting Fund Amount</h2>
            {saPending && <p>loading...</p>}
            {saError && <p>Failed to get starting fund amount.</p>}
            {saSuccess && (
              <p className="currentFund"><strong>Current: $ {startingAmount.toLocaleString("en-US")} </strong></p>
            )}
            <div className="fundInputGroup">
              {
                isMtnError && (
                  <div className="error">
                    An error occured
                  </div>
                )
              }
              <input 
                id="amount" 
                type="text" 
                placeholder="$ New Starting Amount"
                value={formattedAmount}
                onChange={handleInputChange} />
              <button className="setButton" onClick={handleClick}>SET</button>
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
