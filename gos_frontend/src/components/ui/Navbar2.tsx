import logo from '../../images/logo.png';
import '../../../styles/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../config/queryClient';
import { logout } from '../../lib/api';

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  const{
    mutate:signOut
  } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear(); // remove all data stored in client
      navigate("/login", { replace: true }); // navigate the user to the sigin page
    }
  })

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate('/')}
      />

      <div
        className={`hamburgerNav ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <nav className={`navBar ${menuOpen ? 'open' : ''}`}>
        <ul className="navList">
            <li className="navItem">
                <Link to="/profile">Profile</Link>
            </li>
            <li className="navItem">
                <Link to="/trade">Trade</Link>
            </li>
            <li className="navItem">
                <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="navItem">
                <button className="authButton" onClick={signOut}>Logout</button>
            </li>
        </ul>       
      </nav>
    </header>
  );
};

export default NavBar;