import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importez le style du calendrier
import './Calendrier.css'; // Importez le fichier CSS personnalisé

const CalendrierObjet = () => {
  const [date, setDate] = useState(new Date());
  const [horairesFixes] = useState(["08:00 - 14:00", "14:00 - 18:00", "18:00 - 00:00"]);
  const [produits, setProduits] = useState([]);
  const [produitReserve, setProduitReserve] = useState(null); // Produit sélectionné pour la réservation
  const [showProduitDropdown, setShowProduitDropdown] = useState(false); // État pour afficher la liste déroulante
  const [selectedHoraire, setSelectedHoraire] = useState(null); // État pour stocker l'horaire sélectionné
  const [reservations, setReservations] = useState([]); // État pour stocker les réservations du produit

  // Charger les produits disponibles depuis la base de données
  useEffect(() => {
    fetch('http://localhost/WorkshopB3/index.php') // URL à modifier selon tes besoins
      .then(response => response.json())
      .then(data => {
        // Filtrer les produits pour ceux qui sont disponibles
        const produitsDisponibles = data.filter(produit => produit.Disponibilité && produit.Categorie == 0);
        setProduits(produitsDisponibles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  }, []);

  // Charger les réservations du produit sélectionné
  useEffect(() => {
    if (produitReserve) {
      fetch(`http://localhost:3001/reservations/${produitReserve.Id}`) // Remplacez par l'URL appropriée
        .then(response => response.json())
        .then(data => {
          setReservations(data); // Mettez à jour les réservations pour le produit
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des réservations :', error);
        });
    }
  }, [produitReserve]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log("Date sélectionnée :", newDate);
  };

  // Fonction pour afficher la liste déroulante des produits
  const handleReservationClick = (horaire) => {
    setShowProduitDropdown(true);
    setSelectedHoraire(horaire); // Stocke l'horaire sélectionné
  };

  // Fonction pour réserver un créneau
  const handleReservation = () => {
    if (!produitReserve) {
      alert("Veuillez sélectionner un produit à réserver.");
      return;
    }

    // Créez les dates de début et de fin en fonction de la date et de l'horaire
    const [heureDebut, heureFin] = selectedHoraire.split(" - ");
    const dateDebut = new Date(date);
    const dateFin = new Date(date);
    
    dateDebut.setHours(...heureDebut.split(":"));
    dateFin.setHours(...heureFin.split(":"));

    // Prépare les données pour l'envoi à la base de données
    const reservationData = {
      Date_Reservation: date.toISOString().split('T')[0], // Format de date YYYY-MM-DD
      Date_Debut: dateDebut.toISOString().slice(0, 19).replace('T', ' '), // Format datetime YYYY-MM-DD HH:MM:SS
      Date_Fin: dateFin.toISOString().slice(0, 19).replace('T', ' '), // Format datetime YYYY-MM-DD HH:MM:SS
      Statut: 'Réservé', // Statut par défaut de la réservation
      Produit_Id: produitReserve.Id,
    };

    // Envoie une requête POST pour enregistrer la réservation
    fetch('http://localhost:3001/reserve', { // URL à adapter à ton endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la réservation');
        }
        return response.json();
      })
      .then(data => {
        alert(`Créneau ${selectedHoraire} réservé pour le ${date.toDateString()} pour le produit ${produitReserve.Nom} !`);
        console.log('Réservation réussie :', data);
        // Réinitialiser l'état après la réservation
        setProduitReserve(null);
        setShowProduitDropdown(false);
      })
      .catch(error => {
        console.error('Erreur lors de la réservation :', error);
        alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
      });
  };

  // Filtrer les horaires disponibles en fonction des réservations
  const horairesDisponibles = horairesFixes.filter(horaire => {
    const [heureDebut] = horaire.split(" - ");
    const dateDebut = new Date(date);
    dateDebut.setHours(...heureDebut.split(":"));

    // Vérifier si l'horaire est réservé
    return !reservations.some(reservation => {
      const reservationDebut = new Date(reservation.Date_Debut);
      const reservationFin = new Date(reservation.Date_Fin);
      return dateDebut >= reservationDebut && dateDebut < reservationFin;
    });
  });

  return (
    <div className="calendrier-page">
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/reserver-machine">Réserver une machine</a></li>
          <li><a href="/reserver-objet">Réserver des objets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="logout-btn">Déconnexion</button>
      </nav>

      <div className="calendrier-container">
        <div className="sidebar">
          <h3>Produits Disponibles</h3>
          <ul>
            {produits.map((produit) => (
              <li key={produit.Id} onClick={() => setProduitReserve(produit)}>
                {produit.Nom}
              </li>
            ))}
          </ul>
        </div>

        <div className="calendar-section">
          <h2>Calendrier</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="my-calendar"
          />
          <div>
            <p>Date sélectionnée : {date.toDateString()}</p>
          </div>
          
          <div>
            <h3>Plages horaires disponibles :</h3>
            <ul>
              {horairesDisponibles.map((horaire, index) => (
                <li key={index}>
                  {horaire}
                  <button
                    className="reservation-btn"
                    onClick={() => handleReservationClick(horaire)} // Passe le horaire à la fonction de réservation
                  >
                    Réserver
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Affichage du produit réservé */}
          {produitReserve && (
            <div>
              <h4>Produit réservé : {produitReserve.Nom}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendrierObjet;
