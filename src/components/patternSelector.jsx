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
        <LetterSelector
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          rol={rol}
        />
      </div>
      <p>La letra que se esta jugando es:</p>
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
  );
};

export default PatternSelector;
