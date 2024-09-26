import React from 'react';
import './Accueil.css'; // Fichier CSS pour la mise en page
import { useNavigate } from 'react-router-dom'; 
import machineImage from '../assets/images/machineexemple.jpeg'; // Chemin vers l'image de la machine
import objetImage from '../assets/images/objetexemple.jpg'; // Chemin vers l'image de l'objet
import MyDilLogo from '../assets/images/MyDIL-Logo-CMJN.png'; // Chemin vers le logo du MyDil

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
    <div className="accueil-page">
      
      <nav className="navbar">
        <div class name="logo">
          <img src={MyDilLogo} alt="Logo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/calendrier">Réserver une machine</a></li>
          <li><a href="/calendrier-objet">Réserver des objets</a></li>
          <li><a href="/aide">Aide</a></li>
        </ul>
      </nav>

      {/* Contenu de la page d'accueil */}
      <div className="accueil-container">
        <h1 className="accueil-title">Bienvenue sur le système de réservation de materiel au MyDil</h1>
        <div className="accueil-options">
          <div className="accueil-option-block">
            <img src={machineImage} alt="Réserver une machine" className="accueil-option-image" />
            <h2>Réserver une machine</h2>
            <button className="accueil-button" onClick={handleReserveMachine}>Réserver</button>
          </div>
          <div className="accueil-option-block">
            <img src={objetImage} alt="Réserver des objets" className="accueil-option-image" />
            <h2>Réserver des objets</h2>
            <button className="accueil-button" onClick={handleReserveObjet}>Réserver</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
