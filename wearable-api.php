<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if parameters are received in the URL
    if (isset($_GET['deviceId']) && isset($_GET['typeId']) && isset($_GET['lat']) && isset($_GET['long']) && isset($_GET['value'])) {
        // Extract parameters from the URL
        $deviceId = $_GET['deviceId'];
        $typeId = $_GET['typeId'];
        $lat = floatval($_GET['lat']); // Convert to Float
        $long = floatval($_GET['long']); // Convert to Float
        $value = $_GET['value'];

        // Create an associative array with the data
        $data = array(
            'deviceId' => $deviceId,
            'typeId' => $typeId,
            'lat' => $lat,
            'long' => $long,
            'value' => $value
        );

        // Convert the data to JSON format
        $jsonData = json_encode($data);

        // Define the URL of the destination endpoint
        $url = 'https://wearable-devices-monitoring-sigma.vercel.app/api/measurements';

        // Initialize cURL session
        $ch = curl_init($url);

        // Set cURL options
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute cURL session and get the response
        $response = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            echo 'cURL Error: ' . curl_error($ch);
        }

        // Close cURL session
        curl_close($ch);

        // Display the response from the server
        echo 'Response from Server: ' . $response;
    } else {
        // Handle the case when parameters are not received in the URL
        echo 'Missing parameters in the URL.';
    }
} else {
    // Handle unsupported request methods
    echo 'Unsupported request method.';
}
?>

