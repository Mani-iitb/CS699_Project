<?php

$con = mysqli_connect("127.0.0.1", "root", "", "airline_info");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL! Please contact the admin";
    return;
}
// Set content type to UTF-8 to properly display Unicode characters
header('Content-Type: text/html; charset=utf-8');

$city_codes = array("DEL", "BOM");

for ($i = 0; $i < 2; $i++) {
    for ($j = $i+1; $j < 2; $j++) {
        if ($i == $j) { continue; }

        $src = $city_codes[$i];
        $des = $city_codes[$j];

        // Execute the command
        $output = shell_exec('python -u "C:\xampp\htdocs\CS699_Project\extract.py" ' . $src . ' ' . $des . ' 2024-10-24 2>&1');
        echo json_encode($output);
        $output = nl2br($output); // Display the output (from Python script) with proper encoding
        echo json_encode($output);

        // Prepare to insert the data into the database
        $lines = explode("\n", trim($output));
        $values = [];

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line) {
                $line = trim($line, '()'); // Remove parentheses
                $data = explode(',', $line);

                // Prepare the values for SQL insertion
                $source_city = mysqli_real_escape_string($con, $data[0]);
                $des_city = mysqli_real_escape_string($con, $data[1]);
                $flight_name = mysqli_real_escape_string($con, $data[2]);
                $flight_duration = mysqli_real_escape_string($con, $data[3]);
                $departure_time = mysqli_real_escape_string($con, $data[4]);
                $time_takeoff = mysqli_real_escape_string($con, $data[5]);
                $time_landing = mysqli_real_escape_string($con, $data[6]);
                $price = mysqli_real_escape_string($con, $data[7]);
                $direct_flight_status = mysqli_real_escape_string($con, trim($data[8], ')'));
                $date = mysqli_real_escape_string($con, "2024-10-24");

                // Add values to the array for batch insert
                $values[] = "('$source_city', '$des_city', '$flight_name', '$flight_duration', '$departure_time', '$time_takeoff', '$time_landing', '$price', '$direct_flight_status', '$date')";
            }
        }

        // Prepare the SQL statement for batch insert using INSERT IGNORE 
        if (!empty($values)) {
            $sql = "INSERT IGNORE INTO scrabbed_data (source_city, destination_city, flight_name, flight_duration, departure_time, time_takeoff, time_landing, price, direct_flight_status, date) 
                    VALUES " . implode(', ', $values);
    
            $result = mysqli_query($con, $sql);
    
            if (!$result) {
                $response = array("success" => false, "message" => "Something went wrong: " . mysqli_error($con));
                echo json_encode($response);
                return;
            }
            $response = array("success" => true, "message" => "Data inserted successfully.");
            echo json_encode($response);
        }
    }
}

mysqli_close($con);
?>
