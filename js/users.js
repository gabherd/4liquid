var dataTable;
$(document).ready( function () {
    dataTable = $('#table_id').DataTable({
    	ajax: {
	        url: 'php/dashboard/getUsers.php',
	        dataSrc: ''
	    },
	     "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No hay resultado",
            "info": "Mostrando _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "search": "Buscar",
	         "paginate": {
	             "previous": 'Anterior',
	             "next":     'Siguiente'
	         }
        },
	    columns: [ 
	    	{ data: 'name' },
	    	{ data: 'email' },
	    	{
                sortable: false,
                 "render": function ( data, type, full, meta ) {
                 	if (full.admin == 0) {
                     	return "Empleado";
                 	}else{
                     	return "Administrador";
                 	}
                 }
            },
	    	{
                sortable: false,
	    		className: "dt-center", 
                 "render": function ( data, type, full, meta ) {
                 	var adminString = parseInt(full.admin) ? "empleado" : "administrador";

                    return '<div style="position: relative" id="'+full.id+'">'+
                     			'<div style="position: absolute;" class="card-options option-Admin hide"> '+
                     			'<div class="option-card delete-user">Eliminar</div>'+
                     			'<div class="option-card change-permis" data-admin="'+full.admin+'">Cambiar a '+adminString+'</div>'+
                     		'</div>'+
                     		'<img id="'+full.id+'" class="btn-account cursor" src="img/settings.svg" width="20px;"></div>';
                 }
            }
	    ]
    });
});

$(".conteiner").delegate(".change-permis", "click", function(){
	var id = $(this).parent().parent().attr("id");
	var permision = $(this).data("admin");		//la etiquita data-admin devuelve si la persona es empleado o administrador. Este dato es un boleano

	var admin = parseInt(permision) ? 0 : 1;
	var adminString = parseInt(permision) ? 'empleado' : 'administrador';

		Swal.fire({
		  title: 'Cambiar permiso',
		  text: "Asignar a "+adminString+"?",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si',
		  cancelButtonText: 'No'
		}).then((result) => {

		  if (result.value) {
		   		$.ajax({
				    type:"POST", 
				    url:"php/updateUser.php",
				    data: {id: id, admin, admin},
				    success:function(datos){ 
				       	var datos = JSON.parse(datos);
				     	if(datos.status == 1) {
				     		Swal.fire(
						      'Actualizado',
						      'El usuario se ha <b>actualizado</b> correctamente',
						      'success'
						    );
						    dataTable.ajax.reload();
						}else{
							alert(datos.detail);
				        }
				     }
				});
		  }

		});
});

$(".conteiner").delegate(".delete-user", "click", function(){
	var id = $(this).parent().parent().attr("id");

		Swal.fire({
		  title: 'Eliminar',
		  text: "Deseas eliminar a este usuario?",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si',
		  cancelButtonText: 'No'
		}).then((result) => {
		  if (result.value) {
		  		$.ajax({
				    type:"POST", 
				    url:"php/deleteUser.php",
				    data: {id: id},
				    success:function(datos){ 
				       	var datos = JSON.parse(datos);
				     	if(datos.status == 1) {
				     		Swal.fire(
						      'Eliminado',
						      'El usuario se ha <b>eliminado</b> correctamente',
						      'success'
						    );
						    dataTable.ajax.reload();
				        }else{
							alert(datos.detail);
				        }
				     }
				});
		  }
		});
});

$(".conteiner").delegate(".btn-account", "click", function(){
	let id = $(this).parent().attr("id");

	if ($("#"+id).find(".option-Admin").hasClass("hide")) {
		$("#"+id).find(".option-Admin").removeClass("hide");
		$("#"+id).find(".option-Admin").addClass("show");
		$("#"+id).find(".option-Admin").css("display", "block");
	}else{
		$("#"+id).find(".option-Admin").removeClass("show");
		$("#"+id).find(".option-Admin").addClass("hide");
		$("#"+id).find(".option-Admin").css("display", "none");
	}
});


