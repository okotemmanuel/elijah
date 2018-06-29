/**
 * Libreria de funciones JS para Klarna
 */

function loadKlarna() {
	initKlarna();
	loadIntegratedPaymentCallback = initKlarna;
	integratedPaymentValidation = validatePaymentKlarnaDesktop;
}

function initKlarna() {
	initKlarnaPopUpDirecciones();
	
	// Si hay algun error visible marcamos los inputs con error
	if ($('.klarnaBottomErrors .error:visible').size() > 0) {
		$('.klarnaInput input').addClass('error');
	}
	
	$('#klarnaForm').bind('keyup keypress', function(e){
		var code = e.keyCode || e.which; 
		if (code  == 13) {
			e.preventDefault();
			$(this).find('#btnKlarnaConfirmar').click();
			return false;
		}
	});
	
	$('#guardarDatosTarjeta').removeClass();
	$('#guardarDatosTarjeta').show();
	$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaKlarna');
	
	// El link que abre el modal de direccion de envio en caso que faltan campos obligatorios
	$('.avisoDatosClienteLink').click(function() {
		$(".cambiarDatosEnvio")[0].click();
	});
}

function validaInputsKlarna() {
	var ok = true;
	
	// Escondemos todos los errores
	$('.klarnaBottomErrors .error').hide();
	$('.klarnaBottomErrors').hide();
	
	$('.contenidoTarjetaKlarna .klarnaInput').find('input').each(function(index, el) {
		// JSF pone el name en una especie de arbol de DOM separado por ":"
		var splitted = $(this).prop('name').split(":");
		var name = splitted[splitted.length - 1];
		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$('.error-'+name).show();
 		}
 		else {
 			$(this).removeClass('error');
 			$('.error-'+name).hide();
 		}
	});
	if (!ok) $('.klarnaBottomErrors').show();
	
	var parent = $('.contenidoTarjetaKlarna');
	if (!checkForBirthDayError(parent)) ok = false;
	if (!checkForTermsError(parent)) ok = false;
		
	return ok;
}

function validaInputsKlarnaSaved() {
	var ok = true;
	
	// Escondemos todos los errores
	$('.klarnaBottomErrors .error').hide();
	$('.klarnaBottomErrors').hide();
	
	$('.klarnaSavedContent .klarnaInput').find('input').each(function(index, el) {
		
		// JSF pone el name en una especie de arbol de DOM separado por ":"
		var splitted = $(this).prop('name').split(":");
		var name = splitted[splitted.length - 1];
		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$('.error-'+name).show();
 		}
 		else {
 			$(this).removeClass('error');
 			$('.error-'+name).hide();
 		} 		 		
	});
	if (!ok) $('.klarnaBottomErrors').show();
	
	var parent = $('.klarnaSavedContent');
	if (!checkForBirthDayError(parent)) ok = false;
	if (!checkForTermsError(parent)) ok = false;
	
	return ok;
}

function validaInputsKlarnaMobile() {
	var ok = true;
	
	// Escondemos todos los errores
	$('.klarnaBottomErrors .errorPopup').hide();
	$('.klarnaBottomErrors').hide();
	
	$('.contenidoTarjetaKlarna .klarnaInput').find('input').each(function(index, el) {
		
		// JSF pone el name en una especie de arbol de DOM separado por ":"
		var splitted = $(this).prop('name').split(":");
		var name = splitted[splitted.length - 1];
 		if ($(this).val()=='') {
 			ok = false; 			
 			$('.error-'+name).show();
 		}
 		else {
 			$('.error-'+name).hide();
 		} 		 		
	});
	
	if (!ok) {
		$('.klarnaBottomErrors').show();
	}
	
	return ok;
}

function validatePaymentKlarnaSavedMobile() {
	var ok = true;
	
	$('.klarnaBottomErrors .errorPopup').hide();
	
	if ($('.personalnoSaved-input').val() == '') {
		ok = false;
		$('.klarnaBottomErrors').show();
		$('.error-obl-personalnoSaved').show();
	}
	
	return ok;
}

