import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import PatternSelector from "../components/patternSelector.jsx";
import BingoGrid from "../components/bingoGrid.jsx";
import LastNumber from "../components/lastNumber.jsx";
import { ref, set, onValue } from "firebase/database";

const Host = () => {
  const [numerosMarcados, setNumerosMarcados] = useState([]);
  const [ultimoNumero, setUltimoNumero] = useState({ letra: "L", numero: 0 });
  const [historial, setHistorial] = useState([]);

  const [patternStates, setPatternStates] = useState({
    diagonal: false,
    vertical: false,
    horizontal: false,
    corners: false,
    full: false,
  });
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [letterStates, setLetterStates] = useState({}); // si querés manejar desactivadas

  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

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
    return () => unsubscribe();
  }, []);

  const obtenerLetra = (numero) => {
    if (numero >= 1 && numero <= 15) return "B";
    if (numero >= 16 && numero <= 30) return "I";
    if (numero >= 31 && numero <= 45) return "N";
    if (numero >= 46 && numero <= 60) return "G";
    if (numero >= 61 && numero <= 75) return "O";
    return "";
  };

  const toggleNumero = (numero) => {
    if (rol !== "host") return;

    const nuevos = numerosMarcados.includes(numero)
      ? numerosMarcados.filter((n) => n !== numero)
      : [...numerosMarcados, numero];

    set(ref(db, "numerosMarcados"), nuevos);

    if (!numerosMarcados.includes(numero)) {
      const letra = obtenerLetra(numero);
      setUltimoNumero({ letra, numero });
      setHistorial((prev) => [...prev, { letra, numero }]);
    }
  };

  const handleHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const reiniciar = () => {
    setNumerosMarcados([]);
    set(ref(db, "numerosMarcados"), []);
    setPatternStates({
      diagonal: false,
      vertical: false,
      horizontal: false,
      corners: false,
      full: false,
    });
    setSelectedLetter("A"); // reinicia la letra
    setLetterStates({});
    setUltimoNumero({ letra: "L", numero: 0 });
    setHistorial([]);
  };

  return (
    <div className="host">
      <div className="grid">
        {/* Columna izquierda */}
        <div>
          <BingoGrid
            numerosMarcados={numerosMarcados}
            toggleNumero={toggleNumero}
            rol={rol}
          />
        </div>

        {/* Columna cderechaentral */}
        <div>
          <h2>🎯 Último número</h2>
          <LastNumber
            letra={ultimoNumero?.letra}
            numero={ultimoNumero?.numero}
            historial={historial}
          />

          <h2>🧩 Patrones</h2>
          <PatternSelector
            patternStates={patternStates}
            setPatternStates={setPatternStates}
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
            letterStates={letterStates}
            setLetterStates={setLetterStates}
            rol={rol}
          />

          <button onClick={reiniciar}>🔁 Reiniciar</button>
          <button onClick={handleHome}>🏠 Volver al Inicio</button>
        </div>
      </div>
    </div>
  );
};

export default Host;
