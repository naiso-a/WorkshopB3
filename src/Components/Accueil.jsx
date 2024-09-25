import React from 'react';
import './Accueil.css'; // Fichier CSS pour la mise en page
import { useNavigate } from 'react-router-dom'; 
import machineImage from '../assets/images/machineexemple.jpeg'; // Chemin vers l'image de la machine
import objetImage from '../assets/images/objetexemple.jpg'; // Chemin vers l'image de l'objet

const Accueil = () => {
  const navigate = useNavigate(); // Appel du hook useNavigate au niveau du composant

  // Gestionnaire de redirection vers la page de réservation de machine
  const handleReserveMachine = () => {
    navigate('/calendrier');
  };

  // Gestionnaire de redirection vers la page de réservation d'objets
  const handleReserveObjet = () => {
    navigate('/calendrier-objet');
  };

  return (
    <div>
      {/* Barre de navigation */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/reserver-machine">Réserver une machine</a></li>
          <li><a href="/reserver-objet">Réserver des objets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="logout-btn">Déconnexion</button>
      </nav>

      {/* Contenu de la page d'accueil */}
      <div className="container">
        <h1>Bienvenue sur le système de réservation de materiel au MyDil</h1>
        <div className="options">
          <div className="option-block">
            <img src={machineImage} alt="Réserver une machine" className="option-image" />
            <h2>Réserver une machine</h2>
            <button onClick={handleReserveMachine}>Réserver</button>
          </div>
          <div className="option-block">
            <img src={objetImage} alt="Réserver des objets" className="option-image" />
            <h2>Réserver des objets</h2>
            <button onClick={handleReserveObjet}>Réserver</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
