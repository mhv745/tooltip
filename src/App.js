import { useRef, useState } from "react";
import "./App.css";
import Tooltip from "./componentes/Tooltip";

function App() {
  const refTooltipBottom = useRef();
  const boxRef = useRef();
  const [pos, setPos] = useState("bottom");
  const [open, setOpen] = useState(false);

  const toolt1 = useRef();
  const toolt2 = useRef();

  const handleOnClick = () => {
    let newPos = "bottom";
    switch (pos) {
      case "bottom":
        newPos = "left";
        break;
      case "top":
        newPos = "right";
        break;
      case "left":
        newPos = "top";
        break;
      default:
        newPos = "bottom";
        break;
    }
    if (open) {
      setTimeout(() => {
        setPos(newPos);
      }, 200);
    }
    setOpen(!open);
    refTooltipBottom.current.toggle();
  };

  const abrirTooltip = (t) => {
    if (t) {
      toolt1.current.toggle();
    } else {
      toolt2.current.toggle();
    }
  };

  return (
    <div className="App">
      <div
        style={{
          width: "400px",
          height: "500px",
          border: "1px solid black",
          margin: "0 auto",
          position: "absolute",
          left: "200px",
          top: "200px",
        }}
      >
        <Tooltip asChild content="Esto es un tooltip">
          <span><MyComponente /></span>
        </Tooltip>

        <Tooltip ref={toolt1} asChild content="Esto es un tooltip">
          <button>Trigger boton</button>
        </Tooltip>
      </div>
      <div className="contenedor">
        {/* <button type="button" onClick={() => abrirTooltip(true)}>
          Abrir tooltip 1
        </button>
        <button type="button" onClick={() => abrirTooltip(false)}>
          Abrir tooltip 2
        </button>
        <Tooltip ref={toolt1} content="Tooltip 1">
          <div
            style={{ width: "50px", height: "20px", background: "yellow" }}
          ></div>
        </Tooltip>

        <Tooltip ref={toolt2} content="Tooltip 2">
          <div
            style={{ width: "50px", height: "20px", background: "blue" }}
          ></div>
        </Tooltip> */}
        {/* <div ref={boxRef} style={{width: "300px", height: "400px", border: "1px solid black", overflow: "auto"}}>
          <Tooltip
            id="toolt"
            content="Últimas unidades con texto más largo largo"
            position={pos}
            offset={10}
            boundary={boxRef}
            ref={refTooltipBottom}
          >
            <div
              aria-describedby="test"
              id="caja"
              style={{width: "500px"}}
              className="caja"
            >
              Bottom del triggerrrr
            </div>
          </Tooltip>
        </div>
        <Tooltip content="un tooltip muy largo para comprobar bordesun tooltip muy largo para comprobar bordesun tooltip muy largo para comprobar bordes">
        <div className="caja" style={{width: "50px", height: "50px", justifySelf: "end"}} onClick={handleOnClick}>
          Abro el otro
        </div>
        </Tooltip> */}

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

const MyComponente = () => {
  return <button ref={}>Trigger</button>;
};

export default App;
