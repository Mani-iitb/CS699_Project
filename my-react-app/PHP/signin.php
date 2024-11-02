<?php
header("Access-Control-Allow-Origin: *");
$con=mysqli_connect("127.0.0.1","root","","airline_info");
 if(mysqli_connect_errno()){
    echo "Failed to connect to MYSQL";
    mysqli_close($con);
    exit();
 }
 $email=$_POST['email'];
 $password=$_POST['password'];

 $sql="SELECT Name FROM user_info where Email='$email' AND Passward='$password'";
 $result=mysqli_query($con,$sql);
 if(!$result){
   echo ("Something went wrong try again");
 }
 else{
   $row_count=mysqli_num_rows($result);
   if($row_count > 0){
      $row=mysqli_fetch_assoc($result);
      echo ($row["Name"]);
   
   }else{
      echo("Incorrect Passward");
   }
 }

mysqli_close($con);
?>