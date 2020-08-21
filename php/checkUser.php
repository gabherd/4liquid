<?php
	session_start();
	require("connection.php");

	$us_email = $_POST['email'];
	$us_password = $_POST['password'];

	$query = "SELECT id, admin FROM user WHERE email = '".$us_email."' and password = '".$us_password."';";
	$result = $mysqli->query($query);
	$row = $result->fetch_assoc();

	if($query){
		if ($row['id']>0) {
				$_SESSION['uID'] = $row['id'];
				$_SESSION['access'] = $row['admin'];
				echo '{"status": 1}';
		}
		else
		{
			$_SESSION['error'] = "Email or password incorrect.";
			//header("Location: index.php");
			echo '{"status": 0}';

		}
	}
	else
		echo "Error";
?>
