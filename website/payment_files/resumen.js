var primerAcceso = true;
var scrollTopValue = false;
var scrollPosition = null;

// Funcion de carga inicial que indicara el pago integrado que se instancie
var loadIntegratedPaymentCallback = null;

// Selector del contenido integrado donde debera copiarse el contenido de la jsp renderizado. Esto lo debe hacer la propia jsp que se cargue
var $divIntegradoGuardado = '.tarjetaGuardada.selected .contenidoIntegradoGuardado';

// Funcion de validacion previa al submit que cada metodo de pago integrado implementara en caso de ser necesarias validaciones propias en js 
var integratedPaymentValidation = null;

// Funcion a ejecutar despues de las validaciones correspondientes
var integratedPostValidationAction = null;

$(document).ready(function() {
	// Renderizamos el texto del CMS
	helperController.renderCMSText(); 
	
	loadAllEvents();
	checkVisiblePopup();
	// Inicializacion de Eventos generales
	setUpListeners();
	// Analitica metodo de envio por defecto. 
	defaultMethodShippment();
	// Control de Fraude
	setValueForFraud();
});


//Eventos de analitica lanzados al pulsar el boton de confirmar pago:  checkbox remember y boton confirmar pago 
function analyticsPaymentConfirm(){
	var $oTarjetasNoguardadas = $('.pm__groupCards .pm__card.selected'),
		$oTarjetasGuardadas = null, // Contenedor del checkbox recordar tarjeta
		$oRemember =  null, // Checkbox recordar tarjeta
		$oRememberVal = 'dont remember payment method'; 
	
	
	if($oTarjetasNoguardadas.length > 0){
		$namePayment =  $oTarjetasNoguardadas.data('analytics');
		$oTarjetasGuardadas = $('#guardarDatosTarjeta');
		$oRemember = $oTarjetasGuardadas.find('input');
		
		 if (($oRemember).is(":checked")) {
			 $oRememberVal = 'remember payment method';
         } 
		 // Enviamos la analitica del checkbox recordar tarjeta 
		 analyticsEvent('checkout', $oRememberVal, $namePayment, 0 , false);
	}
	
	// Enviamos la analitica del boton confirmar pago
	analyticsEvent('checkout', 'confirmar pago', '', '', false);
	
}

// Reinicia el flag de Fraude cada vez que cargamos la ficha resumen
function setValueForFraud(){
	$("input[data-component-id='cardNumberPasted']").val("false");
}

// Eventos generales
function setUpListeners(){
	//Boton aplicar codigo promocional o cheque regalo. 
	$('.promoCodeMetodosEnvio').on('click', '.promoCodeConfirmar', function(event){
		// Analitica. 
		analyticsEvent('checkout', 'codigo promocional', '', '', false);
	});
	
	// Boton cambiar direccion de envio
	$('.datosEnvioCliente').on('click', '.cambiarDatosEnvio', function(event){
		// Analitica. 
		analyticsEvent('checkout', 'edit delivery address', '', '', false);
	});
	
}

