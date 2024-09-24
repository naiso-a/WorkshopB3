import React from 'react';
import './Accueil.css'; // Fichier CSS pour la mise en page

const Accueil = () => {
  return (
    <div>
      {/* Barre de navigation */}
      <nav className="navbar">
        <ul>
          <li><a href="#home">Accueil</a></li>
          <li><a href="#machines">Réserver une machine</a></li>
          <li><a href="#objets">Réserver des objets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Contenu de la page d'accueil */}
      <div className="container">
        <h1>Bienvenue sur la page d'accueil</h1>
        <div className="options">
          <div className="option-block">
            <h2>Réserver une machine</h2>
            <button>Réserver</button>
          </div>
          <div className="option-block">
            <h2>Réserver des objets</h2>
            <button>Réserver</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
