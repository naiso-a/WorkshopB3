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

header('Content-Type: application/json'); // Spécifie que la réponse est au format JSON
header("Access-Control-Allow-Origin: *"); // Permet toutes les origines
header("Access-Control-Allow-Headers: Content-Type"); // Permet les en-têtes nécessaires

try {
    // Création de la connexion PDO
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête pour récupérer les données de la table produit
    $stmtProduits = $pdo->query("SELECT * FROM produit");

    // Récupérer les résultats
    $produits = $stmtProduits->fetchAll(PDO::FETCH_ASSOC);

    // Vérifie si des données ont été récupérées
    if (empty($produits)) {
        echo json_encode(["message" => "Aucun produit trouvé"]);
    } else {
        echo json_encode($produits);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]);
}
?>
