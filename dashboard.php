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
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <!-- Step 1 - Include the fusioncharts core library -->
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
    <!-- Step 2 - Include the fusion theme -->
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js"></script>
  <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
		<script type="text/javascript" src="js/mqttws31.js"></script>


	<link rel="stylesheet" href="css/dashboard.css">
	<link rel="stylesheet" href="css/general.css">
</head>
	<body>
		<?php require("header.php"); ?>
		<?php require("navbar.php"); ?>
		
		<div class="conteiner">
			<div class="content-barrels">
				<div class="titleContent">Barriles en existencia</div>
				<div class="txt-qtyBarrels">09</div>
			</div>
			<div class="content-temp">
				<div class="sW"> 
					<div class="titleContent">Temperatura</div>
	 				<div style="width: 100%; height: 200px;" id='chart-temperature'></div>
				</div>
				<div>
					<div class="titleContent">Humedad</div>
					<div style="width: 100%; height: 200px;" id="chart-humid"></div>
				</div>
			</div>
			<div class="content-graphs">
				<div class="titleContent">Cantidad de liquido actual</div>
				<canvas id="myChart" width="100" height="30"></canvas>
			</div>
		</div>
    	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
	    <script type="text/javascript" src="js/data-dashboard.js"></script>
	</body>
</html>
