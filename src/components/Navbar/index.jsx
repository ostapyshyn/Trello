import React from 'react';
import './styles.scss';
import { Bookmark } from '@mui/icons-material';

const Navbar = () => {
  return (
    <nav className='topnav'>
      <div className="container">
        <div>
          <Bookmark />
          <h1>Trello Board Clone</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
