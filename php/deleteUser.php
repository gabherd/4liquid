<?php
	session_start();
	require("connection.php");

	$id = $_POST['id'];
	$users = [];

	$query = "DELETE FROM user WHERE id = ".$id."";

	if ($mysqli->query($query) === TRUE) {
	  echo '{"status": 1, "detail": "deteled"}';
	} else {
	  echo '{"status": 0, "detail": "error"}';
	}
?>