//import { useState } from "react";
import React from "react";
import Home from "./views/home.jsx";
import Host from "./views/host.jsx";
import Viewer from "./views/viewer.jsx";
import Card from "./views/card.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
     <Route path="/home" element={<Home />} />
      <Route path="/host" element={<Host />} />
      <Route path="/viewer" element={<Viewer />} />
      <Route path="/card" element={<Card />} />
    </Routes>
  )
}
export default App;