function validaInputsKlarnaSavedMobile() {
	var ok = true;
	
	// Escondemos todos los errores
	$('.klarnaBottomErrors .errorPopup').hide();
	$('.klarnaBottomErrors').hide();
	
	$('.klarnaSavedContent .klarnaInput').find('input').each(function(index, el) {
		
		// JSF pone el name en una especie de arbol de DOM separado por ":"
		var splitted = $(this).prop('name').split(":");
		var name = splitted[splitted.length - 1];
		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$('.error-'+name).show();
 		}
 		else {
 			$('.error-'+name).hide();
 		} 		 		
	});
	
	if (!ok) {
		$('.klarnaBottomErrors').show();
	}
	
	return ok;
}

function validaPopUpDireccionesKlarna() {
	var radios =  $('.klarnaAddresses').find('input[type="radio"]');
	
	// Si hay radiobuttons comprobamos que haya alguno seleccionado
	if (radios.length > 0) {
		var radioSelected = $('.klarnaAddresses').find('input[type="radio"]:checked');
		$('.errorDireccionKlarna').hide();
		if (radioSelected.length != 1) {
			$('.errorDireccionKlarna').show();
			return false;
		}
	}
	return true;
}

function loadSavedKlarna() {
	integratedPaymentValidation = validatePaymentKlarnaSavedDesktop;
	initKlarnaPopUpDirecciones();
	
	// Establecemos el titulo del modal en funcion del tipo de Klarna
	$('.modalDireccionesKlarnaTitulo').text($('.tarjetaGuardada.selected #nombreTarjetaGuardada').text());
	
	copyContenidoIntegradoSaved();

	// Si hay errores que se muestran marcamos en rojo los inputs
	if ($('.klarnaBottomErrors .error:visible').size() > 0) { 
		$('.klarnaInput input').addClass('error'); 
	}
	
	// El link que abre el modal de direccion de envio en caso que faltan campos obligatorios
	$('.avisoDatosClienteLink').click(function() {
		$(".cambiarDatosEnvio")[0].click();
	});
}

function initKlarnaPopUpDirecciones() {
	$('.klarnaAddress').click(function(event) {
		// Si hacemos click en la direccion es igual que hacer click en el radio button
		$(this).parent().find('input[type="radio"]').prop('checked',true);
		$(this).parent().find('input[type="radio"]').click();
	});
	
	// Se marca como checked el radio button de la direccion seleccionada (el evento mousedown se lanza antes que el evento click)
	$('input[type=radio][name=klarnaAddressSelected]').on('mousedown', function(event){
		$(this).prop('checked',true);
	});
}

function validatePaymentKlarnaDesktop() {
	var ok = true;
	
	$('.klarnaBottomErrors .error').hide();
	
	if ($('.personalno-input').val() == '') {
		ok = false;
		$('.error-obl-personalno').show();
		$('.personalno-input').addClass('error');
	}
	
	var parent = $('.contenidoTarjetaKlarna');
	if (!checkForBirthDayError(parent)) ok = false;
	if (!checkForTermsError(parent)) ok = false;
	
	return ok;
}

function validatePaymentKlarnaSavedDesktop() {
	var ok = true;
	
	$('.klarnaBottomErrors .error').hide();
	
	if ($('.personalnoSaved-input').val() == '') {
		ok = false;
		$('.error-obl-personalnoSaved').show();
		$('.personalnoSaved-input').addClass('error');
	}
	
	var parent = $('.klarnaSavedContent');
	if (!checkForBirthDayError(parent)) ok = false;
	if (!checkForTermsError(parent)) ok = false;
	
	return ok;
}

//******************
//MOBILE METHODS
//******************

function loadKlarnaMobile() {
	// Llamamos a la funcion del padre para copiar el contenido de Klarna donde corresponda en la pagina
	copyContenidoIntegrado();
	falsearSelectores($('.contenidoTarjetaKlarnaMobile .klarnaFormMobile'));
	integratedPaymentValidation = validatePaymentKlarnaMobile;
	
	// El link que abre el modal de direccion de envio en caso que faltan campos obligatorios
	$('.avisoDatosClienteLink').click(function() {
		$(".btn-default")[0].click();
	});
	checkRadioMobile();
}

function loadSavedKlarnaMobile() {
	// Llamamos a la funcion del padre para copiar el contenido de Klarna donde corresponda en la pagina
	copyContenidoIntegradoSaved();
	falsearSelectores($('.klarnaSavedContent .klarnaFormMobile'));
	integratedPaymentValidation = validatePaymentKlarnaSavedMobile;
	
	// El link que abre el modal de direccion de envio en caso que faltan campos obligatorios
	$('.avisoDatosClienteLink').click(function() {
		$(".btn-default")[0].click();
	});
	checkRadioMobile();
}

