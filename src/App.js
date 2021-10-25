import logo from './logo.svg';
import './App.css';
import Tooltip from './componentes/Tooltip'

function App() {
  return (
    <div className="App" style={{display: "flex", placeContent: "center", padding: "2rem"}}>
      <div style={{display: "grid", alignItems:"center", justifyContent:"space-evenly", height: "100%", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "2rem", width: "100%"}}>

        <Tooltip content="Texto del tooltip">
          <div style={{width: "80px", height: "40px", background: "green"}}>Bottom</div>
        </Tooltip>


        <Tooltip content="Texto del tooltip" position="top" offsetArrow={10}>
          <div style={{width: "40px", height: "40px", background: "green"}}>Top</div>
        </Tooltip>


        <Tooltip content="Texto del tooltip" position="left">
          <div style={{width: "40px", height: "40px", background: "green"}}>Left</div>
        </Tooltip>


        <Tooltip content="Texto del tooltip" position="right">
          <div style={{width: "40px", height: "40px", background: "green"}}>Right</div>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
