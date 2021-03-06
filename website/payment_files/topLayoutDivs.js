$(document).ready(function () {
	
	$('.vsv-link').on('click', function(){
		var banner = $(this).closest('.innerBanner');
		var tienda = $(banner).attr('data-ga-tienda');
		var familia = $(banner).attr('data-ga-familia');
		var subfamilia = $(banner).attr('data-ga-subfamilia');
		var seccion = tienda.toLowerCase();
		if (familia != null && familia != "") {
			seccion = seccion + ":" + familia.toLowerCase();
			
			if (subfamilia != null && subfamilia != "") {
				seccion = seccion + ":" + subfamilia.toLowerCase();
			}
		}
		
		var bannerId = $(this).attr('data-ga-id');
		trackingEventAnalyticsUniversal('banner interior', seccion, bannerId);
	});
	
	/* FIXED #21784 */
	$('.ficha_producto_anadir.row-fluid').on('click', function() {
		$('html, body').on('mousewheel keyup', function(){
			$('html, body').stop();
			setTimeout(function(){ $('html, body').stop(); }, 240);
		});
	});
	
	$('.ficha_producto_anadir.span10.txt8').on('click', function() {
		$('html, body').on('mousewheel keyup', function(){
			$('html, body').stop();
			setTimeout(function(){ $('html, body').stop(); }, 240);
		});
	});
	/* END FIXED */
	
	/*Problema barra navegacion para navegador nativo de samsung andoroid 4.3*/
	
	
 	/**************************
 			  GENERICO
	**************************/
	/* VARIABLES GENE�RICAS */
	var $window = $(window);
	var pais = $('.main-content').attr('data-pais');

	/* END VARIABLES GENÃRICAS */
	rechargeBag();
	
	// Las secciones ya vienen ordenadas desde java
	//prepararMenu();
	
	prepararDesktop();
	
	if($('body').hasClass('isDesktop'))
	prepararColores();
	
	$('.backbutton').click(function() {
		parent.history.back();
		return 'false';
	});
	$('.collapsible').click(function() {
		$(this).css({'height':'auto'});
	});

	var $bolsa = $('.shoppingBagButton');
	var $mainBolsa = $('#mainDivBolsa');
	var $addWishList = $('.popup_add_wishlist #close');

	$('#mainDivBolsa').on('click', function(event) {
		event.stopPropagation();
	});
	if ($('#mainDivBolsaUpdate').hasClass('show1') || $('#mainDivBolsaUpdate').hasClass('show2')) {
		setTimeout(function() {
			$('#mainDivBolsaUpdate').fadeIn('slow');
		}, 500);
		setTimeout(function() {
		    $('#mainDivBolsaUpdate').fadeOut();
		}, 4000);
	}
	$('body').delegate('.shoppingBagButton','click',function(e) {
		e.stopPropagation();
		$mainBolsa.stop();
		if ($mostrada == true) {
			$mainBolsa.slideUp();
			$mostrada = false;
		} else {
			shoppingBagController.showMoveBolsaIcon();
			$mainBolsa.slideDown();
			$mostrada = true;

			if($('#userMenu').hasClass('hover')) {
				$('#userMenuTrigger').trigger('click', 'bluf');
		    }
		}
	});
	$('body').on('click',  function(event) {
		$mainBolsa.slideUp();
		$mostrada = false;
	});

	$mainBolsa.on('click', '.bolsa_close', function() {
		$mainBolsa.slideUp();
		$mostrada = false;
	});

	// on focus Lupa change color
	var inputmobile = $('#appendedInputButton');
	var inputLupa = $('.move_search .input-append');
	var busqueda = $('.busqueda');

	inputmobile
		.on('focusin', function() {
			busqueda.addClass('darkenmobile');
		}).on('focusout', function() {
			busqueda.removeClass('darkenmobile');
		});

	inputLupa
		.on('focusin', function() {
			busqueda.addClass('darken');
		}).on('focusout', function() {
			busqueda.removeClass('darken');
		});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1200) {
			$('#IrArriba').fadeIn();
		} else {
			$('#IrArriba').fadeOut();
		}
	});
	$('#IrArriba a').click(function () {
		$('body,html').animate({scrollTop: 0}, 800);return 'false';
	});

	$("#IrArriba").hide();
	/* ONLY MOBILE*/
	$('.boton_menu_izquierda').click(function(e) {
		window.scrollTo(0, 1);
		$('.flex-prev').toggleClass('hidden_mobile');
		$('.flex-next').toggleClass('hidden_mobile');
		$('.boton_atras').toggleClass('hidden_mobile');
		$('.boton_menu_izquierda').toggleClass('ajustar_boton_menu');

		$('body').toggleClass('menu_lateral_izquierdo_mov');
		$('#menu_lateral_izquierdo').toggleClass('menu_lateral_izquierdo_mov2');
		if($('#menu_lateral_izquierdo').hasClass('menu_lateral_izquierdo_mov2')){
			$('body').height($('.menu_lateral_izquierdo_mov2').height());
			$('body').addClass('bodyUnderMenu');
			
			// Ajuste cabecera REPRO
			if ($('body').hasClass('isMobile')) {
				$('.main-content').height($('.menu_lateral_izquierdo_mov2').height() - $('header').outerHeight());
				$('.main-content').addClass('bodyUnderMenu');
			}
		}
		else {
			$('body').height('auto');
			$('body').removeClass('bodyUnderMenu');
			
			// Ajuste cabecera REPRO
			if ($('body').hasClass('isMobile')) {
				$('.main-content').height('auto');
				$('.main-content').removeClass('bodyUnderMenu');
			}
		}
		
			
		if(navigator.userAgent.indexOf('Android')>0 && navigator.userAgent.indexOf('GT-')>0 && navigator.userAgent.indexOf('Mobile Safari')>0 && $(window).width()<'703')
		{
			if($('#menu_lateral_izquierdo').hasClass('menu_lateral_izquierdo_mov2')){ 
				$('.banners, #mainDivBodyHome, #mainDivBody, .contentDivFoot').css('display','none');
				$('#mainDivHeader').css('height', $('.menu_lateral_izquierdo').height() +'px');
				scroller.init($('.scroller'));
			} else {
				$('.banners, #mainDivBodyHome, #mainDivBody, .contentDivFoot').css('display','block');
				$('#mainDivHeader').css('height', 'auto');
				$('body').off('touchmove');
			}

		} else if($(window).width()<'703'){
			 $('#menu_lateral_izquierdo').css({'overflow-x':'hidden'});
			 $('#menu_lateral_izquierdo.menu_lateral_izquierdo_mov2').css({'overflow':'auto'});
			 $('#supercontainer').css({'overflow':'hidden !important'});
			 $('#supercontainer').css('height', $('#scroller').height() + 50 +'px');
			 
			 if($('#menu_lateral_izquierdo').hasClass('menu_lateral_izquierdo_mov2')){
				 $('#mainDivHeader').css('height', $('#scroller').height() + 50 +'px');
				 $('.banners').css('display','none');
			 } else {
				$('.banners').css('display','block');
				$('#mainDivHeader').css('height', 'auto');
			 }
		 }
	});
	
	// Recalculamos la altura del supercontainer con cada click en el menu para permitir scroll hasta el final 
	$('.accordion-group','#supercontainer').on('click',function(e) {
		setTimeout(function(){
			$('#supercontainer').css('height', $('#scroller').height() + 50 +'px');
		}, 600);
	});
	
	// Quitar borde 'quiero el total-look' cuando no hay total look ficha mobile
	if($('.ficha .completa_titulo').length > 0){ //caso oculto con display none
		if($('.ficha .completa_titulo').attr('style').indexOf('none') > 0){
			$('.tabPanels #accordion_ficha .accordion-group:last-child').addClass('noborder');
		}
	// Caso no existe contenedor
	}else{
		$('.tabPanels #accordion_ficha .accordion-group:last-child').addClass('noborder');
	}
	
	// Quitamos icono del acordeon cuando no hay contenido desplegable
	$('.accordion-group').each(function(index){
		if($(this).children().size() == 1){
			$(this).children().find('.icono').css({'display':'none'});
		}
	});
	
	// Al abrir uno de los acordeones en devoluciones, el resto se cierran
	if ( $('body').hasClass('explorer8') ) {
		$('#accordion','.devoluciones.main-content').on('show.bs.collapse', function () {
			$('#accordion .panel-collapse').each(function() {
				var $elem = $(this);
				if( $elem.hasClass('in') ) {
					var id = $elem.attr('id');
					$('#'+id).collapse('hide');
					$('#'+id).prev().find('a').addClass('collapsed');
				}
			});
	    });
	}
	
	$('.buscarBoton.btn').on('click',function(){
		$('.buscarBoton.btn').addClass('on');
		$('.search-container').addClass('on');
		$('#navigation_izq,#navigation2_izq,.log_false,.log_true,.boton_menu_izquierda').addClass('opaque');
		$('.searchbody').removeClass('hidden').addClass('shown');
		
		
		if(/iPhone/.test(navigator.userAgent)){
				$('.search-container.on #appendedInputButton').focus();
		}else{
			/*Detectamos cuando acaba la transicion y activamos el focus sobre el input para desplegar el teclado en mobile*/
	        $('.search-container.on #appendedInputButton').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
	                function() {
	                   $('.search-container.on #appendedInputButton').focus();
	        });
		}
	});
	
	$('.searchbody').click(function(){
			$('.searchbody').removeClass('shown').addClass('hidden');
			$('.search-container').removeClass('on');
			$('#navigation_izq,#navigation2_izq,.log_false,.log_true,.boton_menu_izquierda').removeClass('opaque');
			$('.buscarBoton.btn').removeClass('on');
	});
		
	/* Esta afecta a mobile, cuando desaparece el teclado */
	$('#appendedInputButton.buscador_texto').on('blur',function(){
		if($(this).val()==''){
			$('.search-container').removeClass('on');
			$('#navigation_izq,#navigation2_izq,.log_false,.log_true,.boton_menu_izquierda').removeClass('opaque');
			$('.buscarBoton.btn').removeClass('on');
		}
	});
	/* Solventa el problema de las categorias en mayuscula del filtro de prendas en el listado mobile */
	$(".filtro_busqueda option:first-child").each(function() {
		$(this).text($(this).text().substr(0,1)+$(this).text().substr(1).toLowerCase());
	});
	/* END ONLY MOBILE*/

	/*** END GENERICO **/

	/* Mantiene el desplegable del codigo abierto */
	$('.contenidoPromoCode','.promoCode').addClass('hover');
	$('.headerPromoCode .icono','.promoCode').addClass('hover');
	/* Evento que gestion la obertura/cierre del codigo*/
	$('.headerPromoCode form').on('click', function(e) {
		$('.contenidoPromoCode','.promoCode').toggleClass('hover');
		$('.headerPromoCode .icono','.promoCode').toggleClass('hover');
		return false;
	});

 	/**************************
 			  HOMES
	**************************/
	
	/* Fix temporal menu full size */
	$('ul.level1 li').hover( 
		function() {
			var $self = $(this);
			var h_m = $self.find('.level2').outerHeight() + 60;
			if ($('.header_banner').length > 0) h_m += 27;
			if ($self.parents('.explorer8').length > 0 ) h_m += 60;
			$self.find('.falseBackground').css('height',h_m+'px');
			$self.addClass('hover');
		},
		function() {
			var $self = $(this);
			$self.removeClass('hover');
		}
	);
	
	/* Ocultamos el panel falso y el menu al hacer scroll */
	$(window).scroll(function(){
		$('ul.level1 li').removeClass('hover');
	});
	if ($(window).width()>'703' && $(window).width()<'1024') {
		$(window).on('touchmove',function(){
			$('ul.level1 li').removeClass('hover');
		});
	}
		
	/* Mostrar flechas del slider al poner raton encima */
	$('.flexslider').on('mouseover', function(e) {
		var $this = $(this);
		var $directionNav = $this.find('.flex-direction-nav a');
		var $controlNav = $this.find('.flex-control-nav');
		$directionNav.addClass('mostrado');
		$controlNav.addClass('mostrado');
	}).on('mouseout', function(e) {
		var $this = $(this);
		var $directionNav = $this.find('.flex-direction-nav a');
		var $controlNav = $this.find('.flex-control-nav');
		$directionNav.removeClass('mostrado');
		$controlNav.removeClass('mostrado');
	});

	var brands = $('.brand_nav_izq').find($('.mango_branding_izq')).length;
	if (brands == 0) {
		$('.separador_marcas').addClass('hidden_mobile');
	};
	/* Inicializacion de slider en Home */
	if ($('.flexslider').length>0) {
		$('.flexslider').flexslider({
			animation: 'slide',
			slideshowSpeed: '4000',
			animationSpeed: '900',
			useCSS: 'true',
			pauseOnAction: 'true',
			directionNav: 'true',
			controlNav: 'true',
			touch: 'true'
		});
	}
	/* Ocultar/mostrar el banner newsletter */
	if ($('.main_newsletter_error').length>0) {
		$mailHomeMobile = $('.mail_hom_mobile');
		$mailHomeMobile.removeClass('hidden_mobile');
		$mailHomeMobile.removeClass('hidden_desktop');
	}

	var $accordionHeading = $('.accordion-heading'),
		$accordion = $('.accordion'),
		$accordionBody = $('.accordion-body');

	if($accordion.size() > 0) {
		$accordion.collapse();
	}

	var $mostrada = false;
	var $init;
	$init = $(".accordion-body.in");
	$init.parent().addClass("accordion-group-active");
	$init.prev().addClass("accordion-heading-active");

	$accordionBody
	.on('hide', function() {
		var $this = $(this);
		var siblings = $this.siblings($accordionHeading);
		siblings.removeClass('minus');
		siblings.addClass('plus');
		siblings.removeClass('accordion-heading-active');
		$this.parent().removeClass('accordion-group-active');
	}).on('show', function() {
		var $this = $(this);
		var siblings = $this.siblings($accordionHeading);
		siblings.removeClass('plus');
		siblings.addClass('minus');
		siblings.addClass('accordion-heading-active');
		$this.parent().addClass('accordion-group-active');
	});

	var $Completa = $('.completa_titulo.accordion-group'),
	$CompletaBody= $('.completa_look.accordion-body');;
	$Completa.on('click', function() {
		$CompletaBody.toggleClass('height');
	});
	
	//ponemos rebajas en rojo tambien para mobile
	if($('.home .level1 .txtSecciones').last().hasClass('prendasRojo'))
	{
		$('.accordion_home .accordion-toggle span').last().addClass('prendasRojo');
		
	}
	
	//efecto sobre el input de busqueda desktop//
	var $searchIcono = $('#buscarBoton.btn','.searcher');
	var $searchIconoTop = $('.searchIcono', '.searcher');

	$searchIconoTop.on ('click', function() {
		$('#appendedInputButton.buscador_texto').focus();
	});

	$('#appendedInputButton.buscador_texto').on('keyup', function() {
		if($(this).val != '') {
			$searchIcono.removeClass('hidden');
			if (!$('body').hasClass('isTabletF')) {
				$searchIconoTop.addClass('hidden');
			}
		} else {
			$searchIcono.addClass('hidden');
			if (!$('body').hasClass('isTabletF')) {
				$searchIconoTop.removeClass('hidden');				
			}
		}
	});

	$('#appendedInputButton.buscador_texto').focusin(function(){
		$('.border, .searcher__label','.searcher').addClass('focus');

		// Si es tablet animamos el input
        if ($('body').hasClass('isTabletF')) {
            // Calculamos el ancho
        	var iSearchWidth = $('.searcherUserMenuRow').width() - $('.searchIcono').width();
        	
        	$('#appendedInputButton').css('width', iSearchWidth);
        }
	});
	$('#appendedInputButton.buscador_texto').focusout(function(){
		if ($(this).val() == '') {
			$('.border, .searcher__label','.searcher').removeClass('focus');
			$searchIcono.addClass('hidden');

			if (!$('body').hasClass('isTabletF')) {
				$searchIconoTop.removeClass('hidden');
			}

			if ($('body').hasClass('isTabletF')) {
	            // Calculamos el ancho
	        	$('#appendedInputButton').css('width', 0);
	        }
		}
	});

	var $moreInfoDiv = $('#moreInfoFreeShipping');
	$('.texto_banner.showtooltip','.listsContainer').hover( 
		function() { $moreInfoDiv.addClass('hover');},
		function() { $moreInfoDiv.removeClass('hover');}
	);
	
 	/***END HOMES***/


 	/**************************
 			  LISTADO
	**************************/
	/* Old code
	 $(window).on('scroll', function() {
		var scrollFromTheTop = $(this).scrollTop();
		overflowDiv = $('.overflow');
		isVisible = false;
		if ($('.overflow').is(':visible')){isVisible = true; }
		if (scrollFromTheTop > 900) {
			overflowDiv.addClass('visible');
		} else {
			overflowDiv.removeClass('visible');
		}
	});
	$('.overflow').on('click', function(){
		$('body, html').animate({
			scrollTop: "0"
		}, 500);
	});
	//Oculta el tercer precio en outlet de china, usa y mangooutlet cuando se estï¿½ en mobile
	var url = $("#Form").attr('action');
	var num = url.match(/\d{3}/)[0];
	var numeric = parseInt(num);

	if (numeric == 720 || numeric == 001 || numeric == 400) {
		if ($(window).width() < '703') {
			divs = $('.searchResultPrice');
			for (var j=0, len = divs.length; j<len; j++) {
				var children = divs.eq(j).children();
				if (children.length == 11) {
					for(var i=2;i<7;i++) {
						//children.eq(i).css('display','none');
					}
				}else if(children.length == 8) {
			  		for(var i=2;i<5;i++) {
						//children.eq(i).css('display','none');
					}
		  		}
			}
		}
	}*/
	
	
	$('.products_pictures').hover(function() {
		coloracos = $(this).find('.searchResultOptions img').addClass('selected');
		$.each(coloracos, function(index, val) {
			$(val).addClass('selected');
		});
	}, function() {
		$(this).find('.searchResultOptions img').removeClass('selected');
	});

	var contenedorImagenes = $('.contImagenBuscador div a');
	for (var i = 0, len = contenedorImagenes.length; i < len ; i++) {
		var img = contenedorImagenes[i].getElementsByTagName('img');
		var imgLen = img.length;
		if (imgLen == 2) {
			$(img[0]).addClass('img__fixed');
		};
	};

	$.each($('.lista_filtros_busqueda option'), function() {
		var $this = $(this);
		if($this.attr('value')==520) {
			$this.prev().remove();
		}
	});

	$('body').find($('.sidebarBorderedBlock._menu')).prev().addClass('removeborder');
 	/***END LISTADO***/



 	/**************************
		   FICHA PRODUCTO
	**************************/
	/*Hacemos que toda la imagen del total look sea clicable, no solo el boton*/
	$('.ficha_total_img').on('click', function(event) {
		$(this).next().click();
	});

	$('.izq_ultimo').click(function() {window.swiperUltimo.swipePrev();});
	$('.der_ultimo').click(function() {window.swiperUltimo.swipeNext();});

	$('.accordion').css('height', 'auto !important');
	
	/* Barra Cookies */
	$('.cerrarCookies').on('click', function(event) {
		$('.barraCookies').slideUp();
		resetTopPositionHeaders();
	});
	if ($('.barraCookies').length > 0){ 
		recalculateTopPositionHeaders();
	}
	$(window).on('orientationchange', function() {
		resetTopPositionHeaders();
		recalculateTopPositionHeaders();
	});
	
	/* Funcion para hacer scroll hasta arriba de la pagina si no hay errores al anyadir a bolsa */
	$(".ficha_producto_anadir").click(function () {
		var bocataerror = $('div[id^="bocataTallaNoSel"]');
		var bocataSecerror = $('div[id^="bocataTallaSecNoSel"]');
		var error = false;

		/* Miramos si hay error de talla no seleccionada en los productos principales */
		bocataerror.each(function(key, value) {
			if($(value).css('display') == 'block') {
				var offsetToTop = $(value).offset().top - 150;
				if(!$('body').hasClass('isMobile')){
					$('html, body').animate({
						scrollTop: offsetToTop
					}, 500);
				}
				error = true;
				return false;
			}
		});
		/* Miramos si hay error de talla no seleccionada en los productos secundarios */
		bocataSecerror.each(function(key, value) {
			if($(value).css('display') == 'block') {
				if(!$('body').hasClass('isMobile')){
					$('html, body').animate({
						scrollTop: $(value).offset().top
					}, 500);
				}
				error = error || true;
				return false;
			}
		});
		/* Si no hay ningun error en ninguno de los productos:
		 * Desktop: hacemos scroll al top para ver la bolsa
		 * Mobile:	llamamos a la funcion de google experiments para el test A/B */
		if(!error) {
			if($('body').hasClass('isMobile')){	
				productPageController.GEProductPage();
			} else{
				$('html, body').animate({
					scrollTop: $('body').offset().top - 28
				}, 500);
			}
		}
	});
	/***END FICHA PRODUCTO***/



	/**************************
		  AJUSTES CHINA
	**************************/
	$('.modalwechatClose').click(function() {
		$('.modalwechatactive').addClass('modalwechat').removeClass('modalwechatactive');
		$('.wechatcontaineractive').addClass('wechatcontainer').removeClass('wechatcontaineractive');
	});
	/*** END AJUSTES CHINA ***/


	/**************************
	 RESOLUCIONES - CROSSBROWSER
	**************************/
	var IE67 = 'false';
	if (navigator.userAgent.indexOf('MSIE 6') >= 0 || navigator.userAgent.indexOf('MSIE 7') >= 0 ) {
		IE67 = 'true';
		$('body').addClass('IE67');
		$('.row-fluid .celda:first-child').addClass('first-child');
		$('.row-fluid .celda:last-child').addClass('last-child');
		$('.brand_kids .level2 .columna:nth-child(3)').css({'margin-left': '0px','position': 'absolute','float': 'right !important'});
	};
	if (navigator.userAgent.indexOf('MSIE 8') >= 0 || navigator.userAgent.indexOf('MSIE 7') >= 0 || navigator.userAgent.indexOf('MSIE 6') >= 0  ) {
		$('.brand_kids .level2 .columna:nth-child(2)').addClass('separador');
		$('.sidebarBorderedBlock.row-fluid:nth-child(3)').css({'border-bottom':'0'});
	};
	if (!IE67) {
		$('body').addClass('notIE67');
	}

	function resize() {
		if ($window.width() > 703) {
			return $('body').addClass('PC');
		}
		$('body').removeClass('PC');
	}
	$window
		.resize(resize)
		.trigger('resize');

	if(document.createElement('canvas').getContext  ) {
		if (navigator.userAgent.indexOf('MSIE 9')>=0 || navigator.userAgent.indexOf('MSIE 10')>= 0) {
			loadjscssfile("//st.mngbcn.com/static/shop/legacy/ie.css", "css");
		}
	} else {

		loadjscssfile("//st.mngbcn.com/static/shop/legacy/ie.css", "css");

		if (navigator.userAgent.indexOf('MSIE 6') >= 0) {
			loadjscssfile("http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js","js");

			$('.level1 li').mouseover(function() {
				  $(this).children().eq(1).removeClass('menu_oculto');
				  $(this).children().eq(1).addClass('menu_desplegado');
				  $(this).children().eq(1).css('left', $(this).children().eq(0).position().left);
				});
			$('ul.drop li > ul.level2').mouseout(function() {
				$(this).removeClass('menu_desplegado');
				 $(this).addClass('menu_oculto');
				});
			$('._color_div_on').css({'height':'30px','width':'30px','float':'left'});
			$('._color_div_off').css({'height':'30px','width':'30px','float':'left'});
			$('.completa_look ').removeClass('collapse in');
			$('#panelOufitsProducto').removeClass('collapse in');
		}
	};
	/* END RESOLUCIONES, CROSS BROWSER Y DEMÃS */

