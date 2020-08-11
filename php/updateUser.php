<?php
	session_start();
	require("../connection.php");

	$id = $_POST['id'];
	$admin = $_POST['admin'];

	$users = [];

	$query = "UPDATE user SET admin = ".$admin." WHERE id = ".$id."";

	if ($mysqli->query($query) === TRUE) {
		echo '{"status": 1, "detail": "updated"}';
	} else {
	  	echo '{"status": 0, "detail": "error"}';
	}

	
?>

