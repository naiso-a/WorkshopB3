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

    // Vérifier si c'est une requête POST pour ajouter une réservation
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['produitId']) && isset($_POST['date']) && isset($_POST['horaireDebut']) && isset($_POST['horaireFin'])) {
        $produitId = $_POST['produitId'];
        $dateReservation = $_POST['date'];
        $dateDebut = $dateReservation . ' ' . $_POST['horaireDebut'];
        $dateFin = $dateReservation . ' ' . $_POST['horaireFin'];
        $statut = "Réservé"; // Par défaut

        // Insérer la réservation dans la table reservations
        $stmt = $pdo->prepare("INSERT INTO reservation (Produit_Id, Date_Reservation, Date_Debut, Date_Fin, Statut) VALUES (:produitId, :dateReservation, :dateDebut, :dateFin, :statut)");
        $stmt->execute([
            ':produitId' => $produitId,
            ':dateReservation' => $dateReservation,
            ':dateDebut' => $dateDebut,
            ':dateFin' => $dateFin,
            ':statut' => $statut
        ]);

        echo json_encode(['message' => 'Réservation enregistrée avec succès']);
        exit;
    }

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
