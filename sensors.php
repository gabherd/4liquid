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
	<link rel="stylesheet" href="css/sensors.css">
	<link rel="stylesheet" href="css/general.css">
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	<script src="https://code.highcharts.com/modules/drilldown.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>

	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.css">
	<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.js"></script>
</head>
	<body>
		<?php require("header.php"); ?>
		<?php require("navbar.php"); ?>
		<div class="conteiner">
				<!--div id="aas" class="content-barrel">
					<div style="text-align: center;">
						<div class="titleContent">Barril-1</div>
						<div></div>
					</div>
					<div style="display: flex;">
						<div style="margin: 10px 20px 10px 0px">
							<img class="img-barrel" src="img/barriles.svg">
						</div>
						<div class="content-statuBarrel">
							<div>
								<img class="img-status" src="img/circle-green.svg"> Activo
							</div>
							<div>Tipo de cerveza</div>
						</div>
					</div>
					<div class="content-changeStatus">
						<button class="btn btn-danger btn-statusSensor" style="visibility: hidden;">Descativar</button>
					</div>
				</div-->
				
				
    	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
    	 <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<script src="js/functions.js"></script>
		<script src="js/sensors.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	</body>
</html>
