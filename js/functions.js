$("#btn-user").click(()=>{
	if ($(".content-option-acount").hasClass("hide")) {
		$(".content-option-acount").removeClass("hide");
		$(".content-option-acount").addClass("show");
		$(".content-option-acount").css("display", "block");
	}else{
		$(".content-option-acount").removeClass("show");
		$(".content-option-acount").addClass("hide");
		$(".content-option-acount").css("display", "none");
	}
});



var url = window.location.href;

// passes on every "a" tag
$(".nav a").each(function() {
	// checks if its the same on the address bar
	if(url == (this.href)) {
		$(this).find(".menu-pages").addClass("active");
	}
});

$("#exit-account").click(()=>{
	window.location.href = 'php/exit.php';
});

$("#btn-navbar").click(function(){
	document.getElementById("btn-navbar").style.width = "250px";
});


var openNav = false;

$("#btn-navbar").click(()=>{
	if (openNav) {
		$(".nav").css("width", "0px");
		$(".background-nav").css("width", "0px");
		openNav = false;
	}else{
		$(".nav").css("transition", "0.3s");
		$(".nav").css("width", "50%");
		$(".background-nav").css("width", "100%");
		openNav = true;
	}
});

$(".background-nav").click(()=>{
		$(".nav").css("width", "0px");
		$(".background-nav").css("width", "0px");
		openNav = false;
});



