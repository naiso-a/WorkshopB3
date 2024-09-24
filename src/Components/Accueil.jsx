import React from 'react';
import './Accueil.css'; // Fichier CSS pour la mise en page
import machineImage from './Source/R.e6815ee5beb2573b5ce9b0fb94257df5.jpeg'; // Chemin vers l'image de la machine
import objetImage from './Source/xDsz8WEEga8MW3q87iBvMX.jpg'; // Chemin vers l'image de l'objet

const Accueil = () => {
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

      {/* Contenu de la page d'accueil */}
      <div className="container">
        <h1>Bienvenue sur le système de réservation de materiel au MyDil
        </h1>
        <div className="options">
          <div className="option-block">
            <img src={machineImage} alt="Réserver une machine" className="option-image" />
            <h2>Réserver une machine</h2>
            <button>Réserver</button>
          </div>
          <div className="option-block">
            <img src={objetImage} alt="Réserver des objets" className="option-image" />
            <h2>Réserver des objets</h2>
            <button>Réserver</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
