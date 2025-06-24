import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Host = () => {
  const [numerosMarcados, setNumerosMarcados] = useState([]);
  const navigate = useNavigate();

  const handleHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const goToCard = () => {
    navigate("/card");
  };

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

  const reiniciar = () => {
    setNumerosMarcados([]);
  };

  return (
    <div className="host">
      <div className="grid grid-cols-2 gap-4">
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
                  onClick={() => toggleNumero(numero)}
                >
                  {numero}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <p>hola</p>
          <button onClick={handleHome}> Home </button>
          <button onClick={reiniciar}> Reiniciar </button>
          <button onClick={goToCard}>🎫 Ver Cartón de Bingo</button>
          
        </div>
      </div>
    </div>
  );
};

export default Host;
