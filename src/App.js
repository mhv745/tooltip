import { useRef } from "react";
import "./App.css";
import Tooltip from "./componentes/Tooltip";

function App() {
  const refTooltipBottom = useRef();

  const handleOnHover = () => {
    refTooltipBottom.current.toggle();
  };

  return (
    <div className="App">
      <div className="contenedor">
        <div style={{ position: "relative" }}>
          <div>DIV DE FUERA</div>
          <h1>Antes del trriger</h1>
          <Tooltip
            id="toolt"
            // content="Esto no es una miagen"
            content={
              <img
                alt="Alternative text"
                src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
              ></img>
            }
            ref={refTooltipBottom}
            offset={10}
          >
            <button
              type="button"
              aria-describedby="test"
              id="caja"
              className="caja"
              onClick={() => {
                refTooltipBottom.current.toggle();
              }}
            >
              Bottom del triggerrrr
            </button>
          </Tooltip>
        </div>
        <div className="caja">Sin tooltip</div>
        <button type="button" id="caja" className="caja">
          Bottom sin wrapper
        </button>
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
