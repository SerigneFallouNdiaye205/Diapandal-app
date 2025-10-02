import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css"; // CSS global

import Localisation from "./Localisation";
import Identification from "./Identification";
import Inscription from "./Inscription";
import Acceuil from "./Acceuil";
import Horaires from "./Horaires";
import Pointsdinterets from "./Pointsdinterets";
import Notifications from "./Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/Localisation" element={<Localisation />} />
        <Route path="/Horaires" element={<Horaires />} />
        <Route path="/Pointsdinterets" element={<Pointsdinterets />} />
        <Route path="/Identification" element={<Identification />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;