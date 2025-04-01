import logo from '../../images/logo.png';
import '../../../styles/Navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className={'header'}>
        <img
            src={logo}
            alt="Logo"
            className={'logo'}
        />
        <nav className={'navigation'}>
            <ul className={'navList'}>
            <li className={'navItem'}>
                <Link to="/signin">Profile</Link>
            </li>
            <li className={'navItem'}>
                <Link to="/trade">Trade</Link>
            </li>
            <li className={'navItem'}>
                <Link to="/leaderboard">Leaderboard</Link>
            </li>
            </ul>
            <div className={'authButtons'}>
            <button className={'authButton'}>
                <Link to="/signin">Sign In</Link>
            </button>
            <button className={'authButton'}>
                <Link to="/register">Register</Link>
            </button>
            </div>
        </nav>
        </header>
    );
};

export default NavBar;