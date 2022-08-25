import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import BoardLists from './components/BoardLists';
import { TaskManage } from './pages/TaskManage';
import SendInvitePage from './pages/SendInvitePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/board" element={<Board />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/boards/:board" element={<BoardLists />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-board" element={<CreateBoard />} />
          <Route path="/board/tasks/:id" element={<TaskManage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/send-invite" element={<SendInvitePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
