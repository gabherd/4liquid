<?php
	$server = 'localhost';
	$user = 'root';
	$password = '';
	$database = '4liquid';
	$port = 3306;

	$mysqli = new mysqli($server, $user, $password, $database, $port);

	if ($mysqli->connect_errno) {
		echo "Connection error #$mysqli->connect_errno";
	}
?>
