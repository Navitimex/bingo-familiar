import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleRolChange = (rol) => {
    localStorage.setItem("rol", rol);
    navigate(`/${rol}`);
  };

  return (
    <div className="home">
      <div>
        <h1> Bingo Familiar </h1>
        <p>
          El anfitrión será quien marque los números y los espectadores seguirán
          el juego en tiempo real.
        </p>
        <p>
          Por favor, elige tu rol para comenzar:
        </p>
        <button className="home-buttom" onClick={() => handleRolChange("host")}>
          🎤 Anfitrión
        </button>
        <button className="home-buttom" onClick={() => handleRolChange("viewer")}>
          👀 Espectador
        </button>
      </div>
    </div>
  );
};

export default Home;
