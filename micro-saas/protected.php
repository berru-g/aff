<?php
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
$arr = explode(" ", $authHeader);

if ($arr[0] === 'Bearer') {
    $jwt = $arr[1];
    try {
        $decoded = JWT::decode($jwt, 'your_secret_key', ['HS256']);
        echo json_encode(["message" => "Accès autorisé", "data" => $decoded->data]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Accès refusé", "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Token manquant"]);
}
?>
