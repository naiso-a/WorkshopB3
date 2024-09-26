import React, { useEffect, useState } from 'react';
import './style.css'; // Assurez-vous d'importer le fichier CSS
import Calendrier from './Calendrier'; // Importer le calendrier

const ProduitList = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduitId, setSelectedProduitId] = useState(null); // Ajoutez cet état pour le produit sélectionné

  useEffect(() => {
    fetch('http://localhost/WorkshopB3/index.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setProduits(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="produit-list-container">
      <div className="header-container">
        <h1>Liste des Produits</h1>
      </div>

      <div className="table-container">
        <table className="produit-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Type</th>
              <th>Quantité</th>
              <th>Désignation</th>
              <th>Commentaire</th>
              <th>Emplacement</th>
              <th>Date d'Achat</th>
              <th>Référence</th>
              <th>Photo</th>
              <th>Disponibilité</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.Id}>
                <td>{produit.Id}</td>
                <td>{produit.Nom}</td>
                <td>{produit.Type}</td>
                <td>{produit.Quantite}</td>
                <td>{produit.Designation}</td>
                <td>{produit.Commentaire}</td>
                <td>{produit.Emplacement}</td>
                <td>{produit.DateAchat}</td>
                <td>{produit.Reference}</td>
                <td>{produit.Photo}</td>
                <td>{produit.Disponibilité ? 'Disponible' : 'Non disponible'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage du calendrier seulement si un produit est sélectionné */}
      <div className="calendar-container">
        {selectedProduitId && <Calendrier produitId={selectedProduitId} />}
      </div>
    </div>
  );
};

export default ProduitList;
