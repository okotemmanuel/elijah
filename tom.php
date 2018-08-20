<?php
	// Authorisation details.
	$username = "okotemmanuel22@gmail.com";
	$hash = "LDhriYDFFak-stvHfBppLB9jBiIXntPjA7H1CeFzP5";

	// Config variables. Consult http://api.txtlocal.com/docs for more info.
	$test = "1";

	// Data for text message. This is the text message data.
	$sender = "PIKIME"; // This is who the message appears to be from.
	$numbers = "256750931234"; // A single number or a comma-seperated list of numbers
	$message = "HELLO.";
	// 612 chars or less
	// A single number or a comma-seperated list of numbers
	$message = urlencode($message);
	$data = "username=".$username."&hash=".$hash."&message=".$message."&sender=".$sender."&numbers=".$numbers."&test=".$test;
	$ch = curl_init('http://api.txtlocal.com/send/?');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch); // This is the result from the API
	echo $result ;
	if($result==true){echo 'sent';}else{echo 'not sent';}
	curl_close($ch);
	echo 'hello';
?>

    <?php
    	// Account details
    	$apiKey = urlencode('LDhriYDFFak-Rb6CBbNM5arYGqNyV7Y4OtujKF9hiD');
    	
    	// Message details
    	$numbers = array(256750931234, 256779815657);
    	$sender = urlencode('Jims Autos');
    	$message = rawurlencode('This is your message');
     
    	$numbers = implode(',', $numbers);
     
    	// Prepare data for POST request
    	$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);
     
    	// Send the POST request with cURL
    	$ch = curl_init('https://api.txtlocal.com/send/');
    	curl_setopt($ch, CURLOPT_POST, true);
    	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    	$response = curl_exec($ch);
    	curl_close($ch);
    		if($result==true){echo 'sent';}else{echo 'not sent';}
    	// Process your response here
    	echo $response;
    ?>