var prevCardPan = "";

/**
 * Libreria de funciones JS para MSU
 */
function loadMSU() {
	initMSU();
	
	integratedPaymentValidation = validatePaymentMSUDesktop;
}

function initMSU() {
	prevCardPan = "";
	
	// Ponemos el nombre de la tarjeta
	$('#msuCardName').html($('.cuadroPago.selected').find('input:hidden').val());
	
	// Evento para formatear el numero de la tarjeta
	$('.msu_cardpan').off('keyup');
	$('.msu_cardpan').keyup(function(event) {
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
	$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaMSU');

	// Eventos para mostrar el bocadillo de info del CVC
	$('.msuFormularioTarjeta .CWInfo').off("hover");	
	$('.msuFormularioTarjeta .CWInfo')
	.hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});	
	
	// Evento al quitar el foco de los selects
	$('.msuFormularioTarjeta select').off("focusout");
	$('.msuFormularioTarjeta select').focusout(function(event) {
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
	$('.msuFormularioTarjeta input').off("focusout");
	$('.msuFormularioTarjeta input').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
	
	// evento al elegir un installment
	$("input[name='installment']").click(function() {
		if ($(this).attr("checked", "checked")) {
			$('#installmentsTable').parent().find('.error').removeClass('error');
		}
		$('.campaignCode').removeAttr('checked');
		$(this).closest('tr').find('.campaignCode').attr('checked', 'checked');
	});	
	
	// Focus en el primer input
	$('.msuFormularioTarjeta input').first().focusWithoutScrolling();		
}

function validatePaymentMSUDesktop() {
	var ok = true;
	
	// Eliminamos todos los errores
	$('.msuFormularioTarjeta input').removeClass('error');
	$('.msuFormularioTarjeta select').removeClass('error');
	$('.msuFormularioTarjeta .error').removeClass('error');
	
	$('.msuFormularioTarjeta').find('input').each(function(index, el) {
		
 		if (!$(this).hasClass("campaignCode") && $(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 		}	 		
	});
	
	$('.msuFormularioTarjeta').find('select').each(function(index, el) {
		
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 		}		 		
	});
	
	// validar installments
	if (!$("input[name='installment']:checked").val()) {
	    ok = false;
		$('#installmentsTable').parent().find('.obligatorio').addClass('error');
		$('#installmentsTable').parent().find('.flechaError').addClass('error');
	}
	
	return ok;
}

function loadSavedMSU() {
	copyContenidoIntegradoSaved();
	
	initSavedMSU();
	
	integratedPaymentValidation = validateSavedPaymentMSUDesktop;
}

function initSavedMSU() {
	prevCardPan = "";
	
	// Eventos para mostrar el bocadillo de info del CW
	$('.msuSavedContent .CWInfoSaved').off("hover");	
	$('.msuSavedContent .CWInfoSaved')
	.hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});	
	
	// Evento al quitar el foco de los inputs
	$('.msuSavedContent input').off("focusout");
	$('.msuSavedContent input').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				$(this).parent().find('.error').removeClass('error');
			};
		};
	});
	
	// evento al elegir un installment
	$("input[name='installment']").click(function() {
		if ($(this).attr("checked", "checked")) {
			$('#installmentsTable').parent().find('.error').removeClass('error');
		}
		$('.campaignCode').removeAttr('checked');
		$(this).closest('tr').find('.campaignCode').attr('checked', 'checked');
	});
	
	// Focus en el primer input
	$('.msuSavedContent input').first().focus();
}