/*FIN DE DOCUMENT READY*/
});
/*INICIO WINDOW ONLOAD*/
window.onload = function() {
	
	if ($('.error_').length > 0) {
		scrollError();
		}
	
/*FIN WINDOW ONLOAD*/	
};
/*************/

/* FUNCIONES */
function loadjscssfile(filename, filetype) {
	 if (filetype=="js") {
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
	} else if (filetype=="css") {
		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	};
	if (typeof fileref!="undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}


function rechargeBag(){
	if($('.num_items_bolsa').text().indexOf('0')){
			$('.boton_menu_derecha').addClass('full');
	}
	else{
		$('.boton_menu_derecha').removeClass('full');
	}
}

function zoomIn() {
	var src=$('.swiper-slide-active img').attr("src");
	$('.zoom').removeClass('hide');
	$('.zoom').fadeIn( 400 );
	$(".zoomContainer__img").attr('src',src);
}

function zoomOut() {
	$('.zoom').fadeOut( 400 );
}

function wechatActive() {
	$('.modalwechat').addClass('modalwechatactive').removeClass('modalwechat');
	$('.wechatcontainer').addClass('wechatcontaineractive').removeClass('wechatcontainer');
}

/** jQuery.browser.mobile (http://detectmobilebrowser.com/) **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));})(navigator.userAgent||navigator.vendor||window.opera);

function prepararMenu() {
	// Sets the menu container width depending on the number of columns available.
	// Reads the available classes for each section to build the columns and moves the contents to each.
	//$('.level1').hoverIntent();
	$('.level1 > li').each(function(){ 
		var col_width = 200; // in pixels
		var min_children = 0;
		var margins_too = 60;
		var $lvl1 = $(this);
		
		var obj = {};
		$lvl1.find('.level2 .seccion').each(function (element) {
		    $.each((this.className || '').split(/\s+/), function (i, v) {
		        obj[v] = true;
		    });

		});

		var classes = $.map(obj, function (val, key) {
		    if (key == '' || key == 'seccion') {
		        return undefined;
		    } else {
		        $('<li/>',{'id':key,'class':'seccion '+key}).appendTo($lvl1.find($('.level2')));
		        $lvl1.find('.columna .'+key).addClass('remove').children().appendTo($lvl1.find('.level2 li#'+key));
		        $lvl1.find('.columna .remove').remove();
		        return key;
		    }
		});

		secciones = $lvl1.find('.level2 .seccion').length; 
		if($('html').hasClass("home")){
			$lvl1.find('.level2').width((col_width*secciones) + margins_too);
		} else {
			$lvl1.find('.level2').width(1230);
		}
		
	});
}


function prepararDesktop(){
	if($(window).width() > 703){
//		$('#prendasMango').find('.products_pictures').not('.processed, .span4')
//			.each(function(){
//				var $anchor_link = $(this).find('.contImagenBuscador a');
//				var $image = $anchor_link.find('img');
//				$image.addClass('hidden_desktop');
//				var large_image = $image.data('imagel');
//				var large_imageHD = $image.data('imagelHQ');//large_image.replace('/S9/','/S6/');
//				var srcset_attr = large_image + "," + large_imageHD;
//				var alt_image = $image.attr('alt');
//				$('<img />', { 'class': 'hidden_mobile', 'src'  : large_image, 'alt': alt_image, 'srcset': srcset_attr, 'sizes': '(min-width: 40em) 100vw' }).prependTo($anchor_link);
//				
//				// agregar texto adicional para movil
//				
//				$(this).addClass('processed');
//			});
	}
}

function newSwapColors(colorTab,targetID,show2images,firstIMG,secondIMG,mobileIMG,colorBID, urlVideo){
	var $this = $(this);
	var $colorTab = $(colorTab);
	var s_target1 = 'img1_'+targetID;
	var s_target2 = 'img2_'+targetID;
	var $target = $('#'+s_target1);
	var s_img1URL = firstIMG;
	var s_img2URL = secondIMG;
	var s_imgMURL = mobileIMG;
	var b_twoImages = show2images;
	var s_colorb = colorBID;
	$colorTab.closest('.more_colors_container').find('.selected_color').removeClass('selected_color');
	$colorTab.parent().addClass('selected_color');
	if(($target.hasClass('A2')) || ($target.hasClass('A3'))){
		/* Chrome FIX */
		var IMG1 = '', IMG2 = '';
		
		if (firstIMG.indexOf('S9') > 0) IMG1 = firstIMG.replace('S9', 'S6');
		if (firstIMG.indexOf('S6') > 0) IMG1 = firstIMG.replace('S6', 'S9');
		
		if (secondIMG.indexOf('S9') > 0) IMG2 = secondIMG.replace('S9', 'S6');
		if (secondIMG.indexOf('S6') > 0) IMG2 = secondIMG.replace('S6', 'S9');
		
		var srcsetColor1 = firstIMG + ' 2083w, ' +  IMG1 + ' 2083w';
		var srcsetColor2 = secondIMG + ' 2083w, ' +  IMG2 + ' 2083w';
		
		$target.parent().find('img.hidden_mobile').attr('srcset', srcsetColor1);
		$target.parent().find('img.hidden_desktop').attr('srcset', srcsetColor2);
		/* END Chrome FIX */
		
		$target.parent().find('img.hidden_mobile').attr('src',s_img1URL);
		$target.parent().find('img.hidden_desktop').attr('src',s_imgMURL);
		swapColorImage1(s_target1,firstIMG,'anchor_'+targetID,s_colorb);
		
		// Se comprueba el width de la pantalla para saber si es mayor de 2100px (images responsive)
		if ($(window).width() >= 2100) {
			$target.parent().find('img.hidden_mobile').attr('src', $target.parent().find('img.hidden_mobile').attr('src').replace('S9', 'S6'));
			$target.parent().find('img.hidden_mobile').attr('src', $target.parent().find('img.hidden_desktop').attr('src').replace('S9', 'S6'));
		}
	} else {
		swapColorImage1(s_target1,firstIMG,'anchor_'+targetID,s_colorb);
		if (b_twoImages) {
			
			/* Chrome FIX */
			var IMG1 = '', IMG2 = '';
			
			if (firstIMG.indexOf('S9') > 0) IMG1 = firstIMG.replace('S9', 'S6');
			if (firstIMG.indexOf('S6') > 0) IMG1 = firstIMG.replace('S6', 'S9');
			
			if (secondIMG.indexOf('S9') > 0) IMG2 = secondIMG.replace('S9', 'S6');
			if (secondIMG.indexOf('S6') > 0) IMG2 = secondIMG.replace('S6', 'S9');
			
			var srcsetColor1 = firstIMG + ' 2083w, ' +  IMG1 + ' 2083w';
			var srcsetColor2 = secondIMG + ' 2083w, ' +  IMG2 + ' 2083w';
			
			$('#'+s_target1).attr('srcset', srcsetColor1);
			$('#'+s_target2).attr('srcset', srcsetColor2);
			/* END Chrome FIX */
			
			$('#'+s_target2).attr('src',secondIMG);
			
			// Se comprueba el width de la pantalla para saber si es mayor de 2100px (images responsive)
			if ($(window).width() >= 2100) {
				$('#'+s_target2).attr('src', $('#'+s_target2).attr('src').replace('S9', 'S6'));
			}
		} else {
			
			/* Chrome FIX */
			var IMG1 = '';
			
			if (firstIMG.indexOf('S9') > 0) IMG1 = firstIMG.replace('S9', 'S6');
			if (firstIMG.indexOf('S6') > 0) IMG1 = firstIMG.replace('S6', 'S9');
			
			var srcsetColor1 = firstIMG + ' 2083w, ' +  IMG1 + ' 2083w';
			
			$('#'+s_target1).attr('srcset', srcsetColor1);
			/* END Chrome FIX */
		}
	}
	
	// Se comprueba si hay que declarar las acciones de los controladores de v�deo (excepci�n en IE8, Firefox, Votf y dispositivos m�viles)
	if (!($('body').hasClass('explorer8')) && !($('body').hasClass('firefox')) && !($('body').hasClass('tele_true')) && $(window).width() >= 751) {
		// Se comprueba si es un iPad para que tampoco muestre los v�deos
		if (!($('body').hasClass('iDevice')) && $(window).width() >= 1024) {
			// Declaraci�n de variables para el cambio de color en los v�deos
			var $oAnchor = $('#anchor_' + targetID);
			
			// Se comprueba si se va a poner un v�deo
			if (urlVideo !== '') {
				// Se comprueba si ya contiene un v�deo
				if ($oAnchor.find('video').length == 0) {
					$oAnchor.parents(':eq(2)').attr('data-url', urlVideo); // Se cambia el link del v�deo
					$oAnchor.parents(':eq(2)').addClass('thumbnail'); // Se a�ade la clase thumbnail para los v�deos
					swapColorsVideos(targetID, urlVideo); // Se pone el v�deo
				} else {
					$oAnchor.parents(':eq(2)').attr('data-url', urlVideo); // Se cambia el link del v�deo
					$oAnchor.find('video').remove(); // Se borra el v�deo actual
					$oAnchor.parents(':eq(2)').waypoint('destroy'); // Se destruye el waypoint asociado �nicamente a ese v�deo
					swapColorsVideos(targetID, urlVideo); // Se pone el v�deo
				}		 
				
				// Se comprueba si hay como m�nimo dos im�genes
				if ($oAnchor.find('img').length >= 2)
					$oAnchor.find('img').hide(); // Se oculta la imagen
			} else {
				// Se comprueba si ya contiene un v�deo
				if ($oAnchor.find('video').length != 0) {
					$oAnchor.parents(':eq(2)').waypoint('destroy'); // Se destruye el waypoint asociado �nicamente a ese v�deo
					$oAnchor.parents(':eq(2)').removeClass('thumbnail'); // Se borra la clase thumbnail del v�deo porque pasa a ser una imagen
					$oAnchor.find('video').remove(); // Se borra el v�deo actual
					
					// Se comprueba si hay como m�nimo dos im�genes
					if ($oAnchor.find('img').length >= 2)
						$oAnchor.find('img').show(); // Se muestra la imagen
				} 
			}
		}
	}
}

