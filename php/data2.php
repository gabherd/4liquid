<?php
	//allow external access
	header('Access-Control-Allow-Origin:*');
	//connection info
	$server = 'localhost';
	$user = 'root';
	$password = '';
	$database = '4liquid';
	//connection
	$connection = mysqli_connect($server, $user, $password, $database);
	//error in connection
	if ($connection === false) { 
		echo 'Could not connect to server';
		die; //end application
	}
	//query
	$query="SELECT temperatura, humedad FROM temp ORDER BY id desc LIMIT 0,1;";
	//command
	$command = $connection->prepare($query);
	//execute
	$command->execute();
	//bind result
	$command->bind_result($temperatura, $humedad);
	//json start
    while($command->fetch()) {
		 echo '[{"temperatura" : "'.$temperatura.'", "humedad" : "'.$humedad.'"}]';
	}
	//close connection
	mysqli_stmt_close($command);
	$connection->close();

//echo'{"status":0,"temperatura":"''"}'
	?>
	
	
	
	
	
	
	
	