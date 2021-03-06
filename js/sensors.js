$(".conteiner").on("mouseenter mouseleave", ".content-barrel", function(e){
	var id = $(this).attr('id');
	if(e.type == "mouseenter"){
		$("#"+id).find(".btn-statusSensor").css("visibility", "visible");
	}else{
		var id = $(this).attr('id') ;
		$("#"+id).find(".btn-statusSensor").css("visibility", "hidden");
	}
});

$(".conteiner").delegate(".btn-statusSensor", "click", function(){
		Swal.fire({
		  title: 'Cambiar status',
		  text: "¿Pausar sensor?",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si',
		  cancelButtonText: 'No'
		}).then((result) => {

		if (result.value) {
			Swal.fire(
				'Actualizado',
			  	'El barril se ha <b>actualizado</b> correctamente',
			  	'success'
			);	 
			MQTTconnect();
			if (messageTopic) {
				messageTopic = 0;
			}else{
				messageTopic = 1;
			}
		}
	});
});

/*
$.ajax({
        type:"POST", 
        url:"php/dashboard/getBarrels.php", 
        data:{}, 
        success:function(data){ 
        	data = JSON.parse(data);
          	data.forEach((beer, index)=>{
          		if ((data.length-1) == index) {
          			$(".conteiner").append('<div id="'+index+'" class="content-barrel">'+
					'<div style="text-align: center;">'+
						'<div class="titleContent">Barril-'+(index+1)+'</div>'+
						'<div></div>'+
					'</div>'+
					'<div style="display: flex;">'+
						'<div style="margin: 10px 20px 10px 0px">'+
							'<img class="img-barrel" style="opacity: .2" src="img/barriles.svg">'+
						'</div>'+
						'<div class="content-statuBarrel">'+
							'<div>'+
								'<img class="img-status" src="img/circle-red.svg"> Inactivo'+
							'</div>'+
							'<div>Tipo de cerveza '+(index+1)+'</div>'+
						'</div>'+
					'</div>'+
					'<div class="content-changeStatus">'+
						'<button class="btn btn-success btn-statusSensor" style="visibility: hidden;">Activar</button>'+
					'</div>'+
				'</div>');
          		}else{

          		$(".conteiner").append('<div id="'+index+'" class="content-barrel">'+
					'<div style="text-align: center;">'+
						'<div class="titleContent">Barril-'+(index+1)+'</div>'+
						'<div></div>'+
					'</div>'+
					'<div style="display: flex;">'+
						'<div style="margin: 10px 20px 10px 0px">'+
							'<img class="img-barrel" src="img/barriles.svg">'+
						'</div>'+
						'<div class="content-statuBarrel">'+
							'<div>'+
								'<img class="img-status" src="img/circle-green.svg"> Activo'+
							'</div>'+
							'<div>Tipo de cerveza '+(index+1)+'</div>'+
						'</div>'+
					'</div>'+
					'<div class="content-changeStatus">'+
						'<button class="btn btn-danger btn-statusSensor" style="visibility: hidden;">Desactivar</button>'+
					'</div>'+
				'</div>');
          		}
          	});
        }
});
*/


//---------------------Code of socket---------------------

MQTTconnect();

var mqtt;
var reconnectTimeout = 2000;
var host = "broker.mqttdashboard.com";
var port = 8000;
var messageTopic = 0;

function onConnect(){
	messa = new Messaging.Message(""+messageTopic+"");
	messa.destinationName = 'barril/status/1';
	mqtt.send(messa);
}
//hola
function MQTTconnect(){
	mqtt = new Messaging.Message("broker.mqttdashboard.com", 8000, "myclientid_" + parseInt(Math.random()*100, 10));
	var options = {
		timeout : 3,
		onSuccess: onConnect
	};

	mqtt.connect(options);
}


