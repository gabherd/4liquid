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
          data.forEach((beer, index)=>{
              var day = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
              var qty = [];

              //$(".conteiner-graphs").append("<div class='graphs'><div class='titleContent'>"+beer[0].name+"</div> <canvas id='chart-beer"+beer[0].name+"' width='100%' height='35'></canvas> </div>")
              //var beerSales = document.getElementById('chart-beer'+beer[0].name).getContext('2d');
              
              $(".conteiner-graphs").append(
              '<div class="graphs">'+
                '<figure class="highcharts-figure" >'+
                    '<div id="container'+beer[0].name+'"></div>'+
                '</figure>')+
              '</div>';

              beer.forEach((date)=>{
                  qty[day.indexOf(date.date)] = date.qty;


                  salesPerWeek.forEach((obj, index)=>{
                    if (date.date == obj.name) {
                      obj.y +=  date.qty;
                      salesPerDay[index].data.push([beer[0].name, date.qty]);
                    };

                  });
              });


              for (var i = qty.length - 1; i >= 0; i--) {
                if (qty[i] == null) {
                  qty[i] = 0;
                };
              };

              graphsWeek(beer[0].name, day, qty);

              if (index == (data.length-1)) {
                graphs();
              };
          });
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
        enabled: true
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
      enabled: true
    }
  });
}

function graphsWeek(beerName, day, qty){

  Highcharts.chart('container'+beerName, {
    chart: {
        height: 200,
        type: 'line'
    },
    title: {
        text: '<div class="titleContent">'+beerName+'</div>',
        style: {
            color: '#707070',
            fontWeight: 'bold',
        }
    },
    xAxis: {
        categories: day
    },
    yAxis: {
    },

    tooltip: {  
        formatter: function () {
            return '<b>Ventas</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
    },
    series: [{
        data: qty,
        showInLegend: false
    }]
});


    
}