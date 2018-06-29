/**
 * Libreria de funciones JS para GMO
 */
function loadGMO() {
	initGMO();
	
	integratedPaymentValidation = validatePaymentGMODesktop;
}

function initGMO() {
	// Ponemos el nombre de la tarjeta
	$('#gmoCardName').html($('.cuadroPago.selected').find('input:hidden').val());
	
	// Evento para formatear el numero de la tarjeta
	$('.gmo_cardnumber').off('keyup');
	$('.gmo_cardnumber').keyup(function(event) {
		var code = event.keyCode || event.which; 
		if (code  != 13 && code != 37 && code != 38 && code != 39 && code != 40 && code != 9) {
			var sep = " ";
			var reSep = new RegExp(sep, 'g');
			var value = $(this).val().replace(reSep, "");
			var newVal = "";
			for (var i = 0; i < value.length; i++) {
				if (i > 0 && (i % 4 == 0)) {
					newVal = newVal + sep;
				}
				
				newVal = newVal + value[i];
			}
			$(this).val(newVal);
		}
	});
	
	// Ajustamos el input para guardar la tarjeta
	$('#guardarDatosTarjeta').removeClass();
	$('#guardarDatosTarjeta').show();
	$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaGMO');

	// Eventos para mostrar el bocadillo de info del CVC
	$('.gmoFormularioTarjeta .CVCInfo').off("hover");	
	$('.gmoFormularioTarjeta .CVCInfo')
	.hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});	
	
	// Evento al quitar el foco de los selects
	$('.gmoFormularioTarjeta select').off("focusout");
	$('.gmoFormularioTarjeta select').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				
				// Si no quedan errores en los select eliminamos el mensaje de error
				if ($(this).parent().find('select.error').length == 0) {
					$(this).parent().find('.error').removeClass('error');
				}
			};
		};
	});
	
	// Evento al quitar el foco de los inputs
	$('.gmoFormularioTarjeta input').off("focusout");
	$('.gmoFormularioTarjeta input').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
	
	// Focus en el primer input
	$('.gmoFormularioTarjeta input').first().focusWithoutScrolling();
}

function validatePaymentGMODesktop() {
	var ok = true;
	
	// Eliminamos todos los errores
	$('.gmoFormularioTarjeta input').removeClass('error');
	$('.gmoFormularioTarjeta select').removeClass('error');
	$('.gmoFormularioTarjeta .error').removeClass('error');
	
	$('.gmoFormularioTarjeta').find('input').each(function(index, el) {
		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 		}	 		
	});
	
	$('.gmoFormularioTarjeta').find('select').each(function(index, el) {
		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 		}		 		
	});
	
	return ok;
}

function loadSavedGMO() {
	copyContenidoIntegradoSaved();
	
	initSavedGMO();
	
	integratedPaymentValidation = validateSavedPaymentGMODesktop;
}

function initSavedGMO() {
	// Eventos para mostrar el bocadillo de info del CVC
	$('.gmoSavedContent .CVCInfoSaved').off("hover");	
	$('.gmoSavedContent .CVCInfoSaved')
	.hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});	
	
	// Evento al quitar el foco de los inputs
	$('.gmoSavedContent input').off("focusout");
	$('.gmoSavedContent input').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
	
	// Focus en el primer input
	$('.gmoSavedContent input').first().focus();
}

function validateSavedPaymentGMODesktop() {
	var ok = true;
	
	$('.gmoSavedContent').find('input').each(function(index, el) {
		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 			
 			$(this).parent().find('.obligatorio.errorValidacion').hide();
 		}	 		
	});
	
	return ok;
}


function loadGMOMobile() {
	// Llamamos a la funcion del padre para copiar el contenido de GMO donde corresponda en la pagina
	copyContenidoIntegrado();
	
	falsearSelectores($('.gmoFormularioTarjeta'));
	
	integratedPaymentValidation = validatePaymentGMOMobile;
}

function validatePaymentGMOMobile() {
	var ok = true;
	
	// Eliminamos todos los errores
	$('.gmoFormularioTarjeta input').removeClass('error');
	$('.gmoFormularioTarjeta select').removeClass('error');
	$('.gmoFormularioTarjeta .error').removeClass('error');
	
	$('.gmoFormularioTarjeta').find('input').each(function(index, el) {
		$(this).parent().find('.obligatorio').addClass("collapse");
		if ($(this).val() == '') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').removeClass("collapse");
 		}	 		
	});

	$('.gmoFormularioTarjeta').find('select').each(function(index, el) {
		$(this).parent().parent().parent().find('.obligatorio').addClass("collapse");
		if ($(this).val() == '') {
			ok = false; 			
			$(this).addClass('error');
			$(this).parent().parent().parent().find('.obligatorio').removeClass("collapse");
			return false;
		}	 		
	});

	return ok;
}

function loadSavedGMOMobile() {
	// Llamamos a la funcion del padre para copiar el contenido de Klarna donde corresponda en la pagina
	copyContenidoIntegradoSaved();
	
	integratedPaymentValidation = validatePaymentSavedGMOMobile;
}

function validatePaymentSavedGMOMobile() {
	var ok = true;
	
	$('.gmoSavedContent').find('input').each(function(index, el) {
		
		$(this).parent().parent().find('.errorCVC').addClass("collapse");
 		if ($(this).val() == '') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().parent().find('.errorCVC').removeClass("collapse");
 			$(this).parent().parent().find('.errorCVCGuardada').addClass("collapse");
 		}	 		
	});
	
	return ok;
}