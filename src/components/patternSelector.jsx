import ClassicPatterns from "./ClassicPatterns.jsx";
import LetterPattern from "./letterPattern.jsx";
import LetterSelector from "./letterSelector.jsx";

const PatternSelector = ({
  patternStates,
  setPatternStates,
  selectedLetter,
  setSelectedLetter,
  letterStates,
  setLetterStates,
  rol,
}) => {
  return (
    <div>
      <div className="pattern-selector">
        <ClassicPatterns
          patternStates={patternStates}
          setPatternStates={setPatternStates}
          rol={rol}
        />

        {selectedLetter ? (
          <LetterPattern
            selectedLetter={selectedLetter}
            letterStates={letterStates}
            setLetterStates={setLetterStates}
            rol={rol}
          />
        ) : (
          <p style={{ color: "gray" }}>
            Selecciona una letra para ver el patrón.
          </p>
        )}
      </div>

      <div style={{ marginTop: "5rem" }}>
        <LetterSelector
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          rol={rol}
        />
      </div>
    </div>
  );
};

export default PatternSelector;
