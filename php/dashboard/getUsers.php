<?php
	session_start();
	require("../connection.php");

	$users = [];

	$query = "SELECT id, name, email, admin from user WHERE id != 1";
	$result = $mysqli->query($query);
	$row = mysqli_num_rows($result);

	if ($row > 0) {
		while($result2 = $result->fetch_assoc()) {
			$id = $result2["id"];
			$name = $result2["name"];
			$email = $result2["email"];
			$admin = $result2["admin"];
			
			$json = '{"id": '.$id.', "name": "'.$name.'", "email": "'.$email.'", "admin": "'.$admin.'"}';
			array_push($users, json_decode($json));
		}
	}

	echo json_encode($users);
?>

