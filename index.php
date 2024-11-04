<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$cities = array(
  "Mumbai" => "BOM",
  "Bangalore" => "BLR",
  "Chennai" => "MAA",
  "Delhi" => "DEL",
  "Goa" => "GOI",
  "Ahmedabad" => "AMD",
  "Pune" => "PNQ",
  "Lucknow" => "LKO",
  "Kolkata" => "CCU",
  "Hydrebad" => "HYD",
);

$classes = array(
  "E" => 1,
  "P" => 2,
  "B" => 3
);

$AirIndia = "Air India";
$AirIndiaEx = "Air India Express";
$Akasa = "Akasa";
$Emirates = "Emirates";
$IndiGo = "IndiGo";
$SpiceJet = "SpiceJet";
$Vistara = "Vistara";
$AirAsia = "Air Asia";

$con = mysqli_connect("localhost", "root", "", "airline_info");
if(mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

function findMatchName($flight_name){
  global $AirIndia, $AirIndiaEx, $Akasa, $Emirates, $IndiGo, $SpiceJet, $Vistara, $AirAsia;
  $img_name="/images/default.png";
  if (strpos($flight_name, $AirIndiaEx) !== false){
    $img_name="/images/AirIndiaExpress.png";
  } elseif (strpos($flight_name, $AirIndia) !== false){
    $img_name="/images/AirIndia.png";
  } elseif (strpos($flight_name, $Akasa) !== false){
    $img_name="/images/Akasa.png";
  } elseif (strpos($flight_name, $Emirates) !== false){
    $img_name="/images/Emirates.png";
  } elseif (strpos($flight_name, $IndiGo) !== false){
    $img_name="/images/IndiGo.png";
  } elseif (strpos($flight_name, $SpiceJet) !== false){
    $img_name="/images/SpiceJet.png";
  } elseif (strpos($flight_name, $Vistara) !== false){
    $img_name="/images/Vistara.png";
  } elseif (strpos($flight_name, $AirAsia) !== false){
    $img_name="/images/AirAsia.png";
  } 
  return $img_name;
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        $source = $_GET['source'];
        $source_f = $cities[$source];
        $destination = $_GET['destination'];
        $destination_f = $cities[$destination];
        $fClass = $_GET['type'];
        $fClass = $classes[$fClass];
        $date = $_GET['date'];
        $out = array();
        $isFound=0;
        $sql = "SELECT source_city, destination_city, flight_name,flight_duration, time_takeoff, time_landing, price, Flight_Date, direct_flight_status, website_link FROM provided_flight
        WHERE (source_city='".$source."' OR source_city='".$source_f."') AND (destination_city='".$destination."' OR destination_city='".$destination_f."') 
              AND Flight_Date='".$date."' AND class='".$fClass."' ORDER BY price LIMIT 50";
        $result = mysqli_query($con, $sql);
        if (mysqli_num_rows($result) > 0) {
          // output data of each row
          while($row = mysqli_fetch_assoc($result)) {
            $img=findMatchName($row["flight_name"]);
            $out[] = [
              ["Source"=>$row["source_city"], "Destination"=>$row["destination_city"], "Flight_name"=>$row["flight_name"],
                "Flight_Date"=>$row["Flight_Date"], "Flight_Duration"=>$row["flight_duration"], "time_takeoff"=>$row["time_takeoff"],
                "time_landing"=>$row["time_landing"], "price"=>$row["price"], "direct_flight_status"=>$row["direct_flight_status"],
                "website_link"=>$row["website_link"],"img"=>$img, "type"=>"Booking available"]
            ];
          }
          $isFound=1;
        }
        $sql = "SELECT insert_time FROM scrabbed_data
                WHERE (source_city='".$source."' OR source_city='".$source_f."') AND (destination_city='".$destination."' OR destination_city='".$destination_f."')
                AND class='".$fClass."' ORDER BY insert_time DESC LIMIT 1";
        $result = mysqli_query($con, $sql);
        if (mysqli_num_rows($result) > 0) {
          $res = mysqli_fetch_assoc($result);
          $res = $res["insert_time"];
          $sql = "SELECT source_city, destination_city, flight_name,flight_duration, time_takeoff, time_landing, price, Flight_Date, direct_flight_status, website_link FROM scrabbed_data
                  WHERE (source_city='".$source."' OR source_city='".$source_f."') AND (destination_city='".$destination."' OR destination_city='".$destination_f."') 
                        AND insert_time='".$res."' AND class='".$fClass."' ORDER BY price LIMIT 50";
          $result = mysqli_query($con, $sql);
          if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
              $img=findMatchName($row["flight_name"]);
              $out[] = [
                ["Source"=>$row["source_city"], "Destination"=>$row["destination_city"], "Flight_name"=>$row["flight_name"],
                  "Flight_Date"=>$row["Flight_Date"], "Flight_Duration"=>$row["flight_duration"], "time_takeoff"=>$row["time_takeoff"],
                  "time_landing"=>$row["time_landing"], "price"=>$row["price"], "direct_flight_status"=>$row["direct_flight_status"],
                  "website_link"=>$row["website_link"],"img"=>$img, "type"=>"Third-Party"]
              ];
            }
            $isFound=1;
          }
        }

        if($isFound == 0){
          echo json_encode("0 results");
        } else {
          echo json_encode($out);
        }
        mysqli_close($con);
        break;
}