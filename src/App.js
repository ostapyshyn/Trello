import './App.css';
import ListOfTasks from './components/ListOfTasks';
import { useSelector } from 'react-redux';

function App() {
  const { amount } = useSelector((store) => store.tasks);
  return (
    <div className="App">
      <ListOfTasks amount={amount} />
    </div>
  );
}

export default App;
