<?php
	session_start();
	require("../connection.php");

	$data= [];


	$qry_salesBeer = "SELECT count(ba_beerName) as qty, ba_beerName as name from ba_nodo1 WHERE ba_date 
						  BETWEEN '2020-08-03' 
						  	AND '2020-08-10'  AND ba_peso = 0  GROUP BY ba_beerName";
	$result = $mysqli->query($qry_salesBeer);
	$row = mysqli_num_rows($result);

	if ($row > 0) {
		while($result2 = $result->fetch_assoc()) {
			$name = $result2["name"];
			$qty = $result2["qty"];

			$json = '{"name": "'.$name.'", "qty": '.$qty.'}';
			 array_push($data, json_decode($json));
		}
	}

	echo json_encode($data);
?>

