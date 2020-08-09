<?php
	$temperatura = $_POST["temperatura"];
	$humedad = $_POST["humedad"];
	$hora = $_POST["hora"];

	$server = 'localhost';
	$user = 'root';
	$password = '';
	$database = '4liquid';
	//connection

	$connection = new mysqli($server, $user, $password, $database);
	//error in connection
	if ($connection->connect_error) { 
		echo 'Could not connect to server';
		die; //end application
	}

	//query
	$query= "INSERT INTO temp (id, temperatura, humedad, hora) VALUES (NULL, ".$temperatura.", ".$humedad.",".$hora.")";

	if($connection->query($query) === TRUE){
		echo '{
			"temperatura" : "'.$temperatura.'", 
			"humedad" : "'.$humedad.'",
			"hora" : "'.$hora.'"
		}';
	}else{
		echo '{"status": "error"}';
	}

	$connection->close();
?>