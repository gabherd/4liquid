<?php
	session_start();
	require("connection.php");

	$name = $_POST["name"];
	$email = $_POST["email"];
	$password = $_POST["password"];

	$query = "SELECT id FROM user WHERE email = '".$email."';";
	$result = $mysqli->query($query);
	$row = $result->fetch_assoc();

	if($query){
		if ($row['id']>0) {
				echo '{"status": 10, "detail": "user exist"}';
		}
		else{
			$query = "INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES (NULL, '".$name."', '".$email."', '".$password."');";
			$result = $mysqli->query($query);
			
			$query = "SELECT id FROM user WHERE email = '".$email."';";
			$result = $mysqli->query($query);
			$row = $result->fetch_assoc();			

			$_SESSION['uID'] = $row['id'];
			echo '{"status": 1, "detail": "success"}';
		}
	}

?>