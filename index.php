<?php
	session_start();
	error_reporting(0);
	$uID = $_SESSION['uID'];
?>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<link rel="stylesheet" href="css/autentication.css">
	<title>Iniciar sesion</title>
</head>
	<body>
		<div class="content-login">
			<img class="img-user" src="img/usuario_2.svg" alt="imagen usuario">
			<div class="title-login">Iniciar sesion</div>
			<div id="error-password" class="error">Usuario o contraseña incorrecto</div>
			<input type="text" class="form-control email" placeholder="Correo electrónico">
			<input type="password" name="password" class="form-control password" placeholder="Contraseña">
			<button class="btn action-submit-login">Iniciar sesion</button>
			<a href="sig-nup.php">¿No te has registrado?</a>
		</div>
		<script type="text/javascript" src="js/autentication.js"></script>
	</body>
</html>
