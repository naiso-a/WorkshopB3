<?php
require 'vendor/autoload.php'; // Assurez-vous que le chemin est correct

// Charger les variables d'environnement
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Configuration de la connexion à la base de données
$host = $_ENV['DB_HOST'];
$db   = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$pass = $_ENV['DB_PASSWORD'];
$port = $_ENV['DB_PORT'];

try {
    // Création de la connexion PDO
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête pour récupérer les tables de la base de données
    $stmt = $pdo->query("SHOW TABLES");
    
    // Affichage des résultats des tables
    echo "<h1>Tables de la base de données '$db'</h1>";
    echo "<ul>";
    
    while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
        echo "<li>" . htmlspecialchars($row[0]) . "</li>";
    }
    
    echo "</ul>";

    // Requête pour récupérer les données de la table produit
    $stmtProduits = $pdo->query("SELECT * FROM produit"); // Assurez-vous que 'produit' est le nom de votre table

    // Affichage des résultats des produits
    echo "<h1>Données de la table 'produit'</h1>";
    echo "<table border='1'>";
    echo "<tr>
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
          </tr>";

    while ($produit = $stmtProduits->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($produit['Id']) . "</td>"; // ID
        echo "<td>" . htmlspecialchars($produit['Nom']) . "</td>"; // Nom
        echo "<td>" . htmlspecialchars($produit['Type']) . "</td>"; // Type
        echo "<td>" . htmlspecialchars($produit['Quantite']) . "</td>"; // Quantité
        echo "<td>" . htmlspecialchars($produit['Designation']) . "</td>"; // Désignation
        echo "<td>" . htmlspecialchars($produit['Commentaire']) . "</td>"; // Commentaire
        echo "<td>" . htmlspecialchars($produit['Emplacement']) . "</td>"; // Emplacement
        echo "<td>" . htmlspecialchars($produit['DateAchat']) . "</td>"; // Date d'achat
        echo "<td>" . htmlspecialchars($produit['Reference']) . "</td>"; // Référence
        echo "<td>" . htmlspecialchars($produit['Photo']) . "</td>"; // Photo
        echo "<td>" . htmlspecialchars($produit['Disponibilité']) . "</td>"; // Disponibilité
        echo "</tr>";
    }
    
    echo "</table>";
    
} catch (PDOException $e) {
    // Gestion des erreurs
    echo "Erreur de connexion : " . htmlspecialchars($e->getMessage());
}
?>
