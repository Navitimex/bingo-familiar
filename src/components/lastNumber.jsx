import "../assets/styles/number.css";

const LastNumber = ({ letra, numero, historial }) => {
  const esInicial = letra === " " && numero === "FREE";
  const prev4 = historial.slice(-3, -1).reverse();

  // 👉 Nuevo: si letra o número no están definidos, mostrar mensaje
  const datosIncompletos = letra == null || numero == null;

  if (datosIncompletos) {
    return (
      <div className="ultimo-contenedor">
        <p style={{ color: "gray" }}>🎲 Aún no se ha marcado ningún número</p>
      </div>
    );
  }

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
