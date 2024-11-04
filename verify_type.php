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
 $email=$json['email'];

 $sql="SELECT UserType FROM user_info where Email='$email'";
 $result=mysqli_query($con,$sql);
 if(!$result){
   echo ("Something went wrong try again");
 }
 else{
   $row_count=mysqli_num_rows($result);
   if($row_count > 0){
      $row=mysqli_fetch_assoc($result);
      echo json_encode($row["UserType"]);
   }else{
      echo json_encode("invalid email");
   }
 }
mysqli_close($con);
?>