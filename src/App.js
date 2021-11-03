import { useRef } from 'react';
import './App.css';
import Tooltip from './componentes/Tooltip';

function App() {
  const ref = useRef();

  const handleOnHover = () => {
    ref.current.toggle()
  }

  return (
    <div className="App">
      <div className="contenedor">
        <div style={{position: 'relative'}}>
          <Tooltip content="一夜情" ref={ref} offset={10} >
            {<div className="caja" >Bottom</div>}
          </Tooltip>
        </div>
        <div className="caja">Sin tooltip</div>


        <div className="caja" onClick={handleOnHover}>Abro el otro</div>

        <Tooltip content="Texto del tooltip muuuuuucho más largo" position="left">
          {<div className="caja" >Left</div>}
        </Tooltip>

        <Tooltip content="Texto del tooltip" position="right">
          <div className="caja">Right</div>
        </Tooltip>

        <Tooltip content="TextodeltooOOOOOOOOOOoooooooltip" position="top">
          <div className="caja">Top</div>
        </Tooltip>
        <Tooltip content="Ultimas unidades">
          <div className="caja" >Bottom</div>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
