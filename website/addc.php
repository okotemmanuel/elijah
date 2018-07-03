<!DOCTYPE html>
<?php include 'config.php';
session_start(); 
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$prod = $_GET['id'];

         //php part
if(!empty($_SESSION['student'])){
	array_push($_SESSION['student'],$prod ); 
}else{
	$_SESSION['student'] = array();
	array_push($_SESSION['student'],$prod ); 
}


echo '
<script type="text/javascript">
window.location.href = "cart.php";
</script>';	  

print_r($_SESSION['student']);

?>