function validateSavedPaymentMSUDesktop() {
	var ok = true;
	
	$('.msuSavedContent').find('input').each(function(index, el) {
		
 		if (!$(this).hasClass("campaignCode") && $(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').addClass('error');
 			$(this).parent().find('.flechaError').addClass('error');
 		}	 		
	});
	
	// validar installments
	if (!$("input[name='installment']:checked").val()) {
	    ok = false;
		$('#installmentsTable').parent().find('.obligatorio').addClass('error');
		$('#installmentsTable').parent().find('.flechaError').addClass('error');
	}
	
	return ok;
}


function loadMSUMobile() {
	prevCardPan = "";
	
	// Llamamos a la funcion del padre para copiar el contenido de MSU donde corresponda en la pagina
	copyContenidoIntegrado();
	
	// evento al elegir un installment
	$(".rowSelect").click(function() {
		$(".rowSelect div").removeClass('trueCheckBg');
		$(".rowSelect div").addClass('falseCheckBg');
		$(this).find('div').removeClass('falseCheckBg');
		$(this).find('div').addClass('trueCheckBg');
	});
	
	falsearSelectores($('.msuFormularioTarjeta'));
	
	callbackCardChangeMSUMobile();
	
	integratedPaymentValidation = validatePaymentMSUMobile;
}

function validatePaymentMSUMobile() {
	var ok = true;
	var cardContent = $('.msuFormularioTarjeta');
	var installment = $(cardContent).find('.installmentRowSelector .on');
	
	$(cardContent).find('input, select').removeClass('error');
	
	$(cardContent).find('input').each(function(index, el) {
 		if (!$(this).hasClass("campaignCode") && $(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().find('.obligatorio').collapse('show');
 		} else {
 			$(this).parent().find('.obligatorio').collapse('hide');
 		}	
	});
	
	$(cardContent).find('select').each(function(index, el) {
 		if ($(this).val()=='') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().next().collapse('show');
 		} else {
 			$(this).parent().next().collapse('hide');
 		}		
	});
	
	// validar installments
	if ($(installment).size() == 0) {
		ok = false;
		$(installment).prev().addClass('error');
		$(cardContent).find('.errorCuotas').collapse('show');
	} else {
		$(cardContent).find('.errorCuotas').collapse('hide');
	}
	
	return ok;
}

function loadSavedMSUMobile() {
	prevCardPan = "";
	
	// Llamamos a la funcion del padre para copiar el contenido de Klarna donde corresponda en la pagina
	copyContenidoIntegradoSaved();
	
	// evento al elegir un installment
	$(".rowSelect").click(function() {
		$(".rowSelect div").removeClass('trueCheckBg');
		$(".rowSelect div").addClass('falseCheckBg');
		$(this).find('div').removeClass('falseCheckBg');
		$(this).find('div').addClass('trueCheckBg');
		
		$('.campaignCode').removeAttr('checked');
		$(this).closest('tr').find('.campaignCode').attr('checked', 'checked');		
	});
	
	integratedPaymentValidation = validatePaymentSavedMSUMobile;
}

function validatePaymentSavedMSUMobile() {
	var ok = true;
	var savedCard = $('.CVCTarjetaGuardada.selected .msuSavedContent');
	var installment = $(savedCard).find('.rowSelect .trueCheckBg');
	$(savedCard).find('input').removeClass('error');
	
	$(savedCard).find('input').each(function(index, el) {
 		if (!$(this).hasClass("campaignCode") && $(this).val() == '') {
 			ok = false; 			
 			$(this).addClass('error');
 			$(this).parent().next().collapse('show');
 		} else {
 			$(this).parent().next().collapse('hide');
 		}	 		
	});
	
	// validar installments
	if ($(installment).size() == 0) {
		ok = false;
		$(installment).prev().addClass('error');
		$(savedCard).find('.errorCuotas').collapse('show');
	} else {
		$(savedCard).find('.errorCuotas').collapse('hide');
	}
	
	return ok;
}

function triggerAjaxRequestMSU() {
	var currentCardPan = $('input.msu_cardpan').val().split(" ").join("").substring(0,6);
	
	// Solo contemplamos que hayan establecido los 6 primeros digitos, si no, es como no haber puesto nada
	if (currentCardPan.length != 6) {
		currentCardPan = "";
	}
	
	if (currentCardPan != prevCardPan) {
		prevCardPan = currentCardPan;
		return true;
	}
	
	return false;
}

function callbackCardChangeMSU() {
	if (!$("input[name='installment']:checked").size()) {
		$("input[name='installment']").first().attr('checked','checked');
	}
}

function callbackCardChangeMSUMobile() {
	$('.installmentRowSelector').click(function(event) {
		$('.installmentRowSelector .falsoCheckBg').removeClass('on');
		$(this).find(".falsoCheckBg").addClass('on');
		
		$(".installmentRowSelector input[type='radio']").prop('checked', 'false');
		$(this).find("input[type='radio']").prop('checked', 'checked');
		$('.campaignCode').removeAttr('checked');
		$(this).closest('tr').find('.campaignCode').attr('checked', 'checked');
	});
	
	if (!$("input[name='installment']:checked").size()) {
		$('.installmentRowSelector').first().click();
	}
}