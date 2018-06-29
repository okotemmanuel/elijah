/**
 * Libreria de funciones JS para emp para Desktop
 */
function loadEmp() {	
	initEmp();
	integratedPaymentValidation = validatePaymentEmpDesktop;
}

/**
 * Inicializacion del formulario de emp para Desktop
 */
function initEmp() {
	// Evento al quitar el foco de los inputs
	$('.empFormularioTarjeta input').off("focusout");
	
	// Ajustamos el input para guardar la tarjeta
	$('#guardarDatosTarjeta').removeClass();
	$('#guardarDatosTarjeta').show();
	$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaEmp');
}

/**
 * Validacion del formulario Emp para Desktop
 * 
 * @returns {Boolean}
 */
function validatePaymentEmpDesktop() {
	var ok = true;
	
	// Eliminamos todos los errores
	$('.empFormularioTarjeta input').removeClass('error');
	$('.empFormularioTarjeta select').removeClass('error');
	$('.empFormularioTarjeta .error').removeClass('error');
	
	if ($('.empFormularioTarjeta').find('input').val() == '') {
		ok = false; 			
		var inputEmail = $('.empEmail');
		inputEmail.addClass('error');
		inputEmail.parent().find('.obligatorio').addClass('error');
		inputEmail.parent().find('.flechaError').addClass('error');
		inputEmail.parent().find('.errorValidacionEmp').removeClass('error');
	}	 		

	return ok;
}

/**
 * Libreria de funciones JS para emp para Desktop
 */
function loadSavedEmp() {	
	copyContenidoIntegradoSaved();
	integratedPaymentValidation = validateSavedPaymentEmpDesktop;
}

/**
 * Validacion del formulario de tarjetas guardadas de Emp para Desktop
 * 
 * @returns {Boolean}
 */
function validateSavedPaymentEmpDesktop() {
	var ok = true;
	
	// Eliminamos todos los errores
	$('.empSavedFormularioTarjeta input').removeClass('error');
	$('.empSavedFormularioTarjeta select').removeClass('error');	
	$('.empSavedFormularioTarjeta .error').removeClass('error');
	
	if ($('.empSavedFormularioTarjeta').find('input').val() == '') {
		ok = false; 			
		var inputEmail = $('.empSavedEmail');
		inputEmail.addClass('error');
		inputEmail.parent().find('.obligatorio').addClass('error');
		inputEmail.parent().find('.flechaError').addClass('error');
		inputEmail.parent().find('.errorValidacionEmp').removeClass('error');
		
		inputEmail.parent().find('.obligatorio.errorValidacionEmp').hide();
	}	 		

	return ok;
}


//******************
// MOBILE METHODS
//******************

/**
 * Inicializacion del formulario de emp para Mobile
 */
function loadEmpMobile() {
	copyContenidoIntegrado();
	initEmpMobile();
	integratedPaymentValidation = validatePaymentEmpMobile;
}

/**
 * Validacion del formulario emp para Mobile
 * 
 * @returns {Boolean}
 */
function validatePaymentEmpMobile() {
	var ok = true;
	var $empFormCardInput = $('.empFormularioTarjeta input');
	var $empFormCardError = $('.empFormularioTarjeta .error');
	var $empFormCardErrorValEmp = $('.empFormularioTarjeta .errorValidacionEmp');
	
	// Eliminamos todos los errores
	$empFormCardError.addClass('collapse');
	
	// Si no se ha introducido ningún email, se muestra el error correspondiente.
	// Si ya existe el mensaje de error de validación emp, éste se elimina, para mostrar únicamente un mensaje de error. 
	if ($empFormCardInput.val() == '') {
		ok = false; 			
		$empFormCardError.removeClass('collapse');
		$empFormCardErrorValEmp.addClass('collapse');
	}
	
	return ok;
}

/**
 * Inicializacion del formulario de emp para Mobile
 */
function initEmpMobile() {
	// Evento al quitar el foco de los inputs
	$('.empFormularioTarjeta input').off("focusout");
	$('.empFormularioTarjeta input').focusout(function(event) {
		if ($(this).val() != '') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
}

/**
 * Inicializacion del formulario de emp para tarjetas guardadas Mobile
 */
function loadSavedEmpMobile() {
	copyContenidoIntegradoSaved();
	initSavedEmpMobile();
	integratedPaymentValidation = validateSavedPaymentEmpMobile;
}

/**
 * Inicializacion del formulario de emp para tarjetas guardadas Mobile
 */
function initSavedEmpMobile() {
	// Evento al quitar el foco de los inputs
	$('.empSavedFormularioTarjeta input').off("focusout");
	$('.empSavedFormularioTarjeta input').focusout(function(event) {
		if ($(this).val() != '') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
}

/**
 * Validacion del formulario emp para tarjetas guardadas Mobile
 * 
 * @returns {Boolean}
 */
function validateSavedPaymentEmpMobile() {
	var ok = true;
	var $empFormCardInput = $('.empSavedFormularioTarjeta input');
	var $empFormCardError = $('.empSavedFormularioTarjeta .error');
	var $empFormCardErrorValEmp = $('.empSavedFormularioTarjeta .errorValidacionEmp');
	
	// Eliminamos todos los errores
	$empFormCardError.addClass('collapse');
	
	// Si no se ha introducido ningún email, se muestra el error correspondiente.
	// Si ya existe el mensaje de error de validación emp, éste se elimina, para mostrar únicamente un mensaje de error. 
	if ($empFormCardInput.val() == '') {
		ok = false; 			
		$empFormCardError.removeClass('collapse');
		$empFormCardErrorValEmp.addClass('collapse');
	}
	
	return ok;
}




