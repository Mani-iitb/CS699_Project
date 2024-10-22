<?php
header("Access-Control-Allow-Origin: *");
$con=mysqli_connect("127.0.0.1","localhost","","airline_info");
 if(mysqli_connect_errno()){
    echo "Failed to connect to MYSQL";
 }
 $email=$_POST['email'];
 $password=$_POST['password'];
