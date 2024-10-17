<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

include 'DbConnect.php';

$con = mysqli_connect("localhost", "root", "", "airline_info");
if(mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        $source = $_GET['source'];
        $destination = $_GET['destination'];
        $sql = "SELECT source_city, destination_city, flight_name,flight_duration, time_takeoff, time_landing, price, date, direct_flight_status FROM scrabbed_data
                WHERE source_city='".$source."' AND destination_city='".$destination."' ORDER BY datetime DESC LIMIT 10";
        $result = mysqli_query($con, $sql);
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            $out = array();
            while($row = mysqli_fetch_assoc($result)) {
              $out[] = [
                ["Source"=>$row["source_city"], "Destination"=>$row["destination_city"], "Flight_name"=>$row["flight_name"],
                  "Flight_Date"=>$row["date"], "Flight_Duration"=>$row["flight_duration"], "time_takeoff"=>$row["time_takeoff"],
                  "time_landing"=>$row["time_landing"], "price"=>$row["price"], "direct_flight_status"=>$row["direct_flight_status"]]
              ];
            }
            echo json_encode($out);
          } else {
            echo "0 results";
          }
          mysqli_close($con);
        break;
}