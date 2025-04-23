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
      {/* logo that navigates to landing page when clicked */}
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate('/')}
      />

      {/* hamburger menu icon for mobile */}
      <div
        className={`hamburgerNav ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* nav bar that shows when opened */}
      <nav className={`navBar ${menuOpen ? 'open' : ''}`}>
        <ul className="navList">
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