function loadAllEvents() {
	var promoflecha = $('.headerPromoCode').find('span.icono');
	$('.pm__cardContainerNotIntegrated').css('display','none');
	$('.pm__cardContainerIntegrated').css('display','none');
	$('.promoCodeMetodosEnvio').delegate('.headerPromoCode span.icono', 'click', function(event){
		event.stopPropagation();
	});
	$('.promoCodeMetodosEnvio').delegate('.headerPromoCode form', 'click', function(event) {
		event.stopPropagation();
		promoflecha.click();
	});
	$('.main-content').prepend($('.securePayment'));
	/* Al clicar en input de las tarjetas, hacemos scroll al final para ver el boton de compra */
	$('.contenidoTarjetas input').click(function(event) {
		$('html, body').animate({scrollTop:$(document).height()}, 'slow');
	});


	$('.botonEliminarGuardada').click(function(event) {
		$(this).parent().parent().parent().slideUp('slow/400/fast');
		$(this).blur();				
	});
	
	
	// Para que al clickar encima del texto de guardar tambien se marque/desmarque el check
	$('.checkboxLabel').click(function(event) {
		$('.checkGuardarDatos').click();		
	});
	
	$('.ajusteCampos select').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				
				if ($('.selectTarjetas.error').length == 0) {
					$('#errorVigencia').removeClass('error');
 					$('#errorFlechaVigencia').removeClass('error');
				}
			};
		};
	});
	
	/*Eliminar los articulos de la bolsa (visualmente)*/
	$('.contenidoAcordeon').last().prev().addClass('lastHeader');
	$('.eliminarArticulo').click(function(event) {
		$(this).closest('.articuloResBody').slideUp('slow/400/fast');
	});

	/*Efecto de mostrar imagen grande en hover de productos de la bolsa*/
	$('.bolsaPeque').hover(function() {
		$(this).next().addClass('shown');
	});
	$('.bolsaGrande').mouseout(function(event) {
		$(this).removeClass('shown');
	});
	/*BOCADILLOS INFO*/

	
	$('.CVCInfoGuardada').hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});
	/*************************************************************
							Acordeones
	*************************************************************/
	/*Funcion de ocultar/mostrar acordeones*/
	$('.headerAcordeon').click(function(event) {
		var parentAcordeonFind = $(this).parent().parent().find($('.acordeonShown'));
		if ($(this).next().hasClass('acordeonShown')) {
			parentAcordeonFind.slideToggle('slow/400/fast');
			$(this).next().removeClass('acordeonShown');
		}else{
			parentAcordeonFind.slideUp('slow/400/fast');
			parentAcordeonFind.removeClass('acordeonShown');
			$(this).next().slideToggle('slow/400/fast');
			$(this).next().addClass('acordeonShown');
		};
	});

	loadSavedCardsEvents();	
		
	/*Funcion para simular submits al pulsar anchors*/
	$.fn.submitFalso = function(form){
		$(this).click(function(event) {
			$(form).submit();
			return false;
		});
	};
	
	integratedPaymentValidation = null ;
	loadEventPagosClicks();	
	loadInputEvents();

	/* Seleccionamos por defecto la primera tarjeta o la que ya tuviera el usuario */
	seleccionaTarjetaDefecto();
	
	/* Se comprueba si es neceario mostrar los metodos de pago agrupados por tabs */
	if ($(".formasPago.tabs").length > 0)
		showPaymentMethodsInTabs();
	
	
	$('.bloqueMetodos').on('click', '.moreInfoBOPO', function(e){
		e.preventDefault();
		e.stopPropagation();
		$(".moreInfoBOPOContent").toggle();
		if($(".moreInfoBOPOContent").css('display') == 'block') $('.more-less').html('-');
		else $('.more-less').html('+');
	});
	
	// Tap Mas o menos info metodos de envio
	$('.shipment-method-js').on('click', '.shipment-more-info-icon-js, .shipment-less-info-icon-js', function(e){
		e.preventDefault();
		e.stopPropagation();

		var	$oButton = $(this),
			$oMethod = $oButton.closest('.shipment-method-js'),
			$oContainerInfo = $oMethod.find('.shipment-desc-extra-js'),
			$oContainerButtons = $oMethod.find('.shipment-more-info-js');
		 
		if($(this).hasClass('shipment-more-info-icon-js')){
			$oContainerInfo.removeClass('hidden');
			$oContainerInfo.addClass('show');
			$oContainerButtons.addClass('show');
			$oContainerButtons.removeClass('hidden');
		}
		else{
			$oContainerInfo.removeClass('show');
			$oContainerInfo.addClass('hidden');
			$oContainerButtons.addClass('hidden');
			$oContainerButtons.removeClass('show');
		}	
	});
	
	// Evitamos que el evento de los metodos de envio se propagen al hacer click en el select de franjas
	$('.shipment-method-js').on('click', '.time-range', function(e){
		e.preventDefault();
		e.stopPropagation();	
	});
	
	// Select de franjas
	$('.shipment-method-js').on('change focusout', '.time-range', function(event) {
		var fError= validateTimeRange(),
			$oSelect =  $(this),
			$dataAnalitics = $oSelect.data("analytics-id");
		
		// Si hay error lanzamos la analitica. 
		if(fError){
			analyticsEvent('form-checkout-error', 'inline validation', $dataAnalitics , '', false);
		}
	});
	
	
	// Inhabilitamos el link del logo para este paso si estamos en APP en iPad 
	if($('body').hasClass('isTabletF iDevice') ) {		
		$('.logo_menu').on('click', '.logo', function(e){ 
			e.preventDefault(); 
		});
	}
}


/* CHECKBOXES*/
/*Con esto ocultamos los checkboxes de sistema y los cambiamos por una imagen*/
$('.checkboxImg').click(function(event) {
	if ($(this).attr('src')=='img/chek_activo.png') {
		$(this).attr('src', 'img/chek_inactivo.png');
	}else{
		$(this).attr('src', 'img/chek_activo.png');
	};
});
$('.checkboxLabel').click(function(event) {
	if ($(this).prev().attr('src')=='img/chek_activo.png') {
		$(this).prev().attr('src', 'img/chek_inactivo.png');
	}else{
		$(this).prev().attr('src', 'img/chek_activo.png');
	};
});

