import logo from '../../images/logo.png';
import '../../../styles/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

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
                <Link to="/user/profile">Profile</Link>
            </li>
            <li className="navItem">
                <Link to="/user/trade">Trade</Link>
            </li>
            <li className="navItem">
                <Link to="/user/leaderboard">Leaderboard</Link>
            </li>
            <li className="navItem">
                <Link to="/login" className="authButton">Sign In</Link>
            </li>
            <li className="navItem">
                <Link to="/register" className="authButton">Register</Link>
            </li>
        </ul>       
      </nav>
    </header>
  );
};

export default NavBar;
