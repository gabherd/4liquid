google.charts.load('current', {'packages':['gauge']});
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {

            var data = google.visualization.arrayToDataTable([
              ['Label', 'Value'],
              ['', 0],
            ]);

            var liquid = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['Cerveza', 0],
              ['Vacio', 2],
            ]);

            var options = {
              width: 300, height: 300,	
              redFrom: 90, redTo: 100,
              yellowFrom:75, yellowTo: 90,
              minorTicks: 5
            };
  
            var options2 = {
              title: ''
            };

            var chart = new google.visualization.Gauge(document.getElementById('medidor'));
            var liquido = new google.visualization.PieChart(document.getElementById('piechart'));

            setInterval(function(){
                var JSON=$.ajax({
                    url:"http://localhost:80/Test02Copy/php/data2.php",
                    dataType: 'json',
                    async: false}).responseText;

                var Respuesta=jQuery.parseJSON(JSON);

                console.log(Respuesta);
              	data.setValue(0, 1, Respuesta[0].temperatura);
                if (Respuesta[0].humedad < 1) {
                  liquid.setValue(0, 1, 0);
                }else{
                  liquid.setValue(0, 1, Respuesta[0].humedad);
                }


                chart.draw(data, options);
                liquido.draw(liquid, options2);

            }, 1000);
          }