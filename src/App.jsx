import { useState } from "react";
import "./App.css";

function App() {
  const [numerosMarcados, setNumerosMarcados] = useState([]);

  const columnas = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
  };

  const toggleNumero = (numero) => {
    setNumerosMarcados((prev) =>
      prev.includes(numero)
        ? prev.filter((n) => n !== numero)
        : [...prev, numero]
    );
  };

  return (
    <div className="app">
      <h1>Bingo Familiar 🎉</h1>
      <div className="bingo-tabla">
        {Object.entries(columnas).map(([letra, numeros]) => (
          <div key={letra} className="fila">
            <div className="letra">{letra}</div>
            <div className="numeros-fila">
              {numeros.map((numero) => (
                <div
                  key={numero}
                  className={`casilla ${
                    numerosMarcados.includes(numero) ? "marcado" : ""
                  }`}
                  onClick={() => toggleNumero(numero)}
                >
                  {numero}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="boton-reset" onClick={() => setNumerosMarcados([])}>
        Reiniciar
      </button>
    </div>
  );
}

export default App;
