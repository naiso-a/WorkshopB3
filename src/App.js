import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importation du Router
import Accueil from './Components/Accueil';
import ChooseMachine from './Components/ChooseMachine';
import ChooseObjet from './Components/ChooseObjet';

const App = () => {
  return (
    <Router> {/* Encapsuler l'application dans un Router */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reserver-machine" element={<ChooseMachine />} />
        <Route path="/reserver-objet" element={<ChooseObjet />} />
      </Routes>
    </Router>
  );
};

export default App;
