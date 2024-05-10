import { useRef, useState } from "react";
import "./App.css";

function App() {
  const elementoBarra = useRef(null);
  const [ancho, setAncho] = useState(1);
  const [rotacion, setRotacion] = useState(0);
  const [premio, setPremio] = useState("Haz click en Lanzar");
  const [dinero, setDinero] = useState(1);
  const [tiradas, setTiradas] = useState(1);
  const [estado, setEstado] = useState(0);

  const lanzar = () => {
    if (elementoBarra.current) {
      setTiradas(tiradas - 1);
      elementoBarra.current.classList.toggle("pausa");
      const widthBarra = elementoBarra.current.getBoundingClientRect().width;
      setAncho(widthBarra);
      girar();
      setEstado(1);
    }
  };

  const girar = () => {
    const nuevaRotacion = Math.floor(Math.random() * 210) + 340;
    setPremio("...suerte...");
    setRotacion(rotacion + ancho + nuevaRotacion);
  };

  const final = () => {
    setEstado(0);
    // elementoBarra.current.classList.toggle("pausa");
    const gradosDeRotacion = ((rotacion % 360) + 360) % 360;
    if (
      (gradosDeRotacion >= 0 && gradosDeRotacion <= 44) ||
      (gradosDeRotacion >= 180 && gradosDeRotacion <= 224)
    ) {
      //Casilla de Muerte
      setPremio("Casilla de Muerte");
      setDinero(0);
      setEstado(2);
    } else if (gradosDeRotacion >= 45 && gradosDeRotacion <= 90) {
      //Ganas una moneda y sigues jugando
      setPremio("Ganas una moneda y sigues jugando");
      setDinero(dinero + 1);
      setTiradas(tiradas + 1);
    } else if (gradosDeRotacion >= 91 && gradosDeRotacion <= 135) {
      //Doblas X2 moneda sy sigues jugando
      setPremio(`Doblas X2 moneda y ganas ${dinero * 2}`);
      setDinero(dinero * 2);
      setEstado(2);
    } else if (gradosDeRotacion >= 136 && gradosDeRotacion <= 179) {
      //Ganas 8 monedas y sigues jugando
      setPremio("Ganas 8 monedas y sigues jugando");
      setDinero(dinero + 8);
      setTiradas(tiradas + 1);
    } else if (gradosDeRotacion >= 225 && gradosDeRotacion <= 269) {
      //Ganas 5 monedas y sigues jugando
      setPremio("Ganas 5 monedas y sigues jugando");
      setDinero(dinero + 5);
      setTiradas(tiradas + 1);
    } else if (gradosDeRotacion >= 270 && gradosDeRotacion <= 314) {
      //Multiplicas X4
      setPremio(`Multiplicas X3 y ganas ${dinero * 3}`);
      setDinero(dinero * 3);
      setEstado(2);
    } else if (gradosDeRotacion >= 315 && gradosDeRotacion <= 359) {
      //Ganas 2 moneda sy sigues jugando
      setPremio("Ganas 2 monedas y sigues jugando");
      setDinero(dinero + 2);
      setTiradas(tiradas + 1);
    }
  };

  return (
    <>
      <div className="monedas">
        {Array.from({ length: dinero }, (_, index) => (
          <img key={index} src="./assets/moneda.png" alt="" />
        ))}
      </div>
      <div className="tickets">
        {Array.from({ length: tiradas }, (_, index) => (
          <img key={index} src="./assets/ticket.png" alt="" />
        ))}
      </div>
      <div className="plafon">
        <div
          className="ruleta"
          style={{
            backgroundImage: `url('../assets/ruleta.png')`,
            transform: `rotate(${rotacion}deg)`,
            transition: "transform 6s cubic-bezier(0.2,0.8,0.7,0.99)",
          }}
          onTransitionEnd={final}
        ></div>
        <div className="premio">{premio}</div>
        {estado === 0 && (
          <div className="barra1">
            <div ref={elementoBarra} className="barra-interior"></div>
          </div>
        )}
        <div className="barra-inferior">
          {tiradas > 0 && (
            <button className="lanzar" onClick={lanzar}>
              Lanzar
            </button>
          )}
        </div>
        {estado === 2 && (
          <h1>No te quedan mas tiradas. Has ganado {dinero} monedas</h1>
        )}
        <div className="central">
          <img src="./assets/central.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default App;
