<?php
 // Adjust the path as necessary
header("Access-Control-Allow-Origin: *");
$con=mysqli_connect("127.0.0.1","root","","airline_info");

if(mysqli_connect_errno()){
    echo "Failed to connect to MYSQL";
    return;
}  
// Get POST data
$full_name = $_POST["name"];
$email = $_POST["email"];
$contact = $_POST["contact"];
$type = $_POST["userType"];
$password = $_POST["password"];

// Create the SQL query
$sql = "INSERT INTO user_info (Name, Email, Contact, Passward, UserType) VALUES ('$full_name', '$email', '$contact', '$password', '$type')";

// Execute the query
$result = mysqli_query($con, $sql);

// Check the result and respond
if ($result) {
    echo json_encode(["message" => "User information saved successfully"]);
} else {
    echo json_encode(["message" => "Unable to send data to the database", "error" => mysqli_error($con)]);
}

// Close the connection
mysqli_close($con);
?>
