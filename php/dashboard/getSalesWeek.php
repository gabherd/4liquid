<?php
	session_start();
	require("../connection.php");

	$beerNames = [];
	$dataDay = [];


	$qry_salesBeer = "SELECT DISTINCT ba_beerName AS name FROM ba_nodo1";
	$result = $mysqli->query($qry_salesBeer);
	$row = mysqli_num_rows($result);

	if ($row > 0) {
		while($result2 = $result->fetch_assoc()) {
			$name = $result2["name"];
			array_push($beerNames, $name);
		}
	}

	foreach ($beerNames as $name) {
		$data = [];

		$qry_salesWeek = "SELECT ba_beerName as name, ba_date as date, COUNT(*) as qty 
						  FROM ba_nodo1 
						  WHERE ba_date 
						  BETWEEN '2020-08-03' 
						  	AND '2020-08-10' 
						  	AND ba_beerName = '".$name."'  
						  	AND ba_peso = 0  
						  GROUP BY DATE(ba_date)";

		$result = $mysqli->query($qry_salesWeek);

		while($result2 = $result->fetch_assoc()) {
			$name = $result2["name"];
			$qty = $result2["qty"];
			$date = $result2["date"];

			$day = $date;
			$nameOfDay = days(date('D', strtotime($date)));

			$json = '{"name": "'.$name.'", "date": "'.$nameOfDay.'", "qty": '.$qty.'}';
			
			array_push($data, json_decode($json));
		}

		array_push($dataDay, $data);
	}

	echo json_encode($dataDay);


	function days($day){
		$dayEs;

		switch($day){
			case "Mon":
				$dayEs = "Lunes";
				break;
			case "Tue":
				$dayEs = "Martes";
				break;
			case "Wed":
				$dayEs = "Miercoles";
				break;
			case "Thu":
				$dayEs = "Jueves";	
				break;		
			case "Fri":
				$dayEs = "Viernes";	
				break;			
			case "Sat":
				$dayEs = "Sabado";
				break;
			case "Sun":
				$dayEs = "Domingo";
				break;
			default: 
				$dayEs = $day;
				break;
		}

		return $dayEs;
	}
?>

