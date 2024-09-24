import React from 'react';
import './Accueil.css'; // On réutilise le même fichier CSS
import machineImage from '../assets/images/machineexemple.jpeg'; // Chemin vers l'image de la machine

const ChooseMachine = () => {
  return (
    <div>
      {/* Barre de navigation */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#home">Accueil</a></li>
          <li><a href="#machines">Réserver une machine</a></li>
          <li><a href="#objets">Réserver des objets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="logout-btn">Déconnexion</button>
      </nav>

      {/* Contenu de la page de réservation des machines */}
      <div className="container">
        <h1>Réservation de machines</h1>
        <div className="reservation-details">
          <img src={machineImage} alt="Réserver une machine" className="option-image" />
          <h2>Réservez ici la machine que vous souhaitez utiliser</h2>
          {/* Ajouter des champs ou des options de réservation ici */}
        </div>
      </div>
    </div>
  );
};

export default ChooseMachine;
