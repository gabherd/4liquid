$(".action-submit-login").click(()=>{
	var email = $(".email").val();
	var password = $("input[name='password']").val();
	
	$("#error-password").removeClass("error");

	$.ajax({
	    type:"POST", // la variable type guarda el tipo de la peticion GET,POST,..
	    url:"php/checkUser.php", //url guarda la ruta hacia donde se hace la peticion
	    data:{email: email, password: password}, // data recive un objeto con la informacion que se enviara al servidor
	    success:function(datos){ //success es una funcion que se utiliza si el servidor retorna informacion
			var datos = JSON.parse(datos);
			if(datos.status == 1) {
				window.location.replace("dashboard.php");
	        }else{
				$("#error-password").css("display", "block");
				$("#error-password").addClass("error");
	        }
	     }
	})
});

$(".action-submit-signup").click(()=>{
	var name = $(".name").val();
	var email = $(".email").val();
	var password = $(".password").val();
	var repassword = $(".repassword").val();

	$.ajax({
	    type:"POST", // la variable type guarda el tipo de la peticion GET,POST,..
	    url:"php/signup.php", //url guarda la ruta hacia donde se hace la peticion
	    data:{name: name, email: email, password:password}, // data recive un objeto con la informacion que se enviara al servidor
	    success:function(datos){ //success es una funcion que se utiliza si el servidor retorna informacion
	       	var datos = JSON.parse(datos);
	       	console.log(datos);
	     	if(datos.status == 1) {
				window.location.replace("dashboard.php");
	        }else{
				$("#error-password").css("display", "block");
				$("#error-password").addClass("error");
	        }
	     }
	})
});


