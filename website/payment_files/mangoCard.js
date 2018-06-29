
function loadMangoCard() {
	integratedPaymentValidation = validatePayment;
		$('body').removeClass('mango-card-saved');
		$('body').addClass('mango-card-not-saved');
}

function loadMangoCardSaved() {
	copyContenidoNoIntegradoSaved();
	integratedPaymentValidation = validatePaymentSaved;
		$('body').addClass('mango-card-saved');
		$('body').removeClass('mango-card-not-saved');
}

function loadMangoCardMobile() {
	copyContenidoIntegrado();
	integratedPaymentValidation = validatePaymentMobile;
}

function loadMangoCardMobileSaved() {
	copyContenidoNoIntegradoSaved();
	integratedPaymentValidation = validatePaymentMobileSaved;
}

// Set valor del installment
function selectInstallmentMobile(context, installmentId, available) {
	if (available) {
		$(context).parent().parent().find('.falsoCheckBg').removeClass('on');
		$(context).addClass('on');
		$(context).parent().parent().find('.falsoCheckBg').removeAttr("checked");
		$(context).attr("checked", "true");
		var input = $(context).parent().parent().find('input');
		$(input).val(installmentId);
		$(input).change();
	}
}

// Valida los radio buttons
function validatePayment() {
	if ($('#mangoCardContent input:checked').size() == 0) {
		$('#mangoCardContent .error').show();
		return false;
	}
	
	return true; 
}

function validatePaymentSaved() {
	if ($('#mangoCardSavedContent input:checked').size() == 0) {
		$('#mangoCardSavedContent .error').show();
		return false;
	}
	
	return true; 
}

function validatePaymentMobile() {
	if ($('#mangoCardMobileContent .falsoCheckBg[checked]').size() == 0) {
		$('#mangoCardMobileContent .error').show();
		return false;
	}
	
	return true; 
}

function validatePaymentMobileSaved() {
	if ($('#mangoCardSavedMobileContent .falsoCheckBg[checked]').size() == 0) {
		$('#mangoCardSavedMobileContent .error').show();
		return false;
	}
	
	return true; 
}

function installmentOnChange(context) {
	var parent = $(context).parents().find('.avisoPago');
	$(parent).find('input:checked').size() > 0 ? $(parent).find('.error').hide() : $(parent).find('.error').show();
}