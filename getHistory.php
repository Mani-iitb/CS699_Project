<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$con = mysqli_connect("127.0.0.1", "root", "", "airline_info");
if (mysqli_connect_errno()) {
    echo json_encode(["success" => false, "message" => "Failed to connect to database"]);
    exit();
}

$json = file_get_contents('php://input');
$json = json_decode($json, true);
$email = $json['email'];

$sql = "SELECT * FROM booking_data WHERE email = '$email'";
$result = mysqli_query($con, $sql);

if (!$result) {
    echo json_encode(["success" => false, "message" => "Something went wrong"]);
} else {
    $rows = [];
    if (mysqli_num_rows($result) == 0) {
        echo json_encode(["success" => true, "data" =>[] ]);
    } else {
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode(["success" => true, "data" => $rows]);
    }
}

mysqli_close($con);
?>