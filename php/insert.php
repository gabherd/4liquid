<?php 
<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "4liquid";

	$temperatura = $_GET["temperatura"];
	$humedad = $_GET["humedad"];
	$peso = $_GET["peso"];



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO ba_nodo1 (ba_id, ba_peso, ba_temperatura, ba_humedad, ba_beerName) VALUES (NULL, ".$peso.", ".$temperatura.", ".$humedad.", 'Barril-3')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


?>