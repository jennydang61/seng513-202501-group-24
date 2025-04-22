
import pfpImage from "/src/images/pfp.png";

interface UsercardParam {
  username: string;
  netWorth: number;
}

interface UserCardProps {
  user: UsercardParam;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { username, netWorth } = user;

  function openEditModal(user: UsercardParam): void {
    throw new Error("Function not implemented."); // to do
  }

  return(
    <div className="userCard">
      <div className="userInfo">
        <img className="userAvatar" src={pfpImage} alt=""/>
        <div>
          <p className="username">{ username }</p>
        </div>
      </div>
      <span className="userTotal">$ { netWorth.toLocaleString() }</span>
      <div className="userActions">
        <button className="editButton" onClick={() => openEditModal(user)}>Edit Funds</button>
        <button className="removeButton">Remove User</button>
      </div>
    </div>
  )
}

export default UserCard;//