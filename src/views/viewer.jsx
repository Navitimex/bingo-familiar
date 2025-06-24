import React, { useState, useEffect } from "react";
import db from "../firebase";
import { ref, onValue } from "firebase/database";

const Viewer = () => {
  const [numerosMarcados, setNumerosMarcados] = useState([]);

  // Leer del localStorage al cargar la vista
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

    // Cleanup
    return () => unsubscribe();
  }, []);

  const columnas = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
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
                >
                  {numero}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewer;
