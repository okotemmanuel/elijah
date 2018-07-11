<?php
/*
$email = $_GET['email'];

 echo '
<script type="text/javascript">
window.location.href = "https://enuwach.000webhostapp.com/tyler/email2.php?email='.$email.'";
</script>';	
  */ 
?>

<?php include 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();          //php part

?>

<?php

$email = $_GET['email'];
	if(empty($email) ){
	echo 'email is mandatory';	
	echo '
<script type="text/javascript">
window.location.href = "home.php";
</script>';		
	}else{
$name = 'news letter';


$sql = "INSERT INTO customer (email,name)
VALUES ('$email', '$name' )";

if ($conn->query($sql) === TRUE) {
    echo "Sent successfully";
} else {
   // echo "Error: " . $sql . "<br>" . $conn->error;
}


echo '
<script type="text/javascript">
window.location.href = "home.php";
</script>';	
	}
?> 

