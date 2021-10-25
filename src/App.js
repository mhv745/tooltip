import logo from './logo.svg';
import './App.css';
import Tooltip from './componentes/Tooltip';

function App() {
  return (
    <div className="App">
      <div className="contenedor">
        <Tooltip content="Texto del tooltip muuuuuucho más largo">
          <div className="caja" >Bottom</div>
        </Tooltip>
        <div className="caja">Sin tooltip</div>


        <Tooltip content="Texto del tooltip" position="left">
          <div className="caja">Left</div>
        </Tooltip>

        <Tooltip content="Texto del tooltip" position="right">
          <div className="caja">Right</div>
        </Tooltip>

        <Tooltip content="Texto del tooOO OOOOOOO Oooooo ooltip" position="top">
          <div className="caja">Top</div>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
