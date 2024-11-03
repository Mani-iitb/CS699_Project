<?php

$con = mysqli_connect("127.0.0.1", "root", "", "airline_info");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL! Please contact the admin";
    return;
}

// Set content type to UTF-8
header('Content-Type: text/html; charset=utf-8');

// $city_codes = array("Ahmedabad", "Bangalore", "Chennai", "Delhi", "Hyderabad", 
//     "Kolkata", "Mumbai", "Pune", "Jaipur", "Lucknow", 
//     "Kochi", "Goa", "Nagpur");

$city_codes = array("Chennai", "Delhi", "Mumbai");

for ($i = 0; $i < count($city_codes); $i++) {
    for ($j = 0; $j < count($city_codes); $j++) {
        if ($i == $j) continue;

        $src = $city_codes[$i];
        $des = $city_codes[$j];

        // Execute the Python command
        $output = shell_exec('python -u "C:\xampp\htdocs\SL Project\CS699_Project\extract.py" ' . $src . ' ' . $des . ' 2024-11-04 E 2>&1');        
        if (!$output) {
            echo json_encode(array("error" => "Failed to execute Python script for $src -> $des"));
            continue;
        }

        // Clean up the output for better display
        $output = nl2br($output); 
        echo json_encode($output);

        // Split the output into lines and prepare SQL insert values
        $lines = explode("\n", trim($output));
        $values = [];
        $datetime = date("Y-m-d h:i:s");
        $fClass = 1;

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line) {
                $line = trim($line, '()');
                $data = explode(',', $line);

                if (count($data) >= 10) {
                    // Sanitize the data
                    $source_city = mysqli_real_escape_string($con, $data[0]);
                    $des_city = mysqli_real_escape_string($con, $data[1]);
                    $flight_name = mysqli_real_escape_string($con, $data[2]);
                    $flight_duration = mysqli_real_escape_string($con, $data[3]);
                    $departure_time = mysqli_real_escape_string($con, $data[4]);
                    $time_takeoff = mysqli_real_escape_string($con, $data[5]);
                    $time_landing = mysqli_real_escape_string($con, $data[6]);
                    $price = mysqli_real_escape_string($con, $data[7]);
                    $direct_flight_status=mysqli_real_escape_string($con,$data[8]);
                    $Flight_date = mysqli_real_escape_string($con, $data[9]);
                    $websiteLink = mysqli_real_escape_string($con, trim($data[10], ')'));
                    
                    // Prepare the values for the insert statement
                    $values[] = "('$source_city', '$des_city', '$flight_name', '$flight_duration', '$departure_time', '$time_takeoff', '$time_landing', '$price','$direct_flight_status', '$Flight_date','$websiteLink', '$datetime', '$fClass')";
                }
            }
        }

        // Insert data in batch if any values are collected
        if (!empty($values)) {
            $sql = "INSERT IGNORE INTO scrabbed_data (source_city, destination_city, flight_name, flight_duration, departure_time, time_takeoff, time_landing, price, direct_flight_status, Flight_Date, website_link, insert_time, class) 
                    VALUES " . implode(', ', $values);

            if (!mysqli_query($con, $sql)) {
                echo json_encode(array("success" => false, "message" => "Insert failed: " . mysqli_error($con)));
            }
            echo json_encode(array("success" => true, "message" => "Data inserted successfully."));
        }
    }
}

