var salesPerWeek = [{ name: "Lunes",  y: 0, drilldown: "Lunes" },
            { name: "Martes",  y: 0, drilldown: "Martes" },
            { name: "Miercoles",  y: 0, drilldown: "Miercoles"},
            { name: "Jueves", y: 0,  drilldown: "Jueves"},
            { name: "Viernes",  y: 0, drilldown: "Viernes"},
            { name: "Sabado",  y: 0, drilldown: "Sabado"},
            { name: "Domingo", y: 0,  drilldown: "Domingo"}];

                                               //data:["name beer", quantity of sales]
var salesPerDay = [{ name: "Lunes", id: "Lunes", data: [] },
                   { name: "Martes", id: "Martes", data: [] },
                   { name: "Miercoles", id: "Miercoles", data: [] },
                   { name: "Jueves", id: "Jueves", data: [] },
                   { name: "Viernes", id: "Viernes", data: [] },
                   { name: "Sabado", id: "Sabado", data: [] },
                   { name: "Domingo", id: "Domingo", data: [] }];

var beerName = [];
var beerQtySalesDay = [];
var beerQtySalesWeek = [];
//var summarySales = document.getElementById('chart-summarySales').getContext('2d');

sales();

//Consultas a la base de datos por las ventas realizadas por determinada fecha
function sales(){
 $.ajax({
      type:"POST", 
      url:"php/dashboard/getSalesSummary.php", 
      data:{incio: 1, fin: 2}, 
      success:function(data){ 
        data = JSON.parse(data);

        data.forEach((beer)=>{
            beerName.push(JSON.parse('{"name": "'+beer.name+'", "y": '+beer.qty+'}'));
        });
      }
  });

  $.ajax({
        type:"POST", 
        url:"php/dashboard/getSalesWeek.php", 
        data:{incio: 1, fin: 2}, 
        success:function(data){ 
          data = JSON.parse(data);
        
          data.forEach((beer)=>{
              var day = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
              var qty = [];

              $(".conteiner-graphs").append("<div class='graphs'><div class='titleContent'>"+beer[0].name+"</div> <canvas id='chart-beer"+beer[0].name+"' width='100%' height='35'></canvas> </div>")
              var beerSales = document.getElementById('chart-beer'+beer[0].name).getContext('2d');
              
              beer.forEach((date)=>{
                  qty[day.indexOf(date.date)] = date.qty;

                  salesPerWeek.forEach((obj, index)=>{
                    if (date.date == obj.name) {
                      obj.y +=  date.qty;
                      salesPerDay[index].data.push([beer[0].name, date.qty]);
                    };

                  });

              });
              graphsWeek(beerSales, day, qty);
          });
          graphs();
        }
    });
}

function graphs(){
  Highcharts.chart('chart-summarySales', {
      chart: { type: 'pie' },
      title: { text: '' },
      subtitle: { text: '' },
      accessibility: {
          announceNewData: {
              enabled: true
          },
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          series: {
              dataLabels: {
                  enabled: true,
                  format: '{point.name}: {y}'
              }
          }
      },
      series: [
          {
              name: "Ventas",
              colorByPoint: true,
              data: beerName
          }
      ],
      exporting: {
        enabled: false
      }
  });

  Highcharts.chart('chart-moreSalesDay', {
    chart: { type: 'column' },
    title: { text: '' },
    subtitle: { text: '' },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Ventas'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{y}'
            }
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:1f}</b> vendidos<br/>'
    },
    series: [
        {
            name: "Ventas completadas",
            colorByPoint: true,
            data: salesPerWeek
        }
    ],
    drilldown: {
        series: salesPerDay
    },
    exporting: {
      enabled: false
    }
  });
}

function graphsWeek(beerSales, day, qty){
    var sales = new Chart(beerSales, {
      type: 'bar',
      data: {
          labels: day,
          datasets: [{
              label: '',
              data: qty,
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(153, 102, 255)',
                  'rgb(255, 159, 64)'
              ],
              borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(153, 102, 255)',
                  'rgb(255, 159, 64)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          legend: {
              display: false

          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      min: 0,
                      stepSize: 1
                  }
              }]
          }
      }
  });
}