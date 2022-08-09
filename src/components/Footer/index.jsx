import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as AboutIcon } from '../../assets/svg/about.svg';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as PersonOutlineIcon } from '../../assets/svg/personOutlineIcon.svg';

import './styles.scss';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/')}>
            <HomeIcon
              fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
              width="36px"
              height="36px"
            />
            <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>
              Home
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/about')}>
            <AboutIcon
              fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathMatchRoute('/offer') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }
            >
              About
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
