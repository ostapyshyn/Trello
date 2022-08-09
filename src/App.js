import { useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import ListOfTasks from './components/ListOfTasks';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import Board from './pages/Board';

import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

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

          <Route path="/profile" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
      {/* <Home />
      <ListOfTasks amount={amount} /> */}
    </div>
  );
}

export default App;