/**
 * M�todo para cambiar las im�genes de color en el outlet
 * @param object Objecto que realiza la llamada a la funci�n
 * @param int Identificador �nico
 * @param string URL de la primera imagen
 * @param string URL de la segunda imagen (hover)
 * @param int Identificador del color
 * @param boolean Flag para mostrar im�genes
 */
function newSwapColorsOutlet(oSwapColor, iId, sFirstImage, sSecondImage, iColorId, bShowImages) {
	oSwapColor.parent().find($('.selected_color')).removeClass('selected_color');
	oSwapColor.addClass('selected_color'); 
	
	swapColorImage1('img1_' + iId, sFirstImage, 'anchor_' + iId, iColorId);
	
	/* Chrome FIX */
	var IMG1 = '', IMG2 = '';
	
	if (sFirstImage.indexOf('S9') > 0) IMG1 = sFirstImage.replace('S9', 'S6');
	if (sFirstImage.indexOf('S6') > 0) IMG1 = sFirstImage.replace('S6', 'S9');
	
	if (sSecondImage.indexOf('S9') > 0) IMG2 = sSecondImage.replace('S9', 'S6');
	if (sSecondImage.indexOf('S6') > 0) IMG2 = sSecondImage.replace('S6', 'S9');
	
	var srcsetColor1 = sFirstImage + ' 2083w, ' +  IMG1 + ' 2083w';
	var srcsetColor2 = sSecondImage + ' 2083w, ' +  IMG2 + ' 2083w';
	
	$('#img1_' + iId).attr('srcset', srcsetColor1);
	/* END Chrome FIX */
	
	if (bShowImages) {
		$('#img2_' + iId).attr('src', sSecondImage);
		$('#img2_' + iId).attr('srcset', srcsetColor2);
	}
}

