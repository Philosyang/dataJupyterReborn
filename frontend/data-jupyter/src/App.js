import logo from './logo.svg';
import './App.css';
import NaviBar from "./componets/naviBar"
import WorkFlow from './componets/workflow.jsx';

function App() {
  return (
    <div>
      <div className= "entireWrapper">
        <NaviBar/>
        <WorkFlow/>
      </div>
    </div>
    );
}

export default App;
