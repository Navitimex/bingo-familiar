// components/LetterSelector.jsx
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const todasLasLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


const LetterSelector = ({ selectedLetter, setSelectedLetter, rol }) => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (rol === "host" && !selectedLetter) {
      setShowModal(true);
    }
  }, [rol, selectedLetter]);

  const handlePlay = () => {
    if (selectedLetter) {
      console.log("Letra seleccionada:", selectedLetter);
      setShowModal(false); // cierra el modal
    }
  }

  const handleHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  if (rol !== "host") return null;

  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div className="modal-overlay">
        <div className="modal-card">
          <p>🔠Seleccione una letra: </p>
          <select
            id="letra-select"
            value={selectedLetter || ""}
            onChange={(e) => setSelectedLetter(e.target.value)}
            required
          >
            <option
              value="" disabled hidden>
              -Seleccione una letra-
            </option>
            {todasLasLetras.map((letra) => (
              <option key={letra} value={letra}>
                {letra}
              </option>
            ))}
          </select>
          <div className="modal-button-group">
            <button className="modal-button" onClick={handlePlay}>
              Jugar
            </button>
            <button
              className="modal-button" onClick={handleHome}>
              Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterSelector;
