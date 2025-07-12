// components/LetterSelector.jsx
import React from "react";

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
      <label htmlFor="letra-select">
        Antes de inicar selecciona una letra:{" "}
      </label>
      <select
        id="letra-select"
        value={selectedLetter || ""}
        onChange={(e) => setSelectedLetter(e.target.value)}
        required
      >
        <option value="" disabled hidden>
          -- Elegí una letra --
        </option>
        {todasLasLetras.map((letra) => (
          <option key={letra} value={letra}>
            {letra}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LetterSelector;
