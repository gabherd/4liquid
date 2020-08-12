var ctx = document.getElementById('myChart').getContext('2d');
var chart_temperature;
var chart_humid;
var mqtt;
var reconnectTimeout = 2000;

var chart_temperature = {
      "type": "gauge",
      "scale-r": {
        "aperture": 200,
        "values": "-5:20:5",
        "center": {
          "size": 5,
          "background-color": "#66CCFF #FFCCFF",
          "border-color": "none"
        },
        "ring": { //Ring with Rules
          "size": 10,
          "rules": [{
              "rule": "%v >= -5 && %v <= 0",
              "background-color": "#9498FF"
            },
            {
              "rule": "%v >= 0 && %v <= 5",
              "background-color": "#80B700"
            },
            {
              "rule": "%v >= 5 && %v <= 10",
              "background-color": "#FFB700"
            },
            {
              "rule": "%v >= 15 && %v <= 20",
              "background-color": "#00B700"
            }
          ]
        }
      },
      "plot": {
        "csize": "5%",
        "size": "100%",
        "background-color": "#000000"
      },
      "series": [{
        "values": [0]
      }]
};

var chart_humid = {
      "type": "gauge",
      "scale-r": {
        "aperture": 200,
        "values": "-5:20:5",
        "center": {
          "size": 5,
          "background-color": "#66CCFF #FFCCFF",
          "border-color": "none"
        },
        "ring": { //Ring with Rules
          "size": 10,
          "rules": [{
              "rule": "%v >= -5 && %v <= 0",
              "background-color": "#9498FF"
            },
            {
              "rule": "%v >= 0 && %v <= 5",
              "background-color": "#80B700"
            },
            {
              "rule": "%v >= 5 && %v <= 10",
              "background-color": "#FFB700"
            },
            {
              "rule": "%v >= 15 && %v <= 20",
              "background-color": "#00B700"
            }
          ]
        }
      },
      "plot": {
        "csize": "5%",
        "size": "100%",
        "background-color": "#000000"
      },
      "series": [{
        "values": [0]
      }]
};

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Barril-1', 'Barril-2', 'Barril-3', 'Barril-4', 'Barril-5', 'Barril-6'],
        datasets: [{
            label: '# of Votes',
            data: [0, 19, 3, 5, 2, 3],
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
                    beginAtZero: true
                }
            }]
        }
    }
});


//chart_humid.series[0] = { "values": [20] }
zingchart.render({
      id: 'chart-temperature',
      data: chart_temperature,
      height: "100%",
      width: "100%"
});

zingchart.render({
      id: 'chart-humid',
      data: chart_humid,
      height: "100%",
      width: "100%"
});



$(window).ready(()=>{
  MQTTconnect()
});



//---------------------Code of socket---------------------
function onConnect(){
  console.log("Connected");
  mqtt.subscribe("instalacion1/seccion1/barril/1");
}

function MQTTconnect(){
  mqtt = new Messaging.Client("broker.mqttdashboard.com", 8000, "myclientid_" + parseInt(Math.random()*100, 10));
  //document.write("connecting to " + hots);
  var options = {
    timeout: 3,
    onSuccess: onConnect,
    onFailure: onFailure
  };

  mqtt.onMessageArrived = onMessageArrived;
  mqtt.connect(options); //connect
}

function onFailure(message){
  alert("Se perdió la conexión con los sensores");
  setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(msg){
  let data = JSON.parse(msg.payloadString);
  
  chart_temperature.series[0] = { "values": [data.Temperatura] }
  chart_humid.series[0] = { "values": [data.Humedad] }

  var celcius = data.Temperatura;
  var farenheit = (data.Temperatura * 9/5) + 32;

  $("#data-temperature").text(''+celcius+'° C | '+farenheit+'° F');
  $("#data-humid").text(data.Humedad + ' %');

  if (data.Temperatura <= -5) 
  {
    $("#description-temp").text("Temperatura fria");
  }
  else if(data.Temperatura >= 0 && data.Temperatura <= 5){
    $("#description-temp").text("Temperatura adecuada");
  }
  else if(data.Temperatura >= 5 && data.Temperatura <= 10){
    $("#description-temp").text("Temperatura fria");
  }
  else if(data.Temperatura >= 10 && data.Temperatura <= 15){
    $("#description-temp").text("Temperatura fria");
  }
  else if(data.Temperatura >= 15 && data.Temperatura <= 20){
    $("#description-temp").text("Baje la termperatura!!");
  }

  $("#description-hum").text("Humedad adecuada");

  zingchart.render({
      id: 'chart-temperature',
      data: chart_temperature,
      height: "100%",
      width: "100%"
  });

  zingchart.render({
        id: 'chart-humid',
        data: chart_humid,
        height: "100%",
        width: "100%"
  });


  myChart.data.datasets[0].data[0] = data.Peso;
  myChart.update();
        //ot_msg = ot_msg + "Message recived topic " + msg.destinationName;
        //console.log(ot_msg);
}


var val1 = 10;
var val2 = 10;
var val3 = 10;
var val4 = 10;
var val5 = 10;

  setInterval(()=>{
      
      if (val1 < 1 ) { val1 = 10};
      if (val2 < 1 ) { val2 = 10};
      if (val3 < 1 ) { val3 = 10};
      if (val4 < 1 ) { val4 = 10};
      if (val5 < 1 ) { val5 = 10};

      myChart.data.datasets[0].data[1] = val1;
      myChart.data.datasets[0].data[2] = val2;
      myChart.data.datasets[0].data[3] = val3;
      myChart.data.datasets[0].data[4] = val4;

      val1 = val1 - Math.random(0, 4);
      val2 = val2 - Math.random(0, 2);
      val3 = val3 - Math.random(0, 1);
      val4 = val4 - Math.random(0, 4);

      myChart.update();
  }, 2000);
  //myChart.data.datasets[0].data[0] = 23
