import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import PatternSelector from "../components/patternSelector.jsx";
import BingoGrid from "../components/bingoGrid.jsx";
import LastNumber from "../components/lastNumber.jsx";
import { ref, onValue } from "firebase/database";

const Viewer = () => {
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

  const [letterStates, setLetterStates] = useState({});
  const [selectedLetter, setSelectedLetter] = useState(null);

  const navigate = useNavigate();

  // Escuchar números marcados
  useEffect(() => {
    const numerosRef = ref(db, "numerosMarcados");
    const unsubscribe = onValue(numerosRef, (snapshot) => {
      const datos = snapshot.val();
      setNumerosMarcados(datos || []);
    });
    return () => unsubscribe();
  }, []);

  // Escuchar último número
  useEffect(() => {
    const ultimoRef = ref(db, "ultimoNumero");
    const unsubscribe = onValue(ultimoRef, (snapshot) => {
      const data = snapshot.val();
      setUltimoNumero(data || { letra: "L", numero: 0 });
    });
    return () => unsubscribe();
  }, []);

  // Escuchar historial números
  useEffect(() => {
    const historialRef = ref(db, "historialNumeros");
    const unsubscribe = onValue(historialRef, (snapshot) => {
      const data = snapshot.val();
      setHistorial(data || []);
    });
    return () => unsubscribe();
  }, []);

  // Escuchar patrones clásicos
  useEffect(() => {
    const classicRef = ref(db, "classicPatternStates");
    const unsubscribe = onValue(classicRef, (snapshot) => {
      const data = snapshot.val();
      setClassicPatternStates(
        data || {
          diagonal: false,
          vertical: false,
          horizontal: false,
          corners: false,
          full: false,
        }
      );
    });
    return () => unsubscribe();
  }, []);

  // Escuchar estados de letras
  useEffect(() => {
    const letterRef = ref(db, "letterStates");
    const unsubscribe = onValue(letterRef, (snapshot) => {
      const data = snapshot.val();
      setLetterStates(data || {});
    });
    return () => unsubscribe();
  }, []);

  // Escuchar letra seleccionada
  useEffect(() => {
    const letraRef = ref(db, "selectedLetter");
    const unsubscribe = onValue(letraRef, (snapshot) => {
      const data = snapshot.val();
      setSelectedLetter(data);
    });
    return () => unsubscribe();
  }, []);

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className="viewer-layout">
      <div className="bingo-card">
        <div className="bingo-grid-wrapper">
          <BingoGrid
            numerosMarcados={numerosMarcados}
            rol="viewer"
            toggleNumero={() => {}} // No hace nada en viewer
          />
        </div>
      </div>

      <div className="viewer-sidebar">
        <div className="last-number-card">
          <h2>Último número</h2>
          <LastNumber
            letra={ultimoNumero.letra}
            numero={ultimoNumero.numero}
            historial={historial}
          />
        </div>
        <div className="pattern-selector-card">
          <h2>Patrones</h2>
          <PatternSelector
            classicPatternStates={classicPatternStates}
            setClassicPatternStates={() => {}}
            letterStates={letterStates}
            setLetterStates={() => {}}
            selectedLetter={selectedLetter}
            setSelectedLetter={() => {}}
            rol="viewer"
          />

          <div style={{ marginTop: "20px" }}>
            <button className="home-buttom" onClick={handleHome}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
