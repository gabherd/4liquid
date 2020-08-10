<?php
	session_start();
	error_reporting(0);
	require_once("php/connection.php");
	$uID = $_SESSION['uID'];
	require("php/valiOnlyUser.php");
?>
<html>
<head>
	<meta charset="UTF-8">
	<title>4 Liquid</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="css/history.css">
	<link rel="stylesheet" href="css/general.css">
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	<script src="https://code.highcharts.com/modules/drilldown.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
</head>
	<body>
		<?php require("header.php"); ?>
		<?php require("navbar.php"); ?>
		<div class="conteiner">
			<table class="table">
			  <thead class="">
			    <tr>
			      <th scope="col">Nombre</th>
			      <th scope="col">Correo</th>
			      <th scope="col">Nivel</th>
			      <th scope="col" style="display: flex; justify-content: center;">Acciones</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <td>Rodrigo Gonzales</td>
			      <td>rgigo@gmail.com</td>
			      <td class="per">Estandar</td>
			      <td style="display: flex; justify-content: center; position: relative;">
					<div class="card-options option-Admin hide ">
						<div class="option-card">Eliminar</div>
						<div class="option-card change-permis">Cambiar a administrador</div>
					</div>
			      	<img  style="cursor: pointer;" class="btn-account" src="img/settings.svg" width="20px;"></td>
			    </tr>
			    <tr>
			      <td>Tulio Treviño</td>
			      <td>trvlio@gmail.com</td>
			      <td>Estandar</td>
			      <td style="display: flex; justify-content: center;"><img src="img/settings.svg" width="20px;"></td>
			    </tr>
			    <tr>
			      <td>Larry Smith</td>
			      <td>smtle@hotmail.com</td>
			      <td>Estandar</td>
			      <td style="display: flex; justify-content: center;"><img src="img/settings.svg" width="20px;"></td>
			    </tr>
			  </tbody>
			</table>
		</div>
    	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
    	 <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<script src="js/functions.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	</body>
</html>