function loadSavedCardsEvents() {
	$('.botonEliminarGuardada').click(function(event) {
		$(this).parent().parent().parent().slideUp('slow/400/fast');
		$(this).blur();				
	});
	
	$('.tarjetaGuardada').click(function(event) {
		
		// Vaciamos y ocultamos el contenido integrado
		$('.contenidoIntegrado').hide();
		$('.contenidoIntegrado').html('');
		
		$('.contenidoTarjetas').removeClass('selected');
		$('.cuadroPago.selected').removeClass('selected');
		$('[name="tarjeta"]').prop('checked', false);
		$('#guardarDatosTarjeta').hide();
		if (!$('.formasPago').hasClass('hidden_pm')) {
			$('.anadirPago .icono').addClass('lowercase');
			$('.formasPago').slideUp('slow/250/fast');
			$('.formasPago').addClass('hidden_pm');
		};
		$(this).find($('.guardadaInput')).prop('checked', true);
				
		if (($(this).find($('.CVCGuardado')).length != 0) && ($('#btnCheckoutConfirmar') != undefined)  && ($('#btnCheckoutConfirmar') != null) && ($('#btnCheckoutConfirmar').length > 0)) {
			$('#btnCheckout').hide();
			$('#btnCheckoutConfirmar').show();
			$('.textoAceptarCompra').hide();
			$('.textoConfirmarCompra').show();
		}
		else {
			$('#btnCheckout').show();
			$('.textoAceptarCompra').show();
			if (($('#btnCheckoutConfirmar') != undefined)  && ($('#btnCheckoutConfirmar') != null) && ($('#btnCheckoutConfirmar').length > 0)) {
				$('#btnCheckoutConfirmar').hide();
				$('.textoConfirmarCompra').hide();
			}
		}
		
		if (!$(this).hasClass('selected')) {
			$(this).parent().find('.loadSavedPayment').click();
			
			$($divIntegradoGuardado).html('');
			$('.tarjetaGuardada.selected').removeClass('selected');
			$(this).addClass('selected');	
			$CVCGuardado = $(this).find($('.CVCGuardado'));
			$('.tarjetaGuardada .CVCGuardado .error').removeClass('error');
			if (!$CVCGuardado.hasClass('mostrado')) {
				$CVCGuardado.show();
				$CVCGuardado.slideDown('slow/250/fast');
				$('.CVCGuardado.mostrado').slideUp('fast');	
				$('.CVCGuardado.mostrado').removeClass('mostrado');
				$('.CVCGuardado.mostrado').hide();
				$CVCGuardado.addClass('mostrado');
				$CVCGuardado.find('input').focusWithoutScrolling();
			}
		}
		
		// Si el usuario entra por primera vez al checkout, al hacer focus sobre las tarjetas automaticamente se hace scroll. 
		// De este modo las tarjetas quedan seleccionadas por defecto viendo el usuario el principio de la pantalla con sus prendas y si hay error (habra tarjeta seleccionada) si que se hara
		// scroll hacia las tarjetas para que el usuario vea directamente los errores y pueda corregirlos sin tener que navegar por la pantalla.			
		if (primerAcceso) {
			if ($('#bocataTarjeta').is(':visible')) {
				window.scrollTo(0, $('#bocataTarjeta').offset().top);
			}
		}
		
		// Se establece a false la variable que determina si es el primer acceso del usuario al checkout.
		// Esta ubicado aqui porque actualmente es la ultima funcion que se ejecuta al entrar al checkout.
		primerAcceso = false;
	});
	
	
	$('.anadirPago').off("click");
	$('.anadirPago').click(function(event) {
		var $formasPago = $('.formasPago');
		var $anidarPagoIcono = $('.anadirPago .icono');
		
		if ($formasPago.hasClass('hidden_pm')) {
			$anidarPagoIcono.removeClass('lowercase');
			$formasPago.slideDown('slow/250/fast');
			$formasPago.removeClass('hidden_pm');
		}else{
			$anidarPagoIcono.addClass('lowercase');
			$formasPago.slideUp('slow/250/fast');
			$formasPago.addClass('hidden_pm');
		};
		
		// Si estan las tabs activadas se selecciona la primera tab al depslegar mas metodos de pago
		if ($(".formasPago.tabs").length > 0) {
			$(".pmGroup0 .cuadroPago").click();
		}
		
		$('#mangoCardContent').html('');
	});
}


function defaultMethodShippment(){
	var $oMethodSelected = $('.metodosEnvio .bloqueMetodos.metodoSelected'),
		$dataAnalitics = $oMethodSelected.data("analytics-id");

		analyticsEvent('checkout', 'default delivery method', $dataAnalitics , '', true);
}

/**
 * Metodo para controlar si se ha introducido un vale
 * @returns {Boolean}
 */
function click_isFieldValeEmpty(){
	if($('.inputVale').val() == '' || $('.inputVale').val() == null || $('.inputVale').val() == 'undefined'){
		$('.inputVale').addClass('error');
		ocultarInfoPopup();
		$('#valeEmpty').show();
		return false;
	}
	return true;
}

/**
 * Metodo para controlar si se ha introducido un vale
 * @returns {Boolean}
 */
function click_isFieldValeEmpleadoEmpty(){
	if($('.promoCodeCodeEmpleado').val() == '' || $('.promoCodeCodeEmpleado').val() == null || $('.promoCodeCodeEmpleado').val() == 'undefined'){
		$('.promoCodeCodeEmpleado').addClass('error');
		ocultarInfoPopup();
		$('#promoCodeEmpleadoEmpty').show();
		return false;
	}
	return true;
}

/**
 * Metodo para controlar si se ha introducido un dni y un apellido
 * @param id
 * @returns {Boolean}
 */
function click_areFieldsCompraEmpleadoEmpty(dni, apellido, dia, mes, ano, msgDni, msgApellido, msgFecha, empleadoEspanya){		
	var ok = true;
	var valorApellido = document.getElementById(apellido).value;	
	//El apellido siempre lo chequeamos porque es comun en todas las compra empleado (PALAU/NO PALAU)
	if(valorApellido == '' || valorApellido == null || valorApellido == 'undefined'){
		$('.inputEmpleadoApellido').addClass('error');
		ocultarInfoPopup();
		$('#'+msgApellido).show();
		ok =  false;
	}
	else {
		$('.inputEmpleadoApellido').removeClass('error');
		$('#'+msgApellido).hide();
	}
	if(empleadoEspanya == 'false'){
		var diaFecha = document.getElementById(dia).value;
		var mesFecha = document.getElementById(mes).value; 
		var anoFecha = document.getElementById(ano).value;
		var errorFecha = false;
		
		if (diaFecha == '' || diaFecha == null || diaFecha == 'undefined') {
			var d = document.getElementById(dia);
			var dclass = d.className;
			if (dclass.indexOf("error") == -1)
				d.className = dclass + ' error';
			errorFecha = true;
		}
		else 
			document.getElementById(dia).className = document.getElementById(dia).className.replace("error", "");
		
		
		if (mesFecha == '' || mesFecha == null || mesFecha == 'undefined') {
			var m = document.getElementById(mes);
			var mclass = m.className;
			if (mclass.indexOf("error") == -1)
				m.className = mclass + ' error';
			errorFecha = true;
		}
		else
			document.getElementById(mes).className = document.getElementById(mes).className.replace("error", "");
		
		if (anoFecha == '' || anoFecha == null || anoFecha == 'undefined') {
			var a = document.getElementById(ano);
			var aclass = a.className;
			if (aclass.indexOf("error") == -1)
				a.className = aclass + ' error';
			errorFecha = true;
		}
		else
			document.getElementById(ano).className = document.getElementById(ano).className.replace("error", "");
		
		if (errorFecha) {
			ocultarInfoPopup();
			$('#'+msgFecha).show();
			ok = false;
		}
			
		else 
			$('#'+msgFecha).hide();
		
	}else{
		var valorDni = document.getElementById(dni).value;
		if(valorDni == '' || valorDni == null || valorDni == 'undefined'){
			$('.inputEmpleadoDni').addClass('error');
			ocultarInfoPopup();
			$('#'+msgDni).show();
			ok = false;
		}
		else {
			$('.inputEmpleadoDni').removeClass('error');
			$('#'+msgDni).hide();
		}
	}	
	return ok;
}


