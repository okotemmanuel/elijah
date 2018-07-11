<?php
$merchantCode  = 54540;
$amount = 1000;
$callbackUrl = 'http://elijah-mcquinn.com'; 
$consumerSecret= "3z9J2HBzk6TQI1LHBqv7oIZlc31529671271" ;
$data ="https://webpay.payleo.com&".$merchantCode."&".$amount."&".$callbackUrl;
$signature = hash_hmac ("sha256", $data, $consumerSecret);

echo '<a href="https://webpay.pay-leo.com?amount='.$amount.'&merchantCode='.$merchantCode.'&auth_signature='.$signature.'&callbackUrl='.$callbackUrl.'" >click here to pay </a><br>';
//echo 'https://webpay.pay-leo.com?amount='.$amount.'&merchantCode='.$merchantCode.'&auth_signature='.$signature.'&callbackUrl='.$callbackUrl;





?>