import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      {/* <header>
        <Link to="/">Home</Link>
        <Link to="/board">Board</Link>
        <Link to="/about">About</Link>
      </header> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
