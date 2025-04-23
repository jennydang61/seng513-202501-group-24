import logo from '../../images/logo.png';
import '../../../styles/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../config/queryClient';
import { logout } from '../../lib/api';

const NavBar2 = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };
 
  // logs user out
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
      {/* logo that navigates to landing page when clicked */}
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate('/user/profile')}
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
                <Link to="/user/profile">Profile</Link>
            </li>
            <li className="navItem">
                <Link to="/user/trade">Trade</Link>
            </li>
            <li className="navItem">
                <Link to="/user/leaderboard">Leaderboard</Link>
            </li>
            <li className="navItem">
                <button className="authButton" onClick={signOut}>Logout</button>
            </li>
        </ul>       
      </nav>
    </header>
  );
};

export default NavBar2;