<?php include 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();          //php part

?>

<?php

if(empty($_SESSION['student'])){
	
	echo '
<script type="text/javascript">
window.location.href = "cart.php";
</script>';	
	
}else{
$sql = "SELECT * FROM customer ORDER BY ID DESC LIMIT 1";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
	while($row = mysqli_fetch_assoc($result)){
 $id =$row["id"];
}
}


$_SESSION['student'];

for($i=0;$i<sizeof($_SESSION['student']);$i++){
	$idprod = $_SESSION['student'][$i];
	$paid = 'not yet';
	
$sql = "INSERT INTO orders (idcust,idprod ,paid )
VALUES ('$id', '$idprod' , '$paid' )";

if ($conn->query($sql) === TRUE) {
   // echo "New record created successfully";
} else {
   // echo "Error: " . $sql . "<br>" . $conn->error;
}

	
	
	
};
echo '
<script type="text/javascript">
window.location.href = "pay.php";
</script>';	
}

?>