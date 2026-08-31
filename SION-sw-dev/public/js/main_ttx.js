$(document).ready(function(){
  $('ul.tabs').tabs();

  $('.slider').slider({
    indicators: false
  });

  $('.modal').modal();

  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });

  $('.carousel').carousel({
    fullWidth: true,
    indicators: false,
    noWrap: true,
    shift: 50,
    dist: -10
  });

  Materialize.updateTextFields();

  $('select').material_select();

  $('.dropdown-button').dropdown();
  $('.collapsible').collapsible();

	
	$('.bar_config').sideNav({
    menuWidth: 300,
    edge: 'right',
    closeOnClick: true,
    draggable: true
	});

	$('.bar_notific').sideNav({
    menuWidth: 300,
    edge: 'right',
    closeOnClick: true,
    draggable: true
	});


  console.log('ready ...');
});
