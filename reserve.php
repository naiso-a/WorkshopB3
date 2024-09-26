<?php
require 'vendor/autoload.php'; // Assurez-vous que cette ligne charge Composer

// Charge les variables d'environnement
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Connexion à la base de données
$host = $_ENV['DB_HOST'];
$db   = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$pass = $_ENV['DB_PASSWORD'];
$port = $_ENV['DB_PORT'];
$charset = 'utf8mb4';

// Créer une connexion PDO
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Supposons que tu as une connexion PDO à ta base de données
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Prépare la requête SQL d'insertion
    $stmt = $pdo->prepare("INSERT INTO reservation (Date_Reservation, Date_Debut, Date_Fin, Statut, Produit_Id) VALUES (?, ?, ?, ?, ?)");
    
    // Exécute la requête
    if ($stmt->execute([$data['Date_Reservation'], $data['Date_Debut'], $data['Date_Fin'], $data['Statut'], $data['Produit_Id']])) {
        echo json_encode(['message' => 'Réservation créée avec succès']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Erreur lors de la création de la réservation']);
    }
}
?>