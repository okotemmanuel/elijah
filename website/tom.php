<?php include 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();          //php part

?>

<?php
	if(empty($_POST["namem"]) || empty($_POST["email"])  || empty($_POST["countries"])  || empty($_POST["tell"])){
	echo 'name , email , country and telephone number are mandatory fields';	
	echo '
<script type="text/javascript">
window.location.href = "biladress.php";
</script>';		
	}else{
$name = $_POST["namem"];
$email = $_POST["email"];
$countries = $_POST["countries"];
	
	
$cname = $_POST["cname"];
$apart = $_POST["apart"];	
$zip = $_POST["zip"];	
$city = $_POST["city"];	
$state = $_POST["state"];	
$tell = $_POST["tell"];

$sql = "INSERT INTO customer (email,name ,country , apartment , zip , town , state , tel)
VALUES ('$email', '$name' , '$countries' ,'$cname' , '$apart' ,'$zip' , '$state' , '$tell' )";

if ($conn->query($sql) === TRUE) {
    //echo "New record created successfully";
} else {
   // echo "Error: " . $sql . "<br>" . $conn->error;
}


echo '
<script type="text/javascript">
window.location.href = "orders.php";
</script>';	
	}
?>