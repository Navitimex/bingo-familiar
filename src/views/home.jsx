import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleHost = () => {
    navigate("/host");
  };
  const handleViewer = () => {
    navigate("/viewer");
  };
  return (
    <div className="home">
      <h1>Bingo Artavia 🎉</h1>
      <p>¡Bienvenido al juego de Bingo Familiar!</p>
      El anfitrión será quien marque los números y los espectadores seguirán el
      juego en tiempo real.
      <p>Por favor, elige tu rol para comenzar:</p>
      <button onClick={handleHost}>🎤 Iniciar como anfitrión</button>
      <button onClick={handleViewer}>👀 Unirse como espectador</button>
      <p>¡Que gane el mejor! 🍀</p>
    </div>
  );
};

export default Home;
