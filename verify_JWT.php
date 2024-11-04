<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');


function verifyJWT($jwt, $secretKey) {
    try {
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        return null;  // Invalid token
    }
}
?>
