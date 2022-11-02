import React from 'react';
import './styles.scss';
import { Bookmark } from '@mui/icons-material';

type NavbarProps = {
  title: string;
};

const Navbar = ({ title }: NavbarProps) => {
  return (
    <nav className="topnav">
      <div className="container">
        <div>
          <Bookmark />
          <h1>{title}</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
