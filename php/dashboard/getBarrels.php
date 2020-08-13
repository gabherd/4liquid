<?php
	session_start();
	require("../connection.php");

	$barrels = [];

	$qry_salesBeer = "SELECT DISTINCT ba_beerName AS name FROM ba_nodo1 ORDER BY name";
	$result = $mysqli->query($qry_salesBeer);
	$row = mysqli_num_rows($result);

	if ($row > 0) {
		while($result2 = $result->fetch_assoc()) {
			$name = $result2["name"];
			array_push($barrels, $name);
		}
	}

	echo json_encode($barrels);
?>

