<?php
$con=mysqli_connect("127.0.0.1","root","","airline_info");

if(mysqli_connect_errno()){
    echo "Failed to connect to MYSQL";
    return;
}
