import ClassicPatterns from "./ClassicPatterns.jsx";
import LetterPattern from "./letterPattern.jsx";
import LetterSelector from "./letterSelector.jsx";
import placeholderImg from "../assets/images/letters/PLACEHOLDER.png";

const PatternSelector = ({
  classicPatternStates,
  setClassicPatternStates,
  letterStates,
  setLetterStates,
  selectedLetter,
  setSelectedLetter,
  rol,
}) => {
  return (
    <div>
      <div>
        <ClassicPatterns
          patternStates={classicPatternStates}
          setPatternStates={selectedLetter ? setClassicPatternStates : () => {}}
          rol={rol}
        />
        <div style={{ marginTop: "2rem" }}>
          <LetterSelector
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
            rol={rol}
          />
        </div>
        <h2>La letra que se esta jugando es:</h2>

        {selectedLetter ? (
          <LetterPattern
            key={selectedLetter}
            selectedLetter={selectedLetter}
            letterStates={letterStates}
            setLetterStates={setLetterStates}
            rol={rol}
          />
        ) : (
          <div className="pattern-selector">
            <img
              src={placeholderImg}
              alt="Selecciona una letra"
              className="pattern-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternSelector;
