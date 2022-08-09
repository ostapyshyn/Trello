import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

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
    </>
  );
};

export default Layout;
