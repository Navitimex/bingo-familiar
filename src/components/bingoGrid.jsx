import React from "react";
import "../assets/styles/bingo.css";

const columnas = {
  B: Array.from({ length: 15 }, (_, i) => i + 1),
  I: Array.from({ length: 15 }, (_, i) => i + 16),
  N: Array.from({ length: 15 }, (_, i) => i + 31),
  G: Array.from({ length: 15 }, (_, i) => i + 46),
  O: Array.from({ length: 15 }, (_, i) => i + 61),
};

const BingoGrid = ({ numerosMarcados, toggleNumero, rol }) => {
  return (
    <div className="bingo-grid">
      {Object.entries(columnas).map(([letra, numeros]) => (
        <div key={letra} className="columna">
          <div className="letra">{letra}</div>
          {numeros.map((numero) => (
            <div
              key={numero}
              className={`casilla ${
                numerosMarcados.includes(numero) ? "marcado" : ""
              }`}
              onClick={() => rol === "host" && toggleNumero(numero)}
            >
              {numero}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BingoGrid;
