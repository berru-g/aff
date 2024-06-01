<?php
require 'config.php';
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $payload = [
        "iss" => "http://yourdomain.com",
        "aud" => "http://yourdomain.com",
        "iat" => time(),
        "nbf" => time(),
        "exp" => time() + 3600,
        "data" => [
            "id" => $user['id'],
            "email" => $user['email']
        ]
    ];

    $jwt = JWT::encode($payload, 'your_secret_key', 'HS256');
    echo json_encode(["message" => "Connexion réussie", "token" => $jwt]);
} else {
    echo json_encode(["message" => "Email ou mot de passe incorrect"]);
}
?>
