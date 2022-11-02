import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar title="Trello Board Clone ✨" />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
