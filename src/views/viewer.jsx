import React, { useState, useEffect } from "react";
import db from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import LastNumber from "../components/lastNumber.jsx";
import PatternSelector from "../components/patternSelector.jsx";

const Viewer = () => {
  const [numerosMarcados, setNumerosMarcados] = useState([]);
  const [ultimoNumero, setUltimoNumero] = useState({ letra: "L", numero: 0 });
  const [historial, setHistorial] = useState([]);

  // Estados de patrones clásicos
  const [classicPatternStates, setClassicPatternStates] = useState({
    diagonal: false,
    vertical: false,
    horizontal: false,
    corners: false,
    full: false,
  });

  const [loadedClassicPatterns, setLoadedClassicPatterns] = useState(false);
  const [letterStates, setLetterStates] = useState({});
  const [selectedLetter, setSelectedLetter] = useState(null);

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  useEffect(() => {
  const letterStatesRef = ref(db, "letterStates");
  const unsubscribe = onValue(letterStatesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setLetterStates(data);
    } else {
      setLetterStates({});
    }
  });
  return () => unsubscribe();
}, []);


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

  // Leer patrones clásicos de Firebase al iniciar
  useEffect(() => {
    const classicRef = ref(db, "classicPatternStates");
    const unsubscribe = onValue(classicRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setClassicPatternStates(data);
      }
      setLoadedClassicPatterns(true); // Marca que ya cargó
    });
    return () => unsubscribe();
  }, []);

  // Leer estados de letras
  useEffect(() => {
    const letraRef = ref(db, "selectedLetter");
    const unsubscribe = onValue(letraRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSelectedLetter(data);
      }
    });
    return () => unsubscribe();
  }, []);

  // Leer historial de números
  useEffect(() => {
    const historialRef = ref(db, "historialNumeros");
    const unsubscribe = onValue(historialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setHistorial(data);
    });
    return () => unsubscribe();
  }, []);

  // Leer los ultimos numero de Firebase al iniciar
  useEffect(() => {
    const ultimoRef = ref(db, "ultimoNumero");
    const unsubscribe = onValue(ultimoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setUltimoNumero(data);
    });
    return () => unsubscribe();
  }, []);

  const columnas = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
  };

  useEffect(() => {
  const reinicioRef = ref(db, "reinicio");
  const unsubscribe = onValue(reinicioRef, (snapshot) => {
    if (snapshot.exists()) {
      // Reiniciar estados locales cuando el host reinicia
      setNumerosMarcados([]);
      setClassicPatternStates({
        diagonal: false,
        vertical: false,
        horizontal: false,
        corners: false,
        full: false,
      });
      setLetterStates({});
      setSelectedLetter(null);
      setUltimoNumero({ letra: "L", numero: 0 });
      setHistorial([]);
    }
  });

  return () => unsubscribe();
}, []);


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
        <div>
          <h3>Ultimo Numero</h3>

          <LastNumber
            letra={ultimoNumero?.letra}
            numero={ultimoNumero?.numero}
            historial={historial}
          />

          <h2>🧩 Patrones</h2>
          <PatternSelector
            classicPatternStates={classicPatternStates}
            selectedLetter={selectedLetter}
            letterStates={letterStates}
            rol="viewer" 
          />

          <button className="host-buttom" onClick={handleHome}>
            🏠 Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
