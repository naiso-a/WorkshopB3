import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importation du Router
import Accueil from './Components/Accueil';
import ChooseMachine from './Components/ChooseMachine';
import ChooseObjet from './Components/ChooseObjet';
import Calendrier from './Components/Calendrier'; // Importation du Calendrier
import ProduitList from './Components/ProduitList'; // Importation de ProduitList

const App = () => {
  return (
    <Router> {/* Encapsuler l'application dans un Router */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reserver-machine" element={<ChooseMachine />} />
        <Route path="/reserver-objet" element={<ChooseObjet />} />
        <Route path="/calendrier" element={<Calendrier />} /> {/* Ajout de la route pour le calendrier */}
        <Route path="/produits" element={<ProduitList />} /> {/* Ajout de la route pour la liste des produits */}
      </Routes>
    </Router>
  );
};

export default App;
