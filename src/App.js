import { useRef } from "react";
import "./App.css";
import Tooltip from "./componentes/Tooltip";

function App() {
  const refTooltipBottom = useRef();
  const boxRef = useRef()

  const handleOnHover = () => {
    refTooltipBottom.current.toggle();
  };

  return (
    <div className="App">
      <div className="contenedor">
        <div ref={boxRef} style={{width: "300px", height: "400px", border: "1px solid black"}}>
          <Tooltip
            id="toolt"
            // content="Esto no es una miagen"
            content={
              // <img
              //   alt="Alternative text"
              //   src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
              // ></img>
              "Últimas unidades con texto más largo largo"
            }
            boundaryRef={boxRef}
            ref={refTooltipBottom}
          >
            <div
              aria-describedby="test"
              id="caja"
              className="caja"
            >
              Bottom del triggerrrr
            </div>
          </Tooltip>
        </div>
        <Tooltip content="Últimas unidades">
          <div className="caja">Sin tooltip</div>
        </Tooltip>
        <button type="button" id="caja" className="caja">
          Bottom sin wrapper
        </button>
        <Tooltip content="un tooltip muy largo para comprobar bordes">
        <div className="caja" style={{width: "50px", height: "50px", justifySelf: "end"}} onClick={handleOnHover}>
          Abro el otro
        </div>
        </Tooltip>

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