function productsMouseEnter(e){
	$(e.target).closest('.products_pictures').find('.more_colors_button, .more_colors_container').addClass('TBD');
}

function productsMouseLeave(e){
	$(e.target).closest('.products_pictures').find('.more_colors_button, .more_colors_container').removeClass('TBD');
}

function prepararColores(){
	//$('.contents').hoverIntent(productsMouseEnter,productsMouseLeave,'.products_pictures');
	$('.contents').on('click', '.more_colors_button a', function(e){
		if($('body').hasClass('isDesktop')){
			e.preventDefault();
			$(e.target).closest('.products_pictures').find('.more_colors_button, .more_colors_container').addClass('TBD');
		}
	});
	$('.contents').on('mouseenter', '.products_pictures', function(e){
			$(e.target).closest('.products_pictures').find('.more_colors_button, .more_colors_container').addClass('TBD');
	});
	$('.contents').on('mouseleave', '.products_pictures', function(e){
			$(e.target).closest('.products_pictures').find('.more_colors_button, .more_colors_container').removeClass('TBD');
		//}
	});
}

function resetTopPositionHeaders() {
	if ($(window).width()<'703') {
		$('.topbar_mobile').css('top','auto');
		if(navigator.userAgent.indexOf('Android')>0 && navigator.userAgent.indexOf('GT-')>0 && navigator.userAgent.indexOf('Mobile Safari')>0 && $(window).width()<'703'){
			/* Ajustes estilos banner free shipping Samsung Galaxy */
			$('.topbar_mobile').css('margin-top','0px');//el top no podemos sobreescribirlo por el plugin
		}
		if($('.cabecera_producto.row-fluid').length > 0) {
			$('.cabecera_producto.row-fluid').css('top','');
		}
		if ($('.iframe .contentHolder').length > 0) {
			$('.iframe .contentHolder').css('margin-top','');
		}
		if ($('.iframe #_bodyContent').length > 0) {
			$('.iframe #_bodyContent').css('margin-top','');
		}
		if ($('.header_banner').length > 0) {
			$('.header_banner').css('margin-top','');
		} else {

			if(navigator.userAgent.indexOf('Android')>0 && navigator.userAgent.indexOf('GT-')>0 && navigator.userAgent.indexOf('Mobile Safari')>0 && $(window).width()<'703'){
				$('.banner_container_mobile').css('margin-top','0px');
			}
			else{
				//al galaxy esto no le mola, hay que poner tamaÃ±o en pixels, no reconoce '' como auto
				$('.banner_container_mobile').css('margin-top','');
			}
			$('.catalog .span10.contents').css('margin-top', '');
			$('.m_bolsa #mainDivBody').css('margin-top', '');
		}
		$('html.help .MangoLayout').css('top', '');
		
	} else {
		var h_header = $('#mainDivHeader').outerHeight();
		if ($('.barraTele').length > 0) {
			var h_votf;
			
			h_votf = $('.barraTele').outerHeight();
			$('.falseBackground').css('top', '');
			
			$('html.help #mainDivHeader').css('top', '');
			$('html.help #mainDivSections').css('marginTop', h_votf + 'px');
			$('html.help #mainDivBolsa').css('top', h_votf + 90 + 'px');
			var topFalseBg = parseInt ($('html.help .falseBackground').css('top'),10);
			$('html.help .falseBackground').css('top', topFalseBg + h_votf + 'px');

		} else {
			$('.falseBackground').css('top', '');
			
			if ($('html.help').length > 0) {
				$('html.help #mainDivHeader').css('top', '');
				$('html.help #mainDivSections').css('marginTop', '');
				$('html.help .breadcrumbs').css('top', '' );
				$('html.help #mainDivBolsa').css('top', '');
			}
		}
		$('html.help .MangoLayout').css('top', h_header + 'px');
	}
}

