import { useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import ListOfTasks from './components/ListOfTasks';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import Board from './pages/Board';

import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateBoard from './pages/CreateBoard';

function App() {
  const { amount } = useSelector((store) => store.tasks);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/board" element={<Board />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-board" element={<CreateBoard />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
      {/* <Home />
      <ListOfTasks amount={amount} /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
