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

  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

  // Sincronización Firebase: patrones clásicos
  useEffect(() => {
    if (rol === "host" && loadedClassicPatterns) {
      set(ref(db, "classicPatternStates"), classicPatternStates);
    }
  }, [classicPatternStates, rol, loadedClassicPatterns]);

  useEffect(() => {
    const classicRef = ref(db, "classicPatternStates");
    const unsubscribe = onValue(classicRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setClassicPatternStates(data);
      }
      setLoadedClassicPatterns(true);
    });
    return () => unsubscribe();
  }, []);

  // Sincronización Firebase: letras seleccionadas
  useEffect(() => {
    if (rol === "host") {
      set(ref(db, "letterStates"), letterStates);
    }
  }, [letterStates, rol]);

  useEffect(() => {
    const letterRef = ref(db, "letterStates");
    const unsubscribe = onValue(letterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLetterStates(data);
    });
    return () => unsubscribe();
  }, []);

  // Números marcados
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

  // Historial de números
  useEffect(() => {
    const historialRef = ref(db, "historialNumeros");
    const unsubscribe = onValue(historialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHistorial(data);
      } else {
        setHistorial([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Letra seleccionada
  useEffect(() => {
    const letraRef = ref(db, "selectedLetter");
    const unsubscribe = onValue(letraRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSelectedLetter(data);
      } else {
        setSelectedLetter(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (rol === "host") {
      set(ref(db, "selectedLetter"), selectedLetter);
    }
  }, [selectedLetter, rol]);

  // Último número
  useEffect(() => {
    const ultimoRef = ref(db, "ultimoNumero");
    const unsubscribe = onValue(ultimoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUltimoNumero(data);
      } else {
        setUltimoNumero({ letra: "L", numero: 0 });
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
    if (rol !== "host" || !selectedLetter) return;

    const yaMarcado = numerosMarcados.includes(numero);
    const nuevos = yaMarcado
      ? numerosMarcados.filter((n) => n !== numero)
      : [...numerosMarcados, numero];

    set(ref(db, "numerosMarcados"), nuevos);

    if (!yaMarcado) {
      const letra = obtenerLetra(numero);
      const nuevoUltimo = { letra, numero };

      setUltimoNumero(nuevoUltimo);
      set(ref(db, "ultimoNumero"), nuevoUltimo);

      const nuevoHistorial = [...historial, nuevoUltimo];
      setHistorial(nuevoHistorial);
      set(ref(db, "historialNumeros"), nuevoHistorial);
    }
  };

  const handleHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const reiniciar = () => {
    set(ref(db, "numerosMarcados"), []);
    set(ref(db, "classicPatternStates"), {
      diagonal: false,
      vertical: false,
      horizontal: false,
      corners: false,
      full: false,
    });
    set(ref(db, "letterStates"), {});
    set(ref(db, "ultimoNumero"), { letra: "L", numero: 0 });
    set(ref(db, "historialNumeros"), []);
    set(ref(db, "selectedLetter"), null);

    setTimeout(() => {
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
    }, 300);

    set(ref(db, "reinicio"), Date.now());
  };

  return (
    <div className="viewer-layout">
      {/* Bingo grande a la izquierda (65%) */}
      <div className="bingo-card">
        <div className="bingo-grid-wrapper">
          <BingoGrid
            numerosMarcados={numerosMarcados}
            rol="host"
            toggleNumero={selectedLetter ? toggleNumero : () => {}}
          />
        </div>
      </div>

      {/* Sidebar a la derecha (35%) */}
      <div className="viewer-sidebar">
        <div className="last-number-card">
          <h2>Último número</h2>
          <LastNumber
            letra={ultimoNumero?.letra}
            numero={ultimoNumero?.numero}
            historial={historial}
          />
        </div>

        <div className="pattern-selector-card">
          <h2>Patrones</h2>
          <PatternSelector
            classicPatternStates={classicPatternStates}
            setClassicPatternStates={setClassicPatternStates}
            letterStates={letterStates}
            setLetterStates={setLetterStates}
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
            rol="host"
          />

          <div style={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
            <button className="home-buttom" onClick={reiniciar}>
              Reiniciar
            </button>
            <button className="home-buttom" onClick={handleHome}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
