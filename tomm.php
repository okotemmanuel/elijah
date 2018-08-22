    <?php
    	// Account details
    	$apiKey = urlencode('LDhriYDFFak-NSHWos8CzDlW2LUvnip1jl8IA51lBY');
    	
    	// Message details
    	$numbers = array(256779815657, 256750931234);
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
    	
    	echo 'hello';
    	// Process your response here
		if($result==true){echo 'sent';}else{echo 'not sent';}
	
    	echo $response;
		curl_close($ch);
    ?>