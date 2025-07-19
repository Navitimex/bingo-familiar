// components/LetterSelector.jsx
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const todasLasLetras = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const LetterSelector = ({ selectedLetter, setSelectedLetter, rol }) => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (rol === "host" && !selectedLetter) {
      setShowModal(true);
    }
  }, [rol, selectedLetter]);

  const handleHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const handleSelectChange = (e) => {
    const letra = e.target.value;
    setSelectedLetter(letra);
    if (letra) {
      setShowModal(false); // ⬅️ Cierra el modal al seleccionar
    }
  };

  if (rol !== "host" || !showModal) return null;


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
            onChange={handleSelectChange}
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