// Funcion que se ejecuta cuando hay barra de cookies y que se encarga de posicionar todos los elementos de la cabecera
function recalculateTopPositionHeaders() {
	// Altura de la barra de cookies
	var h_barraCookies = $('.barraCookies').outerHeight();
	// Altura total acumulada
	var h_total = 0;
	var h_totalb=0;
	
	// Mobile
	if ($(window).width()<'703') {
		// Altura de la cabecera
		var h_header = $('.topbar_mobile').outerHeight();
		// Se acumula la altura de la cabecera con la barra de cookies
		h_total = h_header + h_barraCookies;
		h_totalb= h_barraCookies;
		if ($('.cabecera_producto.row-fluid').length > 0) {
			var h_cp = $('.cabecera_producto.row-fluid').outerHeight();
			$('.cabecera_producto.row-fluid').css('top',h_total);
			h_total += h_cp;
		}
		if ($('.iframe .contentHolder').length > 0) {
			$('.iframe .contentHolder').css('margin-top',h_total);
		}
		if ($('.iframe #_bodyContent').length > 0) {
			$('.iframe #_bodyContent').css('margin-top',h_total);
		}
		if ($('.barraTele').length > 0) {
			var h_votf = $('.barraTele').outerHeight();
			h_total += h_votf;
			h_totalb += h_votf;
		}
		$('.fichaOutfit.main-content').css('cssText','margin-top:'+ h_totalb + 'px !important');
		
		if ($('.header_banner').length > 0 && !(navigator.userAgent.indexOf('Android')>0 && navigator.userAgent.indexOf('GT-')>0 && navigator.userAgent.indexOf('Mobile Safari')>0 && $(window).width()<'703')) {
			$('.header_banner').css('margin-top', h_total + 'px');
			$('html.help #mainDivBodyHome').css('marginTop', '');
		} else if(!(navigator.userAgent.indexOf('Android')>0 && navigator.userAgent.indexOf('GT-')>0 && navigator.userAgent.indexOf('Mobile Safari')>0 && $(window).width()<'703')){
			$('.banner_container_mobile').css('margin-top', h_total + 'px');
			/* Sumamos 20px de la ficha_top_navigation */
			/* $('.catalog .span10.contents').css('margin-top', h_barraCookies + 20 + 'px'); */
			$('.m_bolsa #mainDivBody').css('margin-top', h_barraCookies + 'px');
			$('html.help #mainDivBodyHome').css('marginTop', '');
		}
		$('.topbar_mobile').css('top', h_barraCookies + 'px');
		
		if(navigator.userAgent.indexOf('Android')>0 && navigator.userAgent.indexOf('GT-')>0 && navigator.userAgent.indexOf('Mobile Safari')>0 && $(window).width()<'703'){
			$('.topbar_mobile').css('margin-top', h_barraCookies+2+'px');//el top no podemos sobreescribirlo por el plugin
		}

		$('html.help #mainDivBodyHome').css('marginTop', h_barraCookies + 20 + "px");
		
	} else {
		var original_top = parseInt($('.falseBackground').css('top'),10);
		if ($('.barraTele').length > 0) {
			var h_votf = $('.barraTele').outerHeight();
			h_total += h_votf;
			
			if ($('html.help').length > 0) $('html.help #mainDivHeader').css('height', h_votf + 90 + 'px');
		}
		h_total += h_barraCookies + original_top;
		$('.falseBackground').css('top', h_total + 'px'); 
		
		// Estamos en la nueva pagina de ayuda
		if ($('html.help').length > 0) {
			var h_extra = 0;
			var mt_header = parseInt ($('#mainDivBodyHome').css('margin-top'),10);
			var h_breadcrumbs = $('.breadcrumbs').position();
		
			h_extra += h_barraCookies;
			h_extra += h_votf;
			mt_header += h_extra;
			
			$('html.help #mainDivHeader').css('top', h_barraCookies + 'px');
			$('html.help #mainDivSections').css('marginTop', h_extra + 'px');
			$('html.help #mainDivBodyHome').css('marginTop', mt_header + 'px');
			$('html.help .breadcrumbs').css('top', h_breadcrumbs.top + h_extra );
			$('html.help #mainDivBolsa').css('top', 90 + h_extra + 'px');
		}
	}
}