/**
 * Definimos los eventos click para la parte de tansportistas. Hay que llamar siempre a este metodo siempre que se ejecute un ajax, y redibuje una seccion de la jsp que previamente se haya modificado con esta funcion
 */
function loadEventTransportesClicks(){

	$('.bloqueMetodos').find($('input')).each(function(index, el) {
        $(el).click(function(event) {
	        event.stopPropagation();
        });
	});
	$('.bloqueMetodos:not(".metodoSelected")').click(function(event) {
		var $oMethod = $(this),
			$dataAnalitics = $oMethod.data("analytics-id");
		
		$('.metodoSelected').removeClass('metodoSelected');
		$oMethod.addClass('metodoSelected');
		$oMethod.find($('input')).prop('checked', true);
		$oMethod.find($('input')).click();
		
		analyticsEvent('checkout', 'change delivery method', $dataAnalitics , '', false);
	});

	$('.infoEnvio').hover(function() {
		$(this).parent().find('.flechaBocadillo').addClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').addClass('showBocadillo');
	}, function() {
		$(this).parent().find('.flechaBocadillo').removeClass('showBocadillo');
		$(this).parent().find('.bocadilloEnvio').removeClass('showBocadillo');
	});
	$('.moreInfo').hover(function() {
		$(this).siblings('.moreInfoContainer').css('opacity','1');
		$(this).siblings('.moreInfoContainer').css('visibility','visible');
		$(this).siblings('.moreInfoContainer').css('top','-10px');
		$(this).siblings('.moreInfoArrow').css('opacity','1');
		$(this).siblings('.moreInfoArrow').css('visibility','visible');
		$(this).siblings('.moreInfoArrow').css('top','10px');
		
	}, function() {
		$(this).siblings('.moreInfoContainer').css('opacity','0');
		$(this).siblings('.moreInfoContainer').css('visibility','hidden');
		$(this).siblings('.moreInfoArrow').css('opacity','0');
		$(this).siblings('.moreInfoArrow').css('visibility','hidden');
	});
}

loadEventTransportesClicks();


//Comprueba si el popup de Transportes secundarios esta visible y en primer plano para posicionarlo correctamente. 
function checkVisiblePopup(){
		
	$("body").removeClass("bodyOverflowHidden");
	var $modalTransporte = $(".modalSeleccionTransporte");
	var $body = $("body");
	var $modalBackground = $(".modalBackground");
	var $modalBackgroundWhite = $(".modalBlockBack.modalSelecTransporte.mostrarModal");		
	
	
	if($modalTransporte.length > 0 && $modalTransporte.find(".modalNew").hasClass("mostrarModal")){ 
	var scrollPositionTop = scrollTopDefinied();
		$modalBackground.css({top: scrollPositionTop + "px"});		
		resetScrollIE();
		$(".modalBackground").addClass("modalBackgroundShow");
		loadEventTransportesClicks();
		$body.addClass("bodyOverflowHidden");
		
		if( $(".modalNew.modalDirEnvio").hasClass("mostrarModal")){
			$modalBackground.addClass("modalSegundoPlano");
			$modalBackgroundWhite.addClass("hiddenBackgroundPopUp");
		}
	}
	else if($modalTransporte.length > 0 && $modalTransporte.find(".modalNew").not("mostrarModal") ){
		$body.removeClass("bodyOverflowHidden");
		$(".modalBackground.modalBackgroundShow").removeClass("modalBackgroundShow");
		
	}
}
// Quita las propiedades necesarias para recuperar el scroll del body ocultar el modal de Transportes Secundarios
function closePopupEntregas(){
	$("body").removeClass("bodyOverflowHidden");
	$(".modalBackground.modalBackgroundShow").removeClass("modalBackgroundShow");
	scrollTopValue = false;
}

// Quita al modal Transporte las propiedades para ponerlo en primer plano de nuevo y posicionarlo nuevamente si el scroll a variado 
function backgroundModalTransportes(){ 
	$body = $("body");
	$modalBackground = $(".modalBackground");
	$modalTransporte = $(".modalBackground.modalBackgroundShow.modalSegundoPlano");
	$modalBackgroundWhite = $(".modalBlockBack.modalSelecTransporte.mostrarModal");
	
	$modalBackgroundWhite.removeClass("hiddenBackgroundPopUp");
	$modalTransporte.removeClass("modalSegundoPlano");
	
}

