/**
 * Libreria de funciones JS para Billpay
 */
function loadBillpay() {
	helperController.init();
	initBillpay();	
	integratedPaymentValidation = validatePaymentBillpayDesktop;
}

function initBillpay() {
	// Ponemos el nombre de la tarjeta
	$('#billpayCardName').html($('.cuadroPago.selected').find('input:hidden').val());	

	// Evento al quitar el foco de los selects
	$('.billpayFormularioTarjeta select').off("focusout");
	$('.billpayFormularioTarjeta select').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				
				// Si no quedan errores en los select eliminamos el mensaje de error
				if ($(this).parent().closest('div').find('select.error').length == 0) {
					$(this).parent().closest('div').find('.error').removeClass('error');
				}
			};
		};
	});
	
	// Focus en el primer select
	$('.billpayFormularioTarjeta select').first().focusWithoutScrolling();
}

function validatePaymentBillpayDesktop() {
	var ok = true;
	
	// Eliminamos todos los errores
	$('.billpayFormularioTarjeta input').removeClass('error');
	$('.billpayFormularioTarjeta select').removeClass('error');
	$('.billpayFormularioTarjeta .error').removeClass('error');	
	
	$('.billpayFormularioTarjeta').find('select').each(function(index, el) {		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().closest('div').find('.obligatorio').addClass('error');
 			$(this).parent().closest('div').find('.flechaError').addClass('error');
 		}		 		
	});   
	
	$('.billpayFormularioTarjeta').find('input').each(function(index, el) {		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().closest('div').find('.obligatorio').addClass('error');
 			$(this).parent().closest('div').find('.flechaError').addClass('error');
 		}		 		
	}); 
	
	$('.billpayFormularioTarjeta').find('input:checkbox').each(function(index, el) {		
 		if (!$(this).is(':checked')) {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().closest('div').find('.obligatorio').addClass('error');
 			$(this).parent().closest('div').find('.flechaError').addClass('error');
 		}		 		
	}); 
	
	return ok;
}

function loadBillpayMobile() {
	// Llamamos a la funcion del padre para copiar el contenido de Billpay donde corresponda en la pagina
	$(".modal__link").attr("target", "_blank");
	copyContenidoIntegrado();	
	falsearSelectores($('.contenidoTarjetaBillpay'));	
	integratedPaymentValidation = validatePaymentBillpayMobile;
}

function showBillpayDetail() {
	// Llamamos a la funcion del padre para copiar el contenido de Billpay donde corresponda en la pagina
	$billPayModalMobile = $('.billPayModalMobile');
	$billPayModalMobile.css('position','fixed');
	$billPayModalMobile.css('top','0');
	$billPayModalMobile.css('left','0');
	$billPayModalMobile.css('text-align','center');
	$billPayModalMobile.css('display','block');
	$billPayModalMobile.css('margin','0');
	$billPayModalMobile.css('width','100%');
	$billPayModalMobile.css('height','100%');
}

function checkBox(object) {
	if($(object).hasClass('on')) {
		$(object).removeClass('on');
		$('.falsoCheckInput').removeAttr('checked');
	} else {
		$(object).addClass('on');
		$('.falsoCheckInput').attr('checked', 'checked');
	}
	
}

function validatePaymentBillpayMobile() {
	var ok = true;
	
	$('.contenidoTarjetaBillpay input').removeClass('error');
	$('.contenidoTarjetaBillpay .error').removeClass("show").addClass("hide");
	
	$('.contenidoTarjetaBillpay').find('select').each(function(index, el) {		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).parent().parent().find('.error').addClass('show');
 		}	 		
	});
	
	$('.contenidoTarjetaBillpay').find('input').each(function(index, el) {		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).parent().find('.error').addClass('show');
 		}	 		
	});
	
	$('.contenidoTarjetaBillpay').find('input:checkbox').each(function(index, el) {		
 		if (!$(this).is(':checked')) {
 			ok = false; 			
 			$(this).parent().find('.error').addClass('show');
 		}		 		
	}); 

	return ok;
}

function loadBillpayPayLaterDesktop() {
	initBillpayPayLaterDesktop();
	integratedPaymentValidation = validateBillpayPayLaterDesktop;
}

function initBillpayPayLaterDesktop() {
	// Ponemos el nombre de la tarjeta
	$('#billpayCardName').html($('.cuadroPago.selected').find('input:hidden').val());	
}

function validateBillpayPayLaterDesktop() {
	var errors;
	
	billpayCheckout('validate');
	errors = billpayCheckout('getInvalidFields');
	
	return (errors.length == 0);
}

function loadBillpayPayLaterMobile() {
	initBillpayPayLaterMobile();
	integratedPaymentValidation = validateBillpayPayLaterMobile;
}

function initBillpayPayLaterMobile() {
	// Ponemos el nombre de la tarjeta
	$('#billpayCardName').html($('.cuadroPago.selected').find('input:hidden').val());	
	// Llamamos a la funcion del padre para copiar el contenido de Billpay donde corresponda en la pagina
	copyContenidoIntegrado();	
}

function validateBillpayPayLaterMobile() {
	var errors;
	
	billpayCheckout('validate');
	errors = billpayCheckout('getInvalidFields');
	
	if (errors.length == 0) { 
		$('input[data-component-id=birth-date]').val($("[name='billpay[customer_day_of_birth]']").val());
		$('input[data-component-id=holder-name]').val($("[name='billpay[account_holder]']").val());
		$('input[data-component-id=iban]').val($("[name='billpay[customer_iban]']").val());
		$('input[data-component-id=bic]').val($("[name='billpay[customer_bic]']").val());
		$('input[data-component-id=duration]').val($("[name='billpay[paylater_duration]']").val());
		$('input[data-component-id=total-amount]').val($("[name='billpay[paylater_total_amount]']").val());
		return true;
	}
	
	return false;
}