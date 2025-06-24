import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import { ref, set, onValue } from "firebase/database";

const Host = () => {
  const [numerosMarcados, setNumerosMarcados] = useState([]);

  useEffect(() => {
    const numerosRef = ref(db, "numerosMarcados");
    const unsubscribe = onValue(numerosRef, (snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        setNumerosMarcados(datos);
      } else {
        setNumerosMarcados([]);
      }
    });

    return () => unsubscribe(); // limpiar listener al desmontar
  }, []);

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
    setNumerosMarcados((prev) => {
      const nuevos = prev.includes(numero)
        ? prev.filter((n) => n !== numero)
        : [...prev, numero];

      // Guarda en Firebase
      set(ref(db, "numerosMarcados"), nuevos).catch(console.error);

      return nuevos;
    });
  };

  const reiniciar = () => {
    setNumerosMarcados([]);
    localStorage.removeItem("numerosMarcados");
    set(ref(db, "numerosMarcados"), []);
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
          <button onClick={handleHome}> Home </button>
          <button onClick={reiniciar}> Reiniciar </button>
          <button onClick={goToCard}>🎫 Ver Cartón de Bingo</button>
        </div>
      </div>
    </div>
  );
};

export default Host;
