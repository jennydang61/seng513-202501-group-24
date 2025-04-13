
import pfpImage from "/src/images/pfp.png";

const UserCard = ({user}) => {
  const { username } = user;

  function openEditModal(user: any): void {
    throw new Error("Function not implemented.");
  }

  return(
    <div className="userCard">
      <div className="userInfo">
        <img className="userAvatar" src={pfpImage}/>
        <div>
          {/* username and return*/}
          <p className="username">{username}</p>
          <p className={`userReturn ${user.return.startsWith("-") ? "negative" : "positive"}`}>
            test_return_value %
          </p>
        </div>
      </div>
      <span className="userTotal">$ test_total</span>
      <div className="userActions">
        <button className="editButton" onClick={() => openEditModal(user)}>Edit Funds</button>
        <button className="removeButton">Remove User</button>
      </div>
    </div>
  )
}

export default UserCard;