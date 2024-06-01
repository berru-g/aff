<?php
require 'config.php'; // Fichier contenant la connexion à la base de données
require 'vendor/autoload.php'; // Inclure Composer pour JWT

use \Firebase\JWT\JWT;

$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

$stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
if ($stmt->execute([$email, $password])) {
    echo json_encode(["message" => "Inscription réussie"]);
} else {
    echo json_encode(["message" => "Erreur lors de l'inscription"]);
}
?>
