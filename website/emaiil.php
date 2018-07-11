

<?php


$email = $_GET["userEmail"];



$to = "bonexrice@gmail.com";
$em = "okotemmanuel22@gmail.com";
$subject = "Website";
$message = $email .'  ,  '.$phone.'  ,  '.$Msg;
$headers = "From: ".$email."\r\n";
$headers .= "Reply-To: ".$email."\r\n";
$headers .= "Return-Path: ".$email."\r\n";
$headers .= "CC: ".$em."\r\n";
$headers .= "BCC: ".$em."\r\n";

if (mail($to,$subject,$message,$headers) ) 
{
   echo "The email has been sent!<br>";
 echo "<a href='http://www.tyler-himself.com/contact.html'> click to move back </a>";
  
   }
   else {
   echo "The email has failed!";
    echo "<a href='http://www.tyler-himself.com/contact.html'> click to move back </a>";
   }
   
   
?>
