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
	<link rel="stylesheet" href="css/history.css">
	<link rel="stylesheet" href="css/general.css">


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
			<div class="container-summary">
				<div class="content-summarySales">
					<div class="titleContent">Cantidad de ventas</div>
					<!--canvas id="chart-summarySales" width="auto" height="100"></canvas-->
					<div id="chart-summarySales" height="100px"></div>
				</div>
				<div class="content-sales">
					<div class="titleContent">Cantidad de ventas por dia</div>
					<div id="chart-moreSalesDay" height="100px"></div>
				</div>
			</div>

			<div class="conteiner-graphs">
	            <!--/div> <canvas id='chart-beer"+beer[0].name+"' width='100%' height='35'></canvas> </div-->
			</div>
		</div>
    	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
    	 <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<script src="js/functions.js"></script>
    	<script type="text/javascript" src="js/data-history.js"></script>
	</body>
</html>
