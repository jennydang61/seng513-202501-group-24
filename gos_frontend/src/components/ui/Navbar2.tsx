import logo from '../../images/logo.png';
import '../../../styles/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';


const NavBar = () => {
    const navigate = useNavigate();
    return (
        <header className={'header'}>
        <img
            src={logo}
            alt="Logo"
            className={'logo'}
            onClick={() => navigate('/profile')}
        />
        <nav className={'navigation'}>
            <ul className={'navList'}>
            <li className={'navItem'}>
                <Link to="/profile">Profile</Link>
            </li>
            <li className={'navItem'}>
                <Link to="/trade">Trade</Link>
            </li>
            <li className={'navItem'}>
                <Link to="/leaderboard">Leaderboard</Link>
            </li>
            </ul>
            <div className={'authButtons'}>
            <button className={'authButton'}>Logout</button>
            </div>
        </nav>
        </header>
    );
};

export default NavBar;