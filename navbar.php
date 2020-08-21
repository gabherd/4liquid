<?php
	session_start();
	error_reporting(0);
	require_once("php/connection.php");
	$access= $_SESSION['access']; 
	require("php/valiOnlyUser.php");
?>
<link rel="stylesheet" href="css/navbar.css">
<meta content="width=device-width, initial-scale=1" name="viewport" />
	<div class="nav">
		<a href="dashboard.php"> 
			<div class="menu-pages">
				<img class="img-menuOptions" src="img/bars.png">General
			</div>
		</a>
<?php 
	if ($access == 1) {
		?>
		<a href="history.php">
			<div class="menu-pages">
				<img class="img-menuOptions" src="img/HISTORIAL.svg">Historial
			</div>
		</a>
		<!--a href="#">
			<div class="menu-pages">
				<img class="img-menuOptions" src="img/TEMPERATURE.png">Ventas
			</div>
		</a-->
		<a href="users.php">
			<div class="menu-pages">
				<img class="img-menuOptions" src="img/USERS.png">Usuarios
			</div>
		</a>
		<?php
	}
?>
		

		<a href="sensors.php">
			<div class="menu-pages">
				<img class="img-menuOptions" src="img/pub.svg">Barriles
			</div>
		</a>
	</div>
<div class="background-nav">

</div>
