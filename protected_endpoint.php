<?php
require 'verify_jwt.php';
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$secretKey = "Group-Great";

// Extract token from request header

$json = file_get_contents('php://input');
$json = json_decode($json, true);
$jwt = $json["token"];
// $headers = getallheaders();
// $jwt = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

if ($jwt) {
    $decoded = verifyJWT($jwt, $secretKey);
    if ($decoded) {
        echo json_encode(["success" => true, "message" => "Access granted", "user_id" => $decoded['user_id']]);
    } else {
        echo json_encode(["success" => false, "message" => "Access denied"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Authorization token missing."]);
}
?>
