import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import ListOfTasks from './components/ListOfTasks';

import { useSelector } from 'react-redux';

function App() {
  const { amount } = useSelector((store) => store.tasks);
  return (
    <div className="App">
      <Navbar />
      <Home />
      <ListOfTasks amount={amount} />
    </div>
  );
}

export default App;
