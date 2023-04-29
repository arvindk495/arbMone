
import './App.css';
import Home from './Home';
import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;
function App() {
  return (
  <>
  <Home/>
  </>
  );
}

export default App;
