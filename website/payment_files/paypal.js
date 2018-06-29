/**
 * Libreria de funciones JS para Falcon/Adyen para Desktop
 */
function loadPaypal() {
	initPaypal();
}

/**
 * Inicializacion del formulario de Falcon/Adyen para Desktop
 */
function initPaypal() {
	// Se oculta y elimina el boton de guardar tpv general
	$('.guardarDatosTarjeta').not('.rememberPaypalContent').css('display','none');
	$('.guardarDatosTarjeta').not('.rememberPaypalContent').addClass('delete');	
	$('.guardarDatosTarjeta input').not('.saveCardPaypal').attr('checked',false);
	$('.guardarDatosTarjeta.delete').remove();
	
	$('.checkboxLabel').on('click',function(){
		($(this).siblings('.inputbox').click());
	});
	
	$('.moreInfo').hover(function() {
		$(this).parents('.guardarDatosTarjeta').addClass('showInfo');
	}, function() {
		$(this).parents('.guardarDatosTarjeta').removeClass('showInfo');
	});
}

//******************
//MOBILE METHODS
//******************

/**
 * Inicializacion del formulario de Paypal para Mobile
 */
function loadPaypalMobile() {
	// Se mueve el contenido integrado cargado del contenedor por defecto al contenedor de Paypal
	copyContenidoIntegrado();
	
	// Se desmarca el checkbox de guardar datos por defecto
	$("#cardContenido_paypal").find(".panelGuardarDatosTarjetaNoIntegrado").find(".falsoCheckBg").removeClass("on");
	
	// Se define el evento del click en el falso checbox de PayPal
	$('#panelInfoPaypal').click(function(e) {	
		var $this = $(this);
		var $checkbox = $this.find('input:checkbox');
		
		$this.find(".falsoCheckBg").toggleClass('on');
		if ($this.find(".falsoCheckBg").hasClass('on')) {
			$('#guardarDatosTarjeta').val(true);
		}
		else {
			$('#guardarDatosTarjeta').val(false);
		}
		
		if($checkbox.prop('checked'))	{
			$checkbox.prop('checked',false);
		} else {
			$checkbox.prop('checked',true);
		}
	});
}