import { useRef } from 'react';
import './App.css';
import Tooltip from './componentes/Tooltip';

function App() {
  const ref = useRef();

  const handleOnHover = () => {
    ref.current.toggle();
  };

  return (
    <div className="App">
      <div className="contenedor">
        <div style={{ position: 'relative' }}>
          <Tooltip id="toolt" content="一夜情" ref={ref} offset={10}>
            {
              <button type="button" id="caja" className="caja">
                Bottom
              </button>
            }
          </Tooltip>
        </div>
        <div className="caja">Sin tooltip</div>

        <div className="caja" onClick={handleOnHover}>
          Abro el otro
        </div>

        {/* <Tooltip content="Texto del tooltip muuuuuucho más largo" position="left">
          {<input type="text" />}
        </Tooltip>

        <Tooltip content="Texto del tooltip" position="right">
          {<input type="text" />}
        </Tooltip>

        <Tooltip content="TextodeltooOOOOOOOOOOoooooooltip" position="top">
          <button type="button" className="caja">
            Top
          </button>
        </Tooltip>
        <Tooltip content="Ultimas unidades">
          <div className="caja">Bottom</div>
        </Tooltip> */}
      </div>
    </div>
  );
}

export default App;