// Funcion para hacer foco a un elemento sin forzar el scroll a el
$.fn.focusWithoutScrolling = function(){
	  var x = window.scrollX, y = window.scrollY;
	  this.focus();
	  window.scrollTo(x, y);
	  return this; //chainability
};

function scrollError(){
	var container=$('html,body'),
		scrollTo=$('.error_');
	container.animate({scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()},'slow');
};

function resetShoppingBagEvents() {
	var $mainBolsa = $('#mainDivBolsa');
	var mostrada = false;
	if ($('#mainDivBolsaUpdate').hasClass('show1') || $('#mainDivBolsaUpdate').hasClass('show2')) {
	    setTimeout(function() {
	        $('#mainDivBolsaUpdate').fadeIn('slow');
	    }, 500);
	    setTimeout(function() {
	        $('#mainDivBolsaUpdate').fadeOut();
	    }, 4000);
	}
	$('body').delegate('.shoppingBagButton','click',function(e) {
	    e.stopPropagation();
	    $mainBolsa.stop();
	    if (mostrada == true) {
	        $mainBolsa.slideUp();
	        mostrada = false;
	    } else {
	        $mainBolsa.slideDown();
	        mostrada = true;
	    }
	});

	$mainBolsa.on('click', '.bolsa_close', function() {
	    $mainBolsa.slideUp();
	    mostrada = false;
	});
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
$(document).ready(function() {
	BrowserDetect.init();
	var navegador = window.BrowserDetect.browser;
	var vers = window.BrowserDetect.version;
	
	if(navigator.userAgent.indexOf('Android')>0 && navigator.userAgent.indexOf('GT-')>0 && navigator.userAgent.indexOf('Mobile Safari')>0 && $(window).width()<'703'){
		//scroll personalizado desarrollado aqui para el galaxy y versiones de android que no soportan overflow:auto/scroll
		loadjscssfile("static/js/scroll.js", "js");
		$('body').addClass('sIII');
		if(navigator.userAgent.indexOf('SAMSUNG') > -1){
			$('body').addClass('androidNavigator');
		}
	} else if ($(window).width()<'703'){
		$('#menu_lateral_izquierdo').css('position', 'fixed');
		$('.topbar_mobile').css('position', 'fixed');
		//cuando no existe retorna undefined en el galaxy,
		if ($('.header_banner').length < 0) {
			$('.banner_container_mobile').css('margin-top','0px');
		}
	}
	
	if(navegador.toLowerCase() == "explorer" || navegador.toLowerCase() == "mozilla" || navegador.toLowerCase() == "firefox" ) {
		$('body').addClass(navegador.toLowerCase());
		$('body').addClass(navegador.toLowerCase()+vers.toString());
	}

	if (navigator.userAgent.indexOf('Mac OS X') != -1) {
	  $('body').addClass("mac");
	}
	
  });