// Identifica si el navegador es IE para posicionar el scroll al principio de la pagina y evitar el bug de scrollTop al recargar en IE9+
function resetScrollIE(){
	if(navigator.appVersion.indexOf("Trident")!=-1){
			window.onbeforeunload = function(){ window.scrollTo(0,0); }
			scrollPosition = 0;
		}
}
// Define el valor top para posicionar el popup transportes secundarios. 
function scrollTopDefinied(){
	if(scrollTopValue == false){
		scrollPosition = $(document).scrollTop();	
		scrollTopValue = true;
	}
	return scrollPosition;
}

/**
 * Funcion para validar la parte del TPV.
 * @returns {Boolean}
 */
function validaPago() {
	mostrarInfoPopup();
	
	// Pasamos las validaciones propias del metodo integrado en caso de haberlas
	if (integratedPaymentValidation != null) {
		var okIntegrado = integratedPaymentValidation();
		if (!okIntegrado) {
			return false;
		}
	}
	
	var tarjeta = document.getElementsByName('tarjeta');
	var tarjetasGuardadas = document.getElementsByName('radioPago');
	var ok = false;
	var hasTarjetaSeleccionada = !((tarjeta.length == 0) && (tarjetasGuardadas.length == 0));
	var tarjetaSelect = null;
	
	if (!ok) {
		for (var i=0; i<tarjeta.length; i=i+1) {
			if (tarjeta[i].checked)	{		
				tarjetaSelect = tarjeta[i].value;
				ok = true;
				break;
			}
		}
	}
	
	if (!ok) {
		// Si no hay ninguna tarjeta seleccionada comprobamos las tarjetas guardadas
		for (var i=0; i<tarjetasGuardadas.length; i=i+1) {
			if (tarjetasGuardadas[i].checked) {
				tarjetaSelect = tarjetasGuardadas[i].value;
				ok = true;
				break;
			}
		}
	}	
	
	if(!hasTarjetaSeleccionada && !ok){
		ok = true;
	}
	if (!ok) {
		$('#bocataPago').show();
	}
		
	if(!hasTarjetaSeleccionada && !ok){
		ok = true;
	}
	if (!ok) { //Solo ocultamos el div si la validacion del pago es ko. Para evitar double clicks en el boton comprar y generar N pedidos (N = numero de clicks)		
		ocultarInfoPopup();
	}	
	
	// Ejecucion de la funcion integrada posterior a la validacion del formulario
	if (ok && hasTarjetaSeleccionada && integratedPostValidationAction != null) {
		ok = integratedPostValidationAction(tarjetaSelect);
	}
	
	return ok;
}

// Al pulsar el boton confirmar pago en caso de contenga franjas se evalua el valor del campo y manda analitica en caso de error
function shipmentValidate(){
	var fError = validateTimeRange(),
		$oSelect =  $('.bloqueMetodos.metodoSelected').find('.time-range'),
		$dataAnalitics = $oSelect.data("analytics-id");
	
	if(fError){
		window.scrollTo(0, $('.bloqueMetodos.metodoSelected').offset().top - 100);
		analyticsEvent('form-checkout-error', 'post validation', $dataAnalitics , '', false);
	}
	
	return fError;
}

// Evalua el select de franjas y segun el caso muestra o oculta el error
function validateTimeRange(){
	var $oSelect =  $('.bloqueMetodos.metodoSelected').find('.time-range');

	if ($oSelect.lenght != 0){
		if($oSelect.val() === ''){
			$oSelect.addClass('error');
			$('#error-time-range').removeClass('hidden');
			return true;
		}
		else{
			$oSelect.removeClass('error');
			$('#error-time-range').addClass('hidden');
			return false;
		}	
	}
}

function loadEventPagosClicks(){	
	
	/*Pagos*/
	$('.cuadroPago').click(function(event) {
		
		if (!$(this).hasClass('selected')) {
			// Se deben resetear los eventos asociatos a las pasarelas integradas
			// Solo cuando se cambia de tarjeta, si se clica la misma no (FIX #32268)
			loadIntegratedPaymentCallback = null;
			integratedPaymentValidation = null;
			integratedPostValidationAction = null;

			$(this).parent().find('.loadPayment').click();
			$('.cuadroPago.selected').removeClass('selected');
			$(this).addClass('selected');
		};
		
		$('.contenidoIntegrado').show();
		
		$('.CVCGuardado.mostrado').slideUp('slow/400/fast');
		$('.CVCGuardado.mostrado').removeClass('mostrado');
		
		$("#tarjeta_texto").val($(this).find('input[type="radio"]').prev('input[type="hidden"]').val());
	
		$('.tarjetaGuardada.selected').removeClass('selected');		
		$('.guardadaInput').prop('checked', false);
		
		return false;
	});
}

function loadEventClickDivBlockTiendasFisicas(){	
	$('div[id$="popupEnvioTIenda"]').click(function(event) {	        		        	
		$('img[id*="SVEnvioTienda:close"]').click();	               	
	});
}

