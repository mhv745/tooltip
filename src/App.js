import logo from './logo.svg';
import './App.css';
import Tooltip from './componentes/Tooltip';

function App() {
  return (
    <div className="App">
      <div>
        <Tooltip content="Texto del tooltip">
          <div style={{ width: '80px', height: '40px', background: 'green' }}>Bottom</div>
        </Tooltip>

        <Tooltip content="Texto del tooltip" position="top">
          <div style={{ width: '40px', height: '40px', background: 'green' }}>Top</div>
        </Tooltip>

        <Tooltip content="Texto del tooltip" position="left">
          <div style={{ width: '40px', height: '40px', background: 'green' }}>Left</div>
        </Tooltip>

        <Tooltip content="Texto del tooltip" position="right">
          <div style={{ width: '40px', height: '40px', background: 'green' }}>Right</div>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
