import "../assets/styles/pattern.css";
import React from "react";

// Importar todas las imágenes verdes y rojas con vite import.meta.glob
const classicImages = import.meta.glob("../assets/images/classic/*-GREEN.png", {
  eager: true,
  import: "default",
});

const classicRedImages = import.meta.glob(
  "../assets/images/classic/*-RED.png",
  {
    eager: true,
    import: "default",
  }
);

// Función para extraer los patrones de las imágenes
const parseClassic = (images) => {
  const map = {};
  Object.entries(images).forEach(([path, module]) => {
    const match = path.match(
      /\/(diagonal|corners|horizontal|vertical|full)-(GREEN|RED)\.png$/i
    );
    if (match) {
      const key = match[1].toLowerCase(); // usa el nombre del patrón como clave
      map[key] = module;
    }
  });
  return map;
};

const greenClassic = parseClassic(classicImages);
const redClassic = parseClassic(classicRedImages);

// Definir el orden deseado de los patrones
const ordenDeseado = ["diagonal", "corners", "horizontal", "vertical", "full"];

const patterns = ordenDeseado
  .map((id) => ({
    id,
    alt: `Patrón ${id}`,
    green: greenClassic[id],
    red: redClassic[id],
  }))
  .filter((p) => p.green && p.red);

function ClassicPatterns({ patternStates, setPatternStates, rol }) {
  const togglePattern = (id) => {
    if (rol !== "host") return;
    setPatternStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="pattern-selector">
      {patterns.map((pattern) => {
        const isRed = patternStates[pattern.id];
        return (
          <img
            key={pattern.id}
            src={isRed ? pattern.red : pattern.green}
            alt={pattern.alt}
            onClick={(e) => {
              e.stopPropagation(); // Previene que el click se propague a elementos padres
              togglePattern(pattern.id);
            }}
            className={`pattern-image ${rol === "host" ? "host" : ""} ${
              isRed ? "marked" : ""
            }`}
            style={{
              cursor: rol === "host" ? "pointer" : "default",
              userSelect: "none",
            }}
          />
        );
      })}
    </div>
  );
}

export default ClassicPatterns;
