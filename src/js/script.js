$(document).ready(function(){
	var speed = 'fast';
	$('.reveal').on('click', function(e){
		e.preventDefault();
		$('.hidden').slideToggle(speed);
	});
});