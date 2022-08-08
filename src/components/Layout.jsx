import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/board">Board</Link>
        <Link to="/about">About</Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
