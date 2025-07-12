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

  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

  // Guardar patrones clásicos en Firebase cuando cambien
  useEffect(() => {
    if (rol === "host" && loadedClassicPatterns) {
      set(ref(db, "classicPatternStates"), classicPatternStates);
    }
  }, [classicPatternStates, rol, loadedClassicPatterns]);

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

  // Guardar estados de letras
  useEffect(() => {
    if (rol === "host") {
      set(ref(db, "letterStates"), letterStates);
    }
  }, [letterStates, rol]);

  // Leer estados de letras
  useEffect(() => {
    const letterRef = ref(db, "letterStates");
    const unsubscribe = onValue(letterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLetterStates(data);
    });
    return () => unsubscribe();
  }, []);

  // Leer números marcados de Firebase al iniciar
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

  // Leer historial desde Firebase al iniciar
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

  // Leer el último número desde Firebase
  useEffect(() => {
    const ultimoRef = ref(db, "ultimoNumero");
    const unsubscribe = onValue(ultimoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUltimoNumero(data);
      } else {
        //setUltimoNumero(null);
        setUltimoNumero({ letra: "L", numero: 0 }); // 🔁 Valor por defecto
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

  useEffect(() => {
    const patternRef = ref(db, "patternStates");
    const unsubscribe = onValue(patternRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setPatternStates(data);
    });
    return () => unsubscribe();
  }, []);

  const toggleNumero = (numero) => {
    if (rol !== "host") return;

    const yaMarcado = numerosMarcados.includes(numero);
    const nuevos = yaMarcado
      ? numerosMarcados.filter((n) => n !== numero)
      : [...numerosMarcados, numero];

    // 🔥 Actualizar en Firebase
    set(ref(db, "numerosMarcados"), nuevos);

    // ✅ Solo actualizar el último número si fue un nuevo número marcado
    if (!yaMarcado) {
      const letra = obtenerLetra(numero);
      const nuevoUltimo = { letra, numero };

      // 👉 Guardar localmente y en Firebase
      setUltimoNumero(nuevoUltimo);
      set(ref(db, "ultimoNumero"), nuevoUltimo);

      // 👉 Actualizar historial local y remoto
      const nuevoHistorial = [...historial, nuevoUltimo];
      setHistorial(nuevoHistorial);
      set(ref(db, "historialNumeros"), nuevoHistorial);
    }
  };

  // Func de volver al inicio
  const handleHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const reiniciar = () => {
    // Borra los datos en Firebase
    set(ref(db, "numerosMarcados"), []);
    set(ref(db, "classicPatternStates"), {
      diagonal: false,
      vertical: false,
      horizontal: false,
      corners: false,
      full: false,
    });
    set(ref(db, "letterStates"), {});
    //set(ref(db, "ultimoNumero"), null);
    set(ref(db, "ultimoNumero"), { letra: "L", numero: 0 });
    set(ref(db, "historialNumeros"), []);
    set(ref(db, "selectedLetter"), null);

    // Limpiar estados locales con un pequeño delay para esperar a que Firebase termine
    setTimeout(() => {
      setNumerosMarcados([]);
      setclassicPatternStates({
        diagonal: false,
        vertical: false,
        horizontal: false,
        corners: false,
        full: false,
      });
      setSelectedLetter(null);
      setLetterStates({});
      //setUltimoNumero(null);
      setUltimoNumero({ letra: "L", numero: 0 });
      setHistorial([]);
      setSelectedLetter(null);
    }, 300); // Espera 300ms (puedes ajustar)

    set(ref(db, "reinicio"), Date.now());
  };

  return (
    <div className="host">
      <div className="grid">
        {/* Columna izquierda */}
        <div>
          <BingoGrid
            numerosMarcados={numerosMarcados}
            toggleNumero={selectedLetter ? toggleNumero : () => {}}
            rol={rol}
          />
        </div>

        {/* Columna derecha central */}
        <div>
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
              rol={rol}
            />
          </div>

          <div>
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
