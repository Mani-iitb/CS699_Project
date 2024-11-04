<?php

require 'vendor/autoload.php';  // Load Composer dependencies
use \Firebase\JWT\JWT;

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
 $email=$json['email'];
 $password=$json['password'];

 $sql="SELECT Name, Email FROM user_info where Email='$email' AND Passward='$password'";
 $result=mysqli_query($con,$sql);
 if(!$result){
   echo ("Something went wrong try again");
 }
 else{
   $row_count=mysqli_num_rows($result);
   if($row_count > 0){
      $row=mysqli_fetch_assoc($result);
      $payload = [
         "iat" => time(),                  // Issued at
         "exp" => time() + (60 * 30),      // Expiry (30 min)
         "user_id" => $row['Email'],
         "name" => $row['Name']
      ];
      $jwt = JWT::encode($payload, $secretKey, 'HS256');
      echo json_encode(["success" => true, "token" => $jwt, "name" => $row['Email']]);
   
   }else{
      echo json_encode(["success" => false, "message" => "Invalid password"]);
   }
 }

mysqli_close($con);
?>