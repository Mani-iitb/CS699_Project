<?php

require 'vendor/autoload.php';  // Load Composer dependencies
use \Firebase\JWT\JWT;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$secretKey = "Group-Great";
$con = mysqli_connect("127.0.0.1", "root", "", "airline_info");
if (mysqli_connect_errno()) {
    echo json_encode(["message" => "Failed to connect to MySQL"]);
    exit();
}


$json = file_get_contents('php://input');
$data = json_decode($json, true);


$email = $data['email'];
$flight_name = $data['flight_name'];
$flight_date = $data['flight_date'];
$departure_time = $data['departure_time'];
$source_city = $data['source_city'];
$destination_city = $data['destination_city'];
$passengers = $data['passengers'];


$sql = "INSERT INTO booking_data (email, name, age, flight_name, flight_date, departure_time, source_city, destination_city, gender) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);

if ($stmt) {
   
    foreach ($passengers as $passenger) {
        $name = $passenger['name'];
        $age = $passenger['age'];
        $gender = $passenger['gender'];
        
        
        mysqli_stmt_bind_param($stmt, "ssissssss", $email, $name, $age, $flight_name, $flight_date, $departure_time, $source_city, $destination_city, $gender);
        $execute_success = mysqli_stmt_execute($stmt);
        
        if (!$execute_success) {
            echo json_encode(["message" => "Error occurred while saving passenger data"]);
            mysqli_close($con);
            exit();
        }
    }
    
    mysqli_stmt_close($stmt);
    echo json_encode(["message" => "Booking data saved successfully"]);
} else {
    echo json_encode(["message" => "Error"]);
}

mysqli_close($con);
?>
