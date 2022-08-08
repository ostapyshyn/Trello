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
        </Route>
      </Routes>

      <Navbar />
      <Home />
      <ListOfTasks amount={amount} />
    </div>
  );
}

export default App;
