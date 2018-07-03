
<?php

$merchantCode  = '54540';
$amount = 1000;
$callbackUrl = 'elijah-mcquinn.com'; 
$consumerSecret= '3z9J2HBzk6TQI1LHBqv7oIZlc31529671271';

$data = 'https://webpay.pay-leo.com&'.$merchantCode.'&'.$amount.'&'.$callbackUrl ;

$signature = hash_hmac ('sha256', $data,$consumerSecret);



echo '<a href="https://webpay.pay-leo.com?amount='.$amount.'&merchantCode='.$merchantCode.'&auth_signature='.$signature.'&callbackUrl='.$callbackUrl.'" >click here to pay </a>';


//$_GET['code'];
//$_GET['message'];
//$_GET['transactionId'];



?>