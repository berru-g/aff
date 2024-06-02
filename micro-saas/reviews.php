<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Récupérer les avis
    $product_id = $_GET['product_id'];
    $stmt = $conn->prepare("SELECT * FROM reviews WHERE product_id = ?");
    $stmt->execute([$product_id]);
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reviews);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ajouter un avis
    $data = json_decode(file_get_contents('php://input'), true);
    $product_id = $data['product_id'];
    $reviewer_name = $data['reviewer_name'];
    $review_text = $data['review_text'];
    $rating = $data['rating'];

    $stmt = $conn->prepare("INSERT INTO reviews (product_id, reviewer_name, review_text, rating) VALUES (?, ?, ?, ?)");
    $stmt->execute([$product_id, $reviewer_name, $review_text, $rating]);

    echo json_encode(['success' => true]);
}
?>