function validatePaymentKlarnaMobile() {
	var ok = true;
	
	$('.klarnaBottomErrors').hide();
	$('.klarnaBottomErrors .errorPopup').hide();
	
	if ($('.personalno-input').val() == '') {
		ok = false;
		$('.klarnaBottomErrors').show();
		$('.error-obl-personalno').show();
	}
	
	var parent = $('.contenidoTarjetaKlarnaMobile');
	if (!checkForBirthDayError(parent)) ok = false;
	if (!checkForTermsError(parent)) ok = false;
	
	return ok;
}

function validatePaymentKlarnaSavedMobile() {
	var ok = true;
	
	$('.klarnaBottomErrors').hide();
	$('.klarnaBottomErrors .errorPopup').hide();
	
	if ($('.personalno-input').val() == '') {
		ok = false;
		$('.klarnaBottomErrors').show();
		$('.error-obl-personalno').show();
	}
	
	var parent = $('.CVCTarjetaGuardada.selected');
	if (!checkForBirthDayError(parent)) ok = false;
	if (!checkForTermsError(parent)) ok = false;
	
	return ok;
}

//Al cambiar el checkbox de terminos y condiciones borramos el error si existe
function checkboxOnChange(cb) {
	if ($(cb).next().attr('checked',true)) {
		$(cb).parents().find('.error-obl-checkbox').hide();
		$(cb).next().removeClass('error');
	}
}

//Al cambiar la fecha de nacimiento borramos el error si existe
function birthDateOnChange(menu) {
	var ok = true;
	var table = $(menu).closest('#klarnaBirthDateTable');
	$(table).find('option:selected').each(function() {
		if ($(this).index() == 0) {
			ok = false;
			return false;
		}
	});
	
	if (ok) {
		var option = $(menu).find('option:selected');
		var selects = $(table).filter('select');
		$(table).next('.error-obl-klarnaBirthDateTable').hide();
		$(option).removeClass('error');
		selects.removeClass('error');
	}
}

//Check for birthdate error
function checkForBirthDayError(parent) {
	var ok = true;
	
	$(parent).find('#klarnaBirthDateTable option:selected').each(function() {
		if ($(this).index() == 0) {
			$(parent).find('#klarnaBirthDateTable option:selected').addClass('error');
			$(parent).find('.error-obl-klarnaBirthDateTable').show();	
			ok = false;
		}
	});
	
	return ok;
}

// Check for terms checkbox error
function checkForTermsError(parent) {
	if ($(parent).find('input.checkbox').length > 0) {
		if (!$(parent).find('input.checkbox')[0].checked) {
			$(parent).find('input.checkbox').addClass('error');
			$(parent).find('.error-obl-checkbox').show();
			return false;
		}
	};
	return true;
}

//Eventos definidos para los checkbox de mobile
function checkRadioMobile() {
	$('.falsoCheckBg').click(function(e) {
		if ($(this).hasClass('gender')) {
			$(this).addClass('on');
			if ($(this).hasClass('on') && $(this).parent().hasClass('klarna_gender_m')) {
				$(this).attr('checked', 'checked');
				$(this).parent().next().find('.falsoCheckBg').removeAttr("checked");
				$(this).parent().next().find('.falsoCheckBg').removeClass("on");
				$(this).parent().nextAll('input:hidden').val("M");
				$(this).parent().nextAll('input:hidden').change();
			} else if ($(this).hasClass('on') && $(this).parent().hasClass('klarna_gender_h')) {
				$(this).attr('checked', 'checked');
				$(this).parent().prev().find('.falsoCheckBg').removeAttr('checked');
				$(this).parent().prev().find('.falsoCheckBg').removeClass('on');
				$(this).parent().nextAll('input:hidden').val("H");
				$(this).parent().nextAll('input:hidden').change();
			}
		} else if ($(this).hasClass('terms')) {
			$(this).toggleClass('on');
			var $checkbox = $(this).next('input:checkbox');
			if ($(this).hasClass('on')) {
				$checkbox.prop('checked',true);
				$(this).attr('checked', 'checked');
			} else {
				$checkbox.prop('checked',false);
				$(this).removeAttr('checked','');
			}
		}
	});
}