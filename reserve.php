<?php
// Connexion à la base de données
$host = '127.0.0.1'; // Adresse du serveur
$db = 'workshop3'; // Nom de ta base de données
$user = 'herbier'; // Utilisateur de la base de données
$pass = 'epsi'; // Mot de passe de la base de données
$charset = 'utf8mb4';

// Créer une connexion PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
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
