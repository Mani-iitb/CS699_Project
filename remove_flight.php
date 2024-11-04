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
$flight_name = $json['flight_name'];
$timing = $json['timing'];
$date = $json['date'];

$values[] = "('$flight_name', '$timing', '$date')";

$sql = "DELETE FROM provided_flight WHERE flight_name='$flight_name' AND departure_time='$timing' AND Flight_Date='$date'";

if (!mysqli_query($con, $sql)) {
    echo json_encode(array("success" => false, "message" => "Insert failed: " . mysqli_error($con)));
}
if ($con->affected_rows > 0){
    echo json_encode(array("success" => true, "message" => "Removed"));
} else {
    echo json_encode(array("success" => false, "message" => "NODATA"));
}
mysqli_close($con);
?>