function seleccionaTarjetaDefecto() {	
	var tarjetaSeleccionada = $('#tarjetaSeleccionada').val();
	var tarjetaSeleccionadaGuardada = $('#tarjetaSeleccionadaGuardada').val();
	
	// Si no hay tarjeta seleccionada seleccionamos la primera por defecto. Si ya hubiera una seleccionada se mostrara automaticamente porque sera a causa de algun error que se haya producido
	if ((tarjetaSeleccionada == '') && (tarjetaSeleccionadaGuardada == '')) {
		if ($('.tarjetaGuardada').size() > 0) {
			$('.tarjetaGuardada').first().click();
		}
		
		else {
			if (!$('.formasPago').hasClass('pmGroupCard') || $('.formasPago').hasClass('tabs')){
				$('.cuadroPago').first().click();
				
			}else{
				$('.pm__cardContainerNotIntegrated').css('display','none');
			}
		}
	}
	
	else if (tarjetaSeleccionadaGuardada != '' && ($(".tarjetaGuardada").size() > 0)) {
		$('.tarjetaGuardada').find('input[value="'+tarjetaSeleccionadaGuardada+'"]').click();
	}
	
	else {
		
		var encontrada = false;
		$('.cuadroPago').each(function(index, el) {
			var tarjetaSeleccionadaNombre = $('#tarjetaSeleccionadaNombre').val();
			var name = $(this).find('input[type="hidden"][value="'+tarjetaSeleccionadaNombre+'"]');
			var id = $(this).find('input[type="radio"][name="tarjeta"][value="'+tarjetaSeleccionada+'"]');
			
			if ((name.size() > 0) && (id.size() > 0)) {
				encontrada = true;
				if ($('.formasPago').hasClass('hidden_pm'))
					setTimeout(function(){ $('.anadirPago').click(); }, 100);
				$(this).click();
			}
		});
		
		// Si la tarjeta seleccionada previa ya no se muestra seleccionamos la primera
		if (!encontrada) {
			if ($('.tarjetaGuardada').size() > 0) {
				$('.tarjetaGuardada').first().click();
			}
			
			else {
				if (!$('.formasPago').hasClass('pmGroupCard') || $('.formasPago').hasClass('tabs')){
					$('.cuadroPago').first().click();
				}else{
					$('.pm__cardContainerNotIntegrated').css('display','none');
				}
			}
		}
	}
	
	primerAcceso = true;
}
//

function uncheckRadio(element) {
	$(document).find('input[name="radioPago"][value="'+element+'"]').attr('checked', false);
	
	if ($('.tarjetaGuardada:visible').size() == 0) {
		$('.anadirPago').click();
		$('.cuadroPago').first().click();
	}
}


function showContenidoTarjeta() {
	var $cuadroPagoSelected = $('.cuadroPago.selected');
	var $contenidoIntegrado = $('.contenidoIntegrado');
	var $modalTransporte = $(".modalBackground.modalBackgroundShow");
	var $blockBackGround = $(".blancoModal.abierto");
	
	controladorContenidoTarjetas($cuadroPagoSelected);
	
	// Se marca como checked el metodo de pago seleccionado y se hace foco sobre el primer input
	$cuadroPagoSelected.find('input[type="radio"]').prop('checked',true);
	if ($contenidoIntegrado.find('input:visible').length > 0 &&  $blockBackGround.length == 0 ){
		if($modalTransporte.length == 0){
			$contenidoIntegrado.find('input:visible').first().focusWithoutScrolling();
		}
	}
	
	// Se desplaza el contenido de las tarjetas entre los diferentes metodos de pago agrupados
	if ($('.formasPago').hasClass('pmGroupCard') || $('.formasPago').hasClass('tabs')) {
		var $cardContainer = $cuadroPagoSelected.parents('.pm__groupCards').next().find('.pm__groupContainerCell');
		if($cardContainer.is(':empty')) {
			$('.pmCardContainer').detach().appendTo($cardContainer);
		}
	}
}

