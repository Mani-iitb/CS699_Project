<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$secretKey = "Group-Great";

$con=mysqli_connect("127.0.0.1","root","","airline_info");
if(mysqli_connect_errno()){
echo "Failed to connect to MYSQL";
mysqli_close($con);
exit();
}

$json = file_get_contents('php://input');
$json = json_decode($json, true);
$source=$json['source'];
$destination = $json['destination'];
$flight_name = $json['flight_name'];
$duration = $json['duration'];
$timing = $json['timing'];
$take_off = $json['take_off'];
$landing = $json['landing'];
$price = $json['price'];
$direct = $json['direct'];
$date = $json['date'];
$link="#";
$insert_time=date("Y-m-d h:i:s");
$fClass=$json['class'];

$values[] = "('$source', '$destination', '$flight_name', '$duration', '$timing', '$take_off', '$landing', '$price','$direct', '$date','$link', '$insert_time', '$fClass')";

$sql = "INSERT IGNORE INTO provided_flight (source_city, destination_city, flight_name, flight_duration, departure_time, time_takeoff, time_landing, price, direct_flight_status, Flight_Date, website_link, insert_time, class) 
                VALUES " . implode(', ', $values);

if (!mysqli_query($con, $sql)) {
    echo json_encode(array("success" => false, "message" => "Insert failed: " . mysqli_error($con)));
}

echo json_encode(array("success" => true, "message" => "Inserted"));
mysqli_close($con);
?>