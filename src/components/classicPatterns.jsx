import "../assets/styles/pattern.css";

// Importar todas las imágenes verdes y rojas con vite import.meta.glob
const classicImages = import.meta.glob('../assets/images/classic/*-GREEN.png', {
  eager: true,
  import: 'default',
});

const classicRedImages = import.meta.glob('../assets/images/classic/*-RED.png', {
  eager: true,
  import: 'default',
});

// Función para convertir los imports en un objeto { A: img, B: img, ... }
const parseClassic = (images) => {
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

const greenClassic = parseClassic(classicImages);
const redClassic = parseClassic(classicRedImages);

// Si quieres, puedes construir aquí el array ordenado o hacerlo afuera y pasarlo como prop.
const ordenDeseado = ['D', 'C', 'H', 'V', 'F', 'A'];

const patterns = ordenDeseado
  .map((letra) => ({
    id: letra,
    alt: `Letra ${letra}`,
    green: greenClassic[letra],
    red: redClassic[letra],
  }))
  .filter((p) => p.green && p.red); // filtrar solo los que existan

function ClassicPatterns({ patternStates, setPatternStates, rol }) {
  const togglePattern = (id) => {
    if (rol !== 'host') return;
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
            onClick={() => togglePattern(pattern.id)}
            className={`pattern-image ${rol === 'host' ? 'host' : ''} ${isRed ? 'marked' : ''}`}
          />
        );
      })}
    </div>
  );
}

export default ClassicPatterns;