for ($i = 0; $i < count($city_codes); $i++) {
    for ($j = 0; $j < count($city_codes); $j++) {
        if ($i == $j) continue;

        $src = $city_codes[$i];
        $des = $city_codes[$j];

        // Execute the Python command
        $output = shell_exec('python -u "C:\xampp\htdocs\SL Project\CS699_Project\extract.py" ' . $src . ' ' . $des . ' 2024-11-04 B 2>&1');        
        if (!$output) {
            echo json_encode(array("error" => "Failed to execute Python script for $src -> $des"));
            continue;
        }

        // Clean up the output for better display
        $output = nl2br($output); 
        echo json_encode($output);

        // Split the output into lines and prepare SQL insert values
        $lines = explode("\n", trim($output));
        $values = [];
        $datetime = date("Y-m-d h:i:s");
        $fClass = 3;

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line) {
                $line = trim($line, '()');
                $data = explode(',', $line);

                if (count($data) >= 10) {
                    // Sanitize the data
                    $source_city = mysqli_real_escape_string($con, $data[0]);
                    $des_city = mysqli_real_escape_string($con, $data[1]);
                    $flight_name = mysqli_real_escape_string($con, $data[2]);
                    $flight_duration = mysqli_real_escape_string($con, $data[3]);
                    $departure_time = mysqli_real_escape_string($con, $data[4]);
                    $time_takeoff = mysqli_real_escape_string($con, $data[5]);
                    $time_landing = mysqli_real_escape_string($con, $data[6]);
                    $price = mysqli_real_escape_string($con, $data[7]);
                    $direct_flight_status=mysqli_real_escape_string($con,$data[8]);
                    $Flight_date = mysqli_real_escape_string($con, $data[9]);
                    $websiteLink = mysqli_real_escape_string($con, trim($data[10], ')'));
                    
                    // Prepare the values for the insert statement
                    $values[] = "('$source_city', '$des_city', '$flight_name', '$flight_duration', '$departure_time', '$time_takeoff', '$time_landing', '$price','$direct_flight_status', '$Flight_date','$websiteLink', '$datetime', '$fClass')";
                }
            }
        }

        // Insert data in batch if any values are collected
        if (!empty($values)) {
            $sql = "INSERT IGNORE INTO scrabbed_data (source_city, destination_city, flight_name, flight_duration, departure_time, time_takeoff, time_landing, price, direct_flight_status, Flight_Date, website_link, insert_time, class) 
                    VALUES " . implode(', ', $values);

            if (!mysqli_query($con, $sql)) {
                echo json_encode(array("success" => false, "message" => "Insert failed: " . mysqli_error($con)));
            }
            echo json_encode(array("success" => true, "message" => "Data inserted successfully."));
        }
    }
}

for ($i = 0; $i < count($city_codes); $i++) {
    for ($j = 0; $j < count($city_codes); $j++) {
        if ($i == $j) continue;

        $src = $city_codes[$i];
        $des = $city_codes[$j];

        // Execute the Python command
        $output = shell_exec('python -u "C:\xampp\htdocs\SL Project\CS699_Project\extract.py" ' . $src . ' ' . $des . ' 2024-11-04 P 2>&1');        
        if (!$output) {
            echo json_encode(array("error" => "Failed to execute Python script for $src -> $des"));
            continue;
        }

        // Clean up the output for better display
        $output = nl2br($output); 
        echo json_encode($output);

        // Split the output into lines and prepare SQL insert values
        $lines = explode("\n", trim($output));
        $values = [];
        $datetime = date("Y-m-d h:i:s");
        $fClass = 2;

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line) {
                $line = trim($line, '()');
                $data = explode(',', $line);

                if (count($data) >= 10) {
                    // Sanitize the data
                    $source_city = mysqli_real_escape_string($con, $data[0]);
                    $des_city = mysqli_real_escape_string($con, $data[1]);
                    $flight_name = mysqli_real_escape_string($con, $data[2]);
                    $flight_duration = mysqli_real_escape_string($con, $data[3]);
                    $departure_time = mysqli_real_escape_string($con, $data[4]);
                    $time_takeoff = mysqli_real_escape_string($con, $data[5]);
                    $time_landing = mysqli_real_escape_string($con, $data[6]);
                    $price = mysqli_real_escape_string($con, $data[7]);
                    $direct_flight_status=mysqli_real_escape_string($con,$data[8]);
                    $Flight_date = mysqli_real_escape_string($con, $data[9]);
                    $websiteLink = mysqli_real_escape_string($con, trim($data[10], ')'));
                    
                    // Prepare the values for the insert statement
                    $values[] = "('$source_city', '$des_city', '$flight_name', '$flight_duration', '$departure_time', '$time_takeoff', '$time_landing', '$price','$direct_flight_status', '$Flight_date','$websiteLink', '$datetime', '$fClass')";
                }
            }
        }

        // Insert data in batch if any values are collected
        if (!empty($values)) {
            $sql = "INSERT IGNORE INTO scrabbed_data (source_city, destination_city, flight_name, flight_duration, departure_time, time_takeoff, time_landing, price, direct_flight_status, Flight_Date, website_link, insert_time, class) 
                    VALUES " . implode(', ', $values);

            if (!mysqli_query($con, $sql)) {
                echo json_encode(array("success" => false, "message" => "Insert failed: " . mysqli_error($con)));
            }
            echo json_encode(array("success" => true, "message" => "Data inserted successfully."));
        }
    }
}

mysqli_close($con);
?>
