/**
 * Libreria de funciones JS para Falcon/Adyen para Desktop
 */
function loadFalcon() {
	initFalcon();
	integratedPaymentValidation = validatePaymentFalconDesktop;
	integratedPostValidationAction = submitEncryptedFormDesktop;
}

/**
 * Inicializacion del formulario de Falcon/Adyen para Desktop
 */
function initFalcon() {
	// Ponemos el nombre de la tarjeta
	$('#falconCardName').html($('.cuadroPago.selected').find('input:hidden').val());
	$('.falconSavedContent').html('');
	
	// Evento para formatear el numero de la tarjeta
	$('.falcon_cardNumber').off('keyup');
	$('.falcon_cardNumber').keyup(function(event) {
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
	$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaFalcon');

	// Eventos para mostrar el bocadillo de info del CVC
	$('.falconFormularioTarjeta .CVCInfo').off("hover");	
	$('.falconFormularioTarjeta .CVCInfo').hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});	
	
	// Evento al quitar el foco de los selects
	$('.falconFormularioTarjeta select').off("focusout");
	$('.falconFormularioTarjeta select').focusout(function(event) {
		if ($(this).val() != '') {
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
	$('.falconFormularioTarjeta input').off("focusout");
	$('.falconFormularioTarjeta input').focusout(function(event) {
		if ($(this).val() != '') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
	
	// A�adimos los eventos para copiar el valor del select a los input hidden
	$('.selectMonth').change(function(e) {
		$('.expiryMonth').val($(this).val()); 
	});
	$('.selectYear').change(function(e) {
		$('.expiryYear').val($(this).val()); 
	});
	
	// Focus en el primer input
	$('.falconFormularioTarjeta input').first().focusWithoutScrolling();
}

/**
 * Validacion del formulario Falcon/Adyen para Desktop
 * 
 * @returns {Boolean}
 */
function validatePaymentFalconDesktop() {
	var ok = true;
	
	// Eliminamos todos los errores
	$('.falconFormularioTarjeta input').removeClass('error');
	$('.falconFormularioTarjeta select').removeClass('error');
	$('.falconFormularioTarjeta .error').removeClass('error');

	$('.falconFormularioTarjeta').find('input[data-encrypted-name]').each(function(index, el) {
		if ($(this).val() == '') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 		}	 		
		$(this).parent().find('.errorValidacionAdyen').removeClass('error');
	});
	
	$('.falconFormularioTarjeta').find('select').each(function(index, el) {
		if ($(this).val() == '') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 		}		 		
		$(this).parent().find('.errorValidacionAdyen').removeClass('error');
	});
	
	
	
	return ok;
}

/**
 * Encripta los campos del formulario para Desktop.
 * 
 * @param selectedCard 
 * 			La tarjeta seleccionada.
 */
function submitEncryptedFormDesktop(selectedCard) {
	if(selectedCard != null) {
		// A�adimos el atributo que hace que la libreria js de Adyen encripte el cvc tambien. Hacemos esto aqui en vez de en el input de la jsp porque si hay tarjetas guardadas o no, la pagina
		// renderiza varios inputs iguales con el mismo atributo, y al encriptarlo se hace mal (solo debe haber un unico input con el cvc, ya sea el de la tarjeta guardada o el de la que hay que rellenar)
		if ($('.mostrado').find('input.CVCInputAdyen').size() != 0) {
			$('#falconSavedGenerationTime').attr('data-encrypted-name', 'generationtime');
			$('#falconGenerationTime').attr('data-encrypted-name', '');	
		} else {
			$('#falconGenerationTime').attr('data-encrypted-name', 'generationtime');
			$('#falconSavedGenerationTime').attr('data-encrypted-name', '');
		}

		// the form element to encrypt
	    var form = $('.panelTarjetasForm')[0]; 
	        
	    // the public key 
	    var key = $('#pkey_' + selectedCard).val();
	    
	    // define your own encrypted field name ( this is how you receive the data )
	    var name = 'encryptedinput';         
	    
	    // Anyadida llamada al form para guardar la tarjeta
	    encryptFraudCardNumber($('#cardNumber').val());
	    
	    // the form will be encrypted before it is submitted
	    adyen.encrypt.createEncryptedForm(form, key, {name : name, onsubmit: function(e) {e.preventDefault();}, enableValidations: true});
	    
	   if(!checkInputFieldsCorrectness()){
		   return false;
	   }
	    
		
	    if ($('.mostrado').find('input.CVCInputAdyen').size() != 0) {
	    	$('#submitAdyenSaved').click();			
	    } else {
	    	$('#submitAdyen').click();
	    }
	    return true;
	}
}

/**
 * Inicializacion del formulario de tarjetas guardadas de Falcon/Adyen para Desktop
 */
function loadSavedFalcon() {
	copyContenidoIntegradoSaved();
	
	initSavedFalcon();
	
	integratedPaymentValidation = validateSavedPaymentFalconDesktop;
	integratedPostValidationAction = submitEncryptedFormDesktop;
}

/**
 * Inicializacion del formulario de tarjetas guardadas de Falcon/Adyen para Desktop
 */
function initSavedFalcon() {
	// Eventos para mostrar el bocadillo de info del CVC
	$('.falconSavedContent .CVCInfoSaved').off("hover");	
	$('.falconSavedContent .CVCInfoSaved').hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});	
	
	// Evento al quitar el foco de los inputs
	$('.falconSavedContent input').off("focusout");
	$('.falconSavedContent input').focusout(function(event) {
		if ($(this).val() != '') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
	
	// Focus en el primer input
	$('.falconSavedContent input').first().focus();
}

/**
 * Validacion del formulario de tarjetas guardadas de Falcon/Adyen para Desktop
 * 
 * @returns {Boolean}
 */
function validateSavedPaymentFalconDesktop() {
	var ok = true;

	// Eliminamos todos los errores
	$('.falconSavedContent input').removeClass('error');
	$('.falconSavedContent .error').removeClass('error');

	$('.falconSavedContent').find('.CVCInputAdyen').parent().find('.errorValidacionAdyen').removeClass('error');
	if($('.falconSavedContent').find('.CVCInputAdyen').val() == '') {
		ok = false; 			
		$('.falconSavedContent').find('.CVCInputAdyen').addClass('error');
		$('.falconSavedContent').find('.CVCInputAdyen').parent().find('.obligatorio').addClass('error');
		$('.falconSavedContent').find('.CVCInputAdyen').parent().find('.flechaError').addClass('error');		
	} else{
		$('input[data-encrypted-name="cvc"]').attr("data-encrypted-name","");
		$('.falconSavedContent').find('.CVCInputAdyen').attr("data-encrypted-name", "cvc");
	}
	
	
	
	return ok;
}

/**
 * comprueba si los campos del formulario est�n correctos despu�s de pasar la encriptaci�n de adyen.
 * @returns {Boolean}
 */
function checkInputFieldsCorrectness(){
	var ok = true;
	var inputCardNumber = $('.invalid-luhn');
	var inputCardNumberClass = inputCardNumber.attr('class');
	var parentCard = inputCardNumber.parent();
	var inputCVC =$('.invalid-cvc');
	var inputCVCClass = inputCVC.attr('class');
	var parentCVC = inputCVC.parent();
	
	if(inputCardNumberClass != null && inputCardNumberClass.search('invalid')!= -1 ){
		if(parentCard.attr('class').search('divCardNumber') != -1){
			parentCard.find('.errorInvalidCardNumber').show();
		}else{
			parentCard.find('.tarjetaInvalida').addClass('error');
			parentCard.find('.tarjetaInvalidaFlecha').addClass('error');
		}
		inputCardNumber.addClass('error');
		parentCard.addClass('error');
		ok = false;
	}
	if(inputCVCClass != null && inputCVCClass.search('invalid') != -1){
		if(parentCVC.attr('class').search('cvcTarjetaMobile') != -1){
			parentCVC.find('.invalid-cvc-adyen').show();
		}else{
			parentCVC.find('.tarjetaInvalida').addClass('error');
			parentCVC.find('.tarjetaInvalidaFlecha').addClass('error');
		}
		parentCVC.addClass('error');
		inputCVC.addClass('error');
		inputCVC.removeClass('invalid-cvc');
		ok = false;
	}
	
	return ok;
}

// ******************
//   MOBILE METHODS
// ******************

/**
 * Inicializacion del formulario de Falcon/Adyen para Mobile
 */
function loadFalconMobile() {
	// Llamamos a la funcion del padre para copiar el contenido de Falcon donde corresponda en la pagina
	copyContenidoIntegrado();
	
	falsearSelectores($('.falconFormularioTarjeta'));

	$('select').on('change', function(){
		$('.fixed').show();
	});	
	$('input, select').on('focusin', function(){
		$('.fixed').hide();
	});
	$('input, select').on('focusout', function(){
		$('.fixed').show();
	});
	
	// A�adimos los eventos para copiar el valor del select a los input hidden
	$('.selectExpiryMonth').change(function(e) {
		$('.tarjeta.selected').next().find('#expiryMonth').val($(this).val()); 
	});
	$('.selectExpiryYear').change(function(e) {
		$('.tarjeta.selected').next().find('#expiryYear').val($(this).val()); 
	});
			
	integratedPaymentValidation = validatePaymentFalconMobile;
	integratedPostValidationAction = submitEncryptedFormMobile;
	isFalconIntegrated = true;
}

/**
 * Validacion del formulario Falcon/Adyen para Mobile
 * 
 * @returns {Boolean}
 */
function validatePaymentFalconMobile() {
	var ok = true;
	
	$('.falconFormularioTarjeta input').removeClass('error');

	// Quitamos los errores que se muestren
	$('.errorInvalidCardNumber.in').collapse('hide');
	$('.errorInvalidHoldername.in').collapse('hide');
	$('.errorInvalidExpiry.in').collapse('hide');
	$('.errorInvalidCVC.in').collapse('hide');
	
	formMostrado = $('.tarjeta.selected').parent().find('.falconFormularioTarjeta');

	if ($(formMostrado).find('#cardNumber').val() == '') {
		$(formMostrado).find('.errorNumber').collapse('show');
		ok = false;
	}
	else {
		$(formMostrado).find('.errorNumber.in').collapse('hide');
		
		// Seteamos los inputs para adyen en el formulario mostrado ya que para cada tarjeta se renderiza un form distinto
		$('input[data-encrypted-name="number"]').attr("data-encrypted-name","");
		$(formMostrado).find('#cardNumber').attr("data-encrypted-name", "number");
	}	
	
	if ($(formMostrado).find('#holderName').val() == '') {
		$(formMostrado).find('.errorHoldername').collapse('show');
		ok = false;
	}
	else {
		$(formMostrado).find('.errorHoldername.in').collapse('hide');
		
		// Seteamos los inputs para adyen en el formulario mostrado ya que para cada tarjeta se renderiza un form distinto
		$('input[data-encrypted-name="holderName"]').attr("data-encrypted-name","");
		$(formMostrado).find('#holderName').attr("data-encrypted-name", "holderName");
	}
	
	if (($(formMostrado).find('#expiryMonth').val() == '') || ($(formMostrado).find('#expiryYear').val() == '')) {
		$(formMostrado).find('.errorExpiry').collapse('show');
		ok = false;
	}
	else {
		$(formMostrado).find('.errorExpiry.in').collapse('hide');
		
		// Seteamos los inputs para adyen en el formulario mostrado ya que para cada tarjeta se renderiza un form distinto
		$('input[data-encrypted-name="expiryMonth"]').attr("data-encrypted-name","");
		$('input[data-encrypted-name="expiryYear"]').attr("data-encrypted-name","");
		$(formMostrado).find('#expiryMonth').attr("data-encrypted-name", "expiryMonth");
		$(formMostrado).find('#expiryYear').attr("data-encrypted-name", "expiryYear");
	}
	
	if ($(formMostrado).find('#cvc').val() == '') {
		$(formMostrado).find('.errorCVC').collapse('show');
		ok = false;
	}
	else {
		$(formMostrado).find('.errorCVC.in').collapse('hide');
		
		// A�adimos el atributo que hace que la libreria js de Adyen encripte el cvc tambien. Hacemos esto aqui en vez de en el input de la jsp porque si hay tarjetas guardadas o no, la pagina
		// renderiza varios inputs iguales con el mismo atributo, y al encriptarlo se hace mal (solo debe haber un unico input con el cvc, ya sea el de la tarjeta guardada o el de la que hay que rellenar)
		$('input[data-encrypted-name="cvc"]').attr("data-encrypted-name","");
		$(formMostrado).find('#cvc').attr("data-encrypted-name", "cvc");
	}
	
	
	
	return ok;
}

/**
 * Encripta los campos del formulario para Mobile.
 * 
 * @param selectedCard 
 * 			La tarjeta seleccionada.
 */
function submitEncryptedFormMobile(selectedCard) {
	
	if(selectedCard != null) {
		
		if($('.falconSavedContent').find('input.CVCInputAdyen').size() != 0) {
			$('#falconSavedGenerationTime').attr('data-encrypted-name', 'generationtime');
			$('#falconGenerationTime').attr('data-encrypted-name', '');	
		} else {
			$('#falconGenerationTime').attr('data-encrypted-name', 'generationtime');
			$('#falconSavedGenerationTime').attr('data-encrypted-name', '');
		}
		
		// the form element to encrypt
	    var form = $('.FEnvioMetodosPago')[0];
	        
	    // the public key 
	    var key = $('#pkey_' + selectedCard).val();
	    
	    // define your own encrypted field name ( this is how you receive the data )
	    var name = 'falseencryptedinput'; 
	    
	    // the form will be encrypted before it is submitted
	    adyen.encrypt.createEncryptedForm(form, key, {name : name, onsubmit: function(e) {e.preventDefault();}, enableValidations: true});
	    
	    if(!checkInputFieldsCorrectness()){
	    	return false;
	    }
	    
	    if ($('.falconSavedContent').find('input.CVCInputAdyen').size() != 0) {
	    	$('#submitAdyenSaved').click();
	    } else {
	    	$('#submitAdyen').click();
	    }
	    
	    // Anyadida llamada al form para guardar la tarjeta
	    encryptFraudCardNumber($('#cardNumber').val());
	    
	    // Como la parte del DOM en la que estan los datos de la tarjeta esta en otro formulario que no es el que se submittea, obtenemos el input encryptado y lo metemos en el hidden
		// que se enviara desde el form que si hace submit
		$('#encryptedinput').val($(document).find($('input[name="falseencryptedinput"]')).val());
		return true; 
	}
}

/**
 * Inicializacion del formulario de tarjetas guardadas de Falcon/Adyen para Mobile
 */
function loadSavedFalconMobile() {
	// Llamamos a la funcion del padre para copiar el contenido de Falcon donde corresponda en la pagina
	copyContenidoIntegradoSaved();
	
	// A�adimos los eventos para mostrar/ocultar la barra de confirmacion
	$('.falconSavedContent').find('.CVCInputAdyen').on('focusin', function(){
		$('.fixed').hide();
	});
	$('.falconSavedContent').find('.CVCInputAdyen').on('focusout', function(){
		$('.fixed').show();
	});
	
	integratedPaymentValidation = validatePaymentSavedFalconMobile;	
	integratedPostValidationAction = submitEncryptedFormMobile;
}

/**
 * Validacion del formulario de tarjetas guardadas Falcon/Adyen para Mobile
 * 
 * @returns {Boolean}
 */
function validatePaymentSavedFalconMobile() {
	var ok = true;

	if ($('.tarjetaGuardadaMobile.selected').next().find('input[type="text"]').val() == '') {
		ok = false; 	
		$('.tarjetaGuardadaMobile.selected').next().find('.errorCVC').collapse('show');	
	} else{
		$('input[data-encrypted-name="cvc"]').attr("data-encrypted-name","");
		$('.tarjetaGuardadaMobile.selected').next().find('input[type="text"]').attr("data-encrypted-name", "cvc");
	}
	
	
	return ok;
}

function encryptFraudCardNumber(cardNumber) {
	$("[id$=encryptedCardNumber]").val(cardNumber);
	
}
