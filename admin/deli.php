<?php include 'config.php';
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

<?php
echo $id= $_GET['id'];
$sql ="DELETE FROM items WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo "New record deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


echo '
<script type="text/javascript">
window.location.href = "items.php";
</script>';	
?>