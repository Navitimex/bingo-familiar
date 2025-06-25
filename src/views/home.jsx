import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleRolChange = (rol) => {
    localStorage.setItem("rol", rol);
    navigate(`/${rol}`);
  };

  return (
      <div className="home">
        <h1>Bingo Familiar 🎉</h1>
        El anfitrión será quien marque los números y los espectadores seguirán
        el juego en tiempo real.
        <p>Por favor, elige tu rol para comenzar:</p>
        <button onClick={() => handleRolChange("host")}>🎤 Anfitrión</button>
        <button onClick={() => handleRolChange("viewer")}>👀 Espectador</button>
      </div>
    );
};

export default Home;
