import React, { useEffect, useState } from 'react';
import './ProduitList.css'; // Assurez-vous d'importer le fichier CSS
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
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div>
      <h1>Liste des Produits</h1>
      <table>
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

      {/* Affichage du calendrier seulement si un produit est sélectionné */}
      {selectedProduitId && <Calendrier produitId={selectedProduitId} />}
    </div>
  );
};

export default ProduitList;