function controladorContenidoTarjetas(element) {
	
	var card = $(element).find('input:radio').val();
	
	// Ocultamos todos los bocadillos
	$('#bocataTarjetaExpress').hide();
	$('#bocataTarjetaNextDay').hide();
	$('#avisoPagoTransferencia').hide(); 
	$('#avisoPagoContrarembolso').hide();
	$('#avisoFalcon').hide();
	$('#formularioTarjeta').hide();
	$('#btnCheckout').show();
	$('.textoAceptarCompra').show();
	$('#textoCondicionesTarjeta').hide();
	$('#mangoCardContent').hide();
		
	if (($('#btnCheckoutConfirmar') != undefined)  && ($('#btnCheckoutConfirmar') != null) && ($('#btnCheckoutConfirmar').length > 0)) {
		$('#btnCheckoutConfirmar').hide();
		$('.textoConfirmarCompra').hide();
	}
	$('.checkGuardarDatos').removeClass('checkGuardarDatosAdyen');
	// #1878, #1885, #1893: modificado por Kike. Cuando sea ELV, Sofort, Giropay, Trustpay con envio Express48h debe salir un mensaje informativo distinto al de transferencia
	if(card.indexOf('trans') != -1) {
		if (($('#btnCheckoutConfirmar') != undefined)  && ($('#btnCheckoutConfirmar') != null) && ($('#btnCheckoutConfirmar').length > 0)) {
			$('#btnCheckout').hide();
			$('#btnCheckoutConfirmar').show();
			$('.textoAceptarCompra').hide();
			$('.textoConfirmarCompra').show();
		}
		
		$('#avisoPagoTransferencia').show(); // Texto especifico y unico para transferencia
		if ($('#transporteTipo').val() == 'E'){
			$('#bocataTarjetaExpress').show(); // Texto comun para los tipos de pago con delay al pagar(No instantaneos)			                      
		} 
		else if($('#transporteTipo').val() == 'N'){
			$('#bocataTarjetaNextDay').show(); // Texto comun para los tipos de pago con delay al pagar(No instantaneos)			                              
		}
		
		// Si esta el check de guardar datos de tarjeta lo mostramos com el mismo margen que el contenido anterior mostrado
		if ($('#guardarDatosTarjeta').length > 0) {
			$('#guardarDatosTarjeta').removeClass();
			$('#guardarDatosTarjeta').show();
			$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaTransferencia');
		}
	}
	else if ((card.indexOf('dotpay') != -1 || card.indexOf('elv') != -1 || card.indexOf('sepadirectdebit') != -1 || card.indexOf('sofort') != -1 || card.indexOf('giropay') != -1 || card.indexOf('trustpay') != -1) && $('#transporteTipo').val() == 'E') {               
		$('.contenidoTarjetas').addClass('selected');
        // Ocultamos los posibles paneles abiertos			
		var texto = $(element).find('input:hidden').val();		
		$('#CardName').html(texto);
		$('#textoCondicionesTarjeta').show();
		$('#bocataTarjetaExpress').show();
		
		// Si esta el check de guardar datos de tarjeta lo mostramos com el mismo margen que el contenido anterior mostrado
		if ($('#guardarDatosTarjeta').length > 0) {
			$('#guardarDatosTarjeta').removeClass();
			$('#guardarDatosTarjeta').show();
			$('#guardarDatosTarjeta').addClass('guardarDatosTarjeta');
		}
	}
	else if ((card.indexOf('dotpay') != -1 || card.indexOf('elv') != -1 || card.indexOf('sepadirectdebit') != -1 || card.indexOf('sofort') != -1 || card.indexOf('giropay') != -1 || card.indexOf('trustpay') != -1) && $('#transporteTipo').val() == 'N') {               
        $('.contenidoTarjetas').addClass('selected'); 
        // Ocultamos los posibles paneles abiertos			
		var texto = $(element).find('input:hidden').val();		
		$('#CardName').html(texto);
		$('#textoCondicionesTarjeta').show();
		$('#bocataTarjetaNextDay').show();
		
		// Si esta el check de guardar datos de tarjeta lo mostramos com el mismo margen que el contenido anterior mostrado
		if ($('#guardarDatosTarjeta').length > 0) {
			$('#guardarDatosTarjeta').removeClass();
			$('#guardarDatosTarjeta').show();
			$('#guardarDatosTarjeta').addClass('guardarDatosTarjeta');
		}
	}
	else {		
		var texto = $(element).find('input:hidden').val();	
		
		if(card.indexOf('trans') != -1) {//Mensaje para transferencias
			$('#avisoPagoTransferencia').show();	
			
			// Si esta el check de guardar datos de tarjeta lo mostramos com el mismo margen que el contenido anterior mostrado
			if ($('#guardarDatosTarjeta').length > 0) {
				$('#guardarDatosTarjeta').removeClass();
				$('#guardarDatosTarjeta').show();
				$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaTransferencia');
			}
			if (($('#btnCheckoutConfirmar') != undefined)  && ($('#btnCheckoutConfirmar') != null) && ($('#btnCheckoutConfirmar').length > 0)) {
				$('#btnCheckout').hide();
				$('#btnCheckoutConfirmar').show();
				$('.textoAceptarCompra').hide();
				$('.textoConfirmarCompra').show();
			}
		}
		else if(card.indexOf('Reembolso') != -1) {//Mensaje para contrareembolso
			$('#avisoPagoContrarembolso').show();	
			
			// Si esta el check de guardar datos de tarjeta lo mostramos com el mismo margen que el contenido anterior mostrado
			if ($('#guardarDatosTarjeta').length > 0) {
				$('#guardarDatosTarjeta').removeClass();
				$('#guardarDatosTarjeta').show();
				$('#guardarDatosTarjeta').addClass('guardarDatosTarjetaContrareembolso');
			}
		}
		else if($('.pm__card.falconNoIntegrated.selected').length > 0){
			$('#avisoFalcon').show();	
		} else if(card.indexOf('mango_card') != -1) { 
			$('#mangoCardContent').show();
		}else {
			$('#textoCondicionesTarjeta').show();			
		}


		
		
		$('#CardName').html(texto);	
	}
	
	// Si el usuario entra por primera vez al checkout, al hacer focus sobre las tarjetas automaticamente se hace scroll. 
	// De este modo las tarjetas quedan seleccionadas por defecto viendo el usuario el principio de la pantalla con sus prendas y si hay error (habra tarjeta seleccionada) si que se hara
	// scroll hacia las tarjetas para que el usuario vea directamente los errores y pueda corregirlos sin tener que navegar por la pantalla.			
	if (primerAcceso) {
		if ($('#bocataTarjeta').is(':visible')) {
			window.scrollTo(0, $('#bocataTarjeta').offset().top);
		}
	}
	
	// Se establece a false la variable que determina si es el primer acceso del usuario al checkout.
	// Esta ubicado aqui porque actualmente es la ultima funcion que se ejecuta al entrar al checkout.
	primerAcceso = false;
}

