import "../assets/styles/number.css";

const LastNumber = ({ letra, numero, historial }) => {
  const esInicial = letra === " " && numero === "FREE";
  const prev4 = historial.slice(-3, -1).reverse();

  return (
    <div className="ultimo-contenedor">
      <div className="ultimo-numero">
        <div className="numero">{numero}</div>
        <div className="letra">{letra}</div>
      </div>

      {!esInicial && prev4.length > 0 && (
        <div className="anteriores">
          {prev4.map((item, idx) => (
            <span key={idx} className="anterior-casilla">
              <div className="numero-anterior">{item.numero}</div>
              <div className="letra-anterior">{item.letra}</div>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LastNumber;
