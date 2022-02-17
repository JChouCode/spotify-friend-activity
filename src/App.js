import './css/App.css';
import Activity from './components/activity';
import Header from './components/header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <Activity />
    </div>
  );
}

export default App;
