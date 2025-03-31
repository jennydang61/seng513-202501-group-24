import logo from '../../images/logo.png';
import '../../../styles/Navbar.css';

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
            <li className={'navItem'}>Profile</li>
            <li className={'navItem'}>Trade</li>
            <li className={'navItem'}>Leaderboard</li>
            </ul>
            <div className={'authButtons'}>
            <button className={'authButton'}>Logout</button>
            </div>
        </nav>
        </header>
    );
};

export default NavBar;