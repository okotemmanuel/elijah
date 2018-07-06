<?php

echo $email = $_GET['email'];

$headers = "From: ".$email." \r\n";
$headers .= "Reply-To: okotemmanuel22@gmail.com\r\n";
$headers .= "Return-Path: okotemmanuel22@gmail.com \r\n";
$headers .= "CC: okotemmanuel22@gmail.com \r\n";
$headers .= "BCC: okotemmanuel22@gmail.com \r\n";

if ( mail($to,$subject,$message,$headers) ) {
   echo "The email has been sent!";
   } else {
   echo "The email has failed!";
   }
   
 echo '
<script type="text/javascript">
window.location.href = "home.php";
</script>';	   
?> 

