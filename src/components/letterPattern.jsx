// components/LetterPatterns.jsx
import "../assets/styles/pattern.css";
import { ref, set } from "firebase/database";
import db from "../firebase";

// Cargar todas las imágenes en la carpeta letters automáticamente
const letterImages = import.meta.glob("../assets/images/letters/*-GREEN.png", {
  eager: true,
  import: "default",
});

const letterRedImages = import.meta.glob("../assets/images/letters/*-RED.png", {
  eager: true,
  import: "default",
});

// Extraer solo la letra de los nombres, ej: "A-GREEN.png" => "A"
const parseLetters = (images) => {
  const map = {};
  Object.entries(images).forEach(([path, module]) => {
    const match = path.match(/\/([A-ZÑ])-(GREEN|RED)\.png$/i);
    if (match) {
      const letra = match[1].toUpperCase();
      map[letra] = module;
    }
  });
  return map;
};

const greenLetters = parseLetters(letterImages);
const redLetters = parseLetters(letterRedImages);

function LetterPatterns({
  selectedLetter,
  letterStates,
  setLetterStates,
  rol,
}) {
  if (!selectedLetter) return <div>Seleccione una letra para mostrar</div>;

  const isRed = letterStates[selectedLetter];
  const greenSrc = greenLetters[selectedLetter];
  const redSrc = redLetters[selectedLetter];

  if (!greenSrc || !redSrc) return <div>Imagen no encontrada</div>;

const toggleLetter = () => {
  if (rol !== 'host') return;

  setLetterStates((prev) => {
    const updated = {
      ...prev,
      [selectedLetter]: !prev[selectedLetter],
    };

    // ✅ Guardar en Firebase
    set(ref(db, "letterStates"), updated);

    return updated;
  });
};


  return (
    <div className="pattern-selector">
      <img
        src={isRed ? redSrc : greenSrc}
        alt={`Letra ${selectedLetter}`}
        className={`pattern-image ${isRed ? "marked" : ""} ${
          rol === "host" ? "host" : ""
        }`}
        onClick={toggleLetter}
      />
    </div>
  );
}

export default LetterPatterns;
