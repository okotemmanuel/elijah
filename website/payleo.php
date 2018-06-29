
<?php


$data = 'https://webpay.pay-leo.com&'.$merchantCode.'&'.$amount.'&'.$callbackUrl ;

$signature = hash_hmac (‘sha256’, $data,$consumerSecret);

//$_GET['code'];
//$_GET['message'];
//$_GET['transactionId'];



?>