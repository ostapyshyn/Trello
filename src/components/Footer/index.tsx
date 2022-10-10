import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as AboutIcon } from '../../assets/svg/about.svg';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as PersonOutlineIcon } from '../../assets/svg/personOutlineIcon.svg';

import './styles.scss';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route: string) => {
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
              fill={pathMatchRoute('/') ? '#DC143C' : '#2c2c2c'}
              width="36px"
              height="36px"
            />
            <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>
              Home
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/about')}>
            <AboutIcon
              fill={pathMatchRoute('/about') ? '#DC143C' : '#2c2c2c'}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathMatchRoute('/about') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }>
              About
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={pathMatchRoute('/profile') ? '#DC143C' : '#2c2c2c'}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }>
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
