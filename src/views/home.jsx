import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import db from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const [mostrarPinModal, setMostrarPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const handleRolChange = (rol) => {
    localStorage.setItem("rol", rol);
    navigate(`/${rol}`);
  };

  const verificarPin = () => {
    if (pinInput === "2025") {
      // Guardar autenticación en Firebase
      set(ref(db, "hostAutenticado"), {
        autenticado: true,
        timestamp: Date.now(),
      });

      setPinError(false);
      setMostrarPinModal(false);
      localStorage.setItem("rol", "host");
      navigate("/host");
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="home">
      <div className="home-card">
        <h1> Bingo Familiar </h1>
        <p>
          El anfitrión será quien marque los números y los espectadores seguirán
          el juego en tiempo real.
        </p>
        <p>Por favor, elige tu rol para comenzar:</p>
        <button
          className="home-buttom"
          onClick={() => setMostrarPinModal(true)}
        >
          🎤 Anfitrión
        </button>

        <button
          className="home-buttom"
          onClick={() => handleRolChange("viewer")}
        >
          👀 Espectador
        </button>
      </div>

      {mostrarPinModal && (
        <div className="home-card">
          <p>🔐 Ingresar PIN de Anfitrión</p>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN"
            maxLength={4}
          />
          {pinError && (
            <p className="error-message">
              PIN incorrecto
            </p>
          )}
          <div className="modal-button-group">
            <button className="modal-button" onClick={verificarPin}>
              Acceder
            </button>
            <button
              className="modal-button"
              onClick={() => setMostrarPinModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
