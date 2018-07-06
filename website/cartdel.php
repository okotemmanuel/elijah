
<!DOCTYPE html>
<?php include 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();          //php part

?>

<?php

 $val = $_GET['id'];

 /*
 $vall= array() ;
$vac = array() ;

array_push($vall, $val );
//print_r($vall);
$vac = array_diff($_SESSION['student'],$vall);

$_SESSION['student'] = array() ;

array_push($_SESSION['student'], $vac );
print_r($_SESSION['student']);

*/

if (($key = array_search( $val, $_SESSION['student'])) !== false) {
    unset($_SESSION['student'][$key]);
}


$_SESSION['student'] = array_values($_SESSION['student']);


echo '
<script type="text/javascript">
window.location.href = "cart.php";
</script>';

?>