function loadInputEvents() {
	$('input').focusout(function(event) {
		if ($(this).val()!='') {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
				
				if ($(this).hasClass('numTarjetaInput')) {
					if ($('.numTarjetaInput.error').length == 0) {
						$('#errorNumber').removeClass('error');
	 					$('#errorFlechaNumber').removeClass('error');
					}
				}else{
					$(this).next().removeClass('error');
					$(this).next().next().removeClass('error');
				};
			};
		};
		
		// Evitamos que si se anyade mas veces el evento no se ejecute ese numero de veces (solo 1 vez)
		return false;
	});
}

function loadIntegratedPayment() {
	// Si esta definida la funcion de carga del pago integrado se invoca
	if (loadIntegratedPaymentCallback != null) {
		loadIntegratedPaymentCallback();
	}
}

function copyContenidoIntegradoSaved() {	
	var $sourceSelector = $('.sourceContenidoIntegradoGuardado').children();
	$($divIntegradoGuardado).html($sourceSelector);
	$('.sourceContenidoIntegradoGuardado').html('');
}

function copyContenidoNoIntegradoSaved() {	
	var $sourceSelector = $('.sourceContenidoNoIntegradoGuardado').children();
	$($divIntegradoGuardado).html($sourceSelector);
	$('.sourceContenidoNoIntegradoGuardado').html('');
}

// Funcion encargada de mostrar la agrupacion de los metodos de pago en tabs
function showPaymentMethodsInTabs() {
	
	// Se crea el contenedor de las tabs
	var $formasPago = $(".formasPago");
	$formasPago.prepend("<div id='tabs'></div>");
	
	var $tabs = $("#tabs");
	var $titles = $formasPago.find(".pmGroupTitle");
	var $contentTabs = $(".pmGroup");
	
	// Se mueven los titulos de las agrupaciones al contenedor de tabs
	$titles.each(function(i) {
		
		var $this = $(this);
		
		// Se abre por defecto la primera tab
		if (i == 0) {
			$this.addClass("selected");
			$this.parent().addClass("selected");
		}
		
		// Se identifica si la agrupacion tiene un unico metodo de pago
		var $currentPmGroup = $this.parent();
		if ($currentPmGroup.find('.cuadroPago').length == 1) {
			$currentPmGroup.addClass("oneCuadroPago");
		}
		
		// Se define el matching entre tabs y agrupaciones
		$this.data("pm-group",i);
		$currentPmGroup.addClass("pmGroup"+i);
		$currentPmGroup.data("pm-group",i);
		
		// Se efectua el movimiento de los titulos al contenedor de tabs 
	    $tabs.append($this);

	});
	
	// Si hay algun metodo de pago seleccionado se abre por defecto la tab correspondiente
	if($('.cuadroPago.selected').length > 0) {
		var iCurrentGroup = $('.cuadroPago.selected').parents('.pmGroup').data("pm-group");
		$titles.removeClass('selected');
		$contentTabs.removeClass('selected');
		$titles.eq(iCurrentGroup).addClass("selected");
		$contentTabs.eq(iCurrentGroup).addClass("selected");
	}
	
	// Se define el evento al clickar en las tabs.
	// En el caso de que unicamente exista un unico metodo de pago, este se selecciona  
	var $pmGroupTitle = $(".pmGroupTitle"); 
	$pmGroupTitle.on("click", function() {
		var $this = $(this);
		
		if (!$this.hasClass("selected")) {
			var i = $this.data("pm-group");
			
			$titles.removeClass('selected');
			$contentTabs.removeClass('selected');
			
			$this.addClass("selected");
			$(".pmGroup"+i).addClass("selected");
			
			var $currentPmGroup = $(".pmGroup"+i).find('.cuadroPago');
			if ($currentPmGroup.length == 1 && !$currentPmGroup.hasClass("selected") ) {
				$(".pmGroup"+i+" .cuadroPago").click();
			}
		}	
	});
}

// Redimensiona el popup con la altura de la ventana del navegador del usuario
function modalResize(){
	// Inciamos las variables
	var $sWindowSize = null; // altura actual de la ventana del cliente
		$omodal = null; // modal actual
		$sPositionTop = null; // positicion del modal
		$sMarginModal = null; // margenes del modal
		$smaxHeightModal = null; // altura maxima que tendra el modal
		
	$oBody = $('body'); 
	$sWindowSize = $(window).height();
	$omodal = $('.modalDirEnvio');
	$sPositionTop = $omodal.position().top;
	$sMarginModal = $sPositionTop * 2; // calculo del margen superior y inferior
	$smaxHeightModal =  $sWindowSize - $sMarginModal; // Height maximo que tendra el popup
	
	
	// Fijamos la altura del popup
	$omodal.css('max-height', $smaxHeightModal);
	
}

//Al cambiar el tamanyo de la ventana redimensionamos el popUp. 
$(window).resize(function(){
	var $oBody = $('body'); 
	
	if(!$oBody.hasClass('isTabletF')){
		modalResize();
	}
});

// Al cambiar la orientacion se recalcula el tamanyo del popup
$(window).on("orientationchange", function() {
	modalResize();
});

// Esperamos a que el contenido se haya cargado para recalcular la altura del popup
$(window).load(function(){
	modalResize();
});

function removePCI() {
	$('.pci').remove();
}

function showPCI() {
	if ($('.pci').length >0) {
		loadPciForm();
		$('.pci').parent().removeClass("contenidoIntegrado");
		$('.pci').parent().removeClass("pm__cardContainerIntegrated");
	}
}

function showPCISaved() {
	if ($('.pci').length >0) {
		loadPciFormSaved();
	}
}