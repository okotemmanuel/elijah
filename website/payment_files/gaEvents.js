/**
 * Libreria de funciones JS para los eventos de Google Analytics
 */
var idTrackSelected;
/**
 * Esta función lanza un evento para trackear cada vez que el usuario va cambiando el método de pago.
 * */
function changePaymentMethod(idTrack) {	
	
	if(idTrackSelected==null){
		eventAction = "default payment method";
	}else{
		eventAction = "change payment method";
	}
	idTrackSelected = idTrack;
				
	analyticsEvent('checkout', eventAction, idTrack);			
}

/**
 * Cuando se selecciona una tarjeta que el cliente ya tiene guardada
 * */
function chooseSavedPaymentMethod(idTrack){		
	analyticsEvent('checkout', 'choose saved payment method', idTrack);
}

/**
 * Si el usuario marca el checkbox de recordar el método de pago, se lanzará un evento
 * */
function rememberPaymentMethod(isCheckSelected){
	var eventAction;
	
	if (isCheckSelected.checked) {
		eventAction = "remember payment method";
	}else{
		eventAction = "dont remember payment method";
	}
	
	analyticsEvent('checkout', eventAction, idTrackSelected);
}

/**
 * Si el usuario marca el checkbox de recordar el método de pago, se lanzará un evento.
 * Se usa en paso3.js para mobile
 * */
function rememberPaymentMethodMobile(isCheckSelected){
	var eventAction;

	if (isCheckSelected) {
		eventAction = "remember payment method";
	}else{
		eventAction = "dont remember payment method";
	}
			
	analyticsEvent('checkout', eventAction, idTrackSelected);
}

//helper function to trigger a Data Layer Virtual Pageview
analyticsVPV = function(virtualPageName) {
    dataLayer.push({
        'event': 'analyticsVPV',
        'vpvName': virtualPageName
    });

    ga('set', {
        'page': virtualPageName
	});
	
	ga('send', 'pageview');
};

//helper function to trigger a Data Layer Event
analyticsEvent = function(category, action, opt_label, opt_value, opt_noninteractive) {
    var optValue = opt_value;
    if (optValue === '' || optValue === '0' || optValue === null) optValue = 0;


    dataLayer.push({
        'event': 'analyticsEvent',
        'eventCategory': category,
        'eventAction': action,
        'eventLabel': opt_label,
        'eventValue': optValue
    });

    // Se comprueba si es un nonInteraction
    if (opt_noninteractive) {
        // Se lanza el ga con el nonInteractive
        ga('send', 'event', category, action, opt_label, optValue, {
            'nonInteraction': 1
        });
    } else {
        // Se lanza el ga con el si el nonInteractive
        ga('send', 'event', category, action, opt_label, optValue);
    }
};

