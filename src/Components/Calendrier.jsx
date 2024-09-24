import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importez le style du calendrier
import './Calendrier.css'; // Importez le fichier CSS personnalisé

const Calendrier = () => {
  const [date, setDate] = useState(new Date());

  // Plages horaires fixes
  const horairesFixes = ["08:00 - 14:00", "14:00 - 18:00", "18:00 - 00:00"];

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log("Date sélectionnée :", newDate);
  };

  // Fonction pour réserver un créneau
  const handleReservation = (horaire) => {
    alert(`Créneau ${horaire} réservé pour le ${date.toDateString()} !`);
  };

  return (
    <div className="calendrier-container">
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
          {horairesFixes.map((horaire, index) => (
            <li key={index}>
              {horaire}
              <button
                className="reservation-btn"
                onClick={() => handleReservation(horaire)}
              >
                Réserver
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendrier;
