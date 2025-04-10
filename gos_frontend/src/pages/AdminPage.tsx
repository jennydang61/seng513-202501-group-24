import NavBar from "../components/ui/Navbar2";
import "../../styles/Admin.css";
import searchImage from "/src/images/searchIcon.png";
import pfpImage from "/src/images/pfp.png";

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
  return (
    <div className="adminPage">
      <NavBar />
      <main className="adminPageContainer">
        <h1 className="adminPageTitle">Admin</h1>
        <div className="adminPanel">

          <div className="adminUsers">
            <h2>Users</h2>
            <div className="userSearchBar">
                <img src={searchImage} className="searchIcon" />
                <input type="text" placeholder="Search for users" />
            </div>

            <div className="userList">
            {/* hard code for now */}
              {dummyUsers.map((user, index) => (
                <div key={index} className="userCard">
                  <div className="userInfo">
                    <img src={pfpImage}className="userAvatar"/>
                    <div>
                    {/* username */}
                      <p className="username">{user.name}</p>
                      {/* return */}
                      <p className={`userReturn ${user.return.startsWith("-") ? "negative" : "positive"}`}>
                        {user.return}
                      </p>
                    </div>
                  </div>
                  {/* total stocks */}
                  <span className="userTotal">{user.total}</span>
                  <div className="userActions">
                    <button className="editBtn">Edit Funds</button>
                    <button className="removeBtn">Remove User</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="adminFunds">
            <h2>Set Starting Fund Amount</h2>
            <p className="currentFund">Current: <strong>$</strong></p>
            <div className="fundInputGroup">
              <input type="text" placeholder="$ New Starting Amount" />
              <button className="setBtn">SET</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
