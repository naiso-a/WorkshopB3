import React from 'react';
import './Accueil.css'; 
import objetImage from '../assets/images/objetexemple.jpg'; // Chemin vers l'image de la machine

const Chooseobjet = () => {
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
        <h1>Réservation d'objet</h1>
        <div className="reservation-details">
          <img src={objetImage} alt="Réserver un Objet" className="option-image" />
          <h2>Réservez ici l'objet que vous souhaitez utiliser</h2>
        </div>
      </div>
    </div>
  );
};

export default Chooseobjet;
