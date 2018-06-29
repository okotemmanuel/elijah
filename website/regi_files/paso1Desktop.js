$(document).ready(function(){

	
	$('.box .checkboxImg').click(function(event) {
		
		var src=$(this).attr('src');
		if(src=='http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_activo.png')
		{
			$(this).attr('src', 'http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_inactivo.png');
			$('.checktext .box').find('input').attr('checked', false);
		}
		else if(src=='http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_inactivo.png'){
			$(this).attr('src','http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_activo.png');
			$('.checktext .box').find('input').attr('checked',true);
		}
		
			
	});
	
	$('.txtbox .checkboxImg').click(function(event) {
		
		var src=$(this).attr('src');
		if(src=='http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_activo.png')
		{
			$(this).attr('src', 'http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_inactivo.png');
			$('.aviso  .txtbox').find('input').attr('checked', false);
		}
		else if(src=='http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_inactivo.png'){
			$(this).attr('src','http://st.mngbcn.com/web/i/testeando/checkoutDesktop2/img/chek_activo.png');
			$('.aviso  .txtbox').find('input').attr('checked',true);
		}
		
			
	});
		
	//Si se pulsa fuera del modal de "recordar password", debe simularse el comportamiento de si pulsamos en el boton de cerrar del modal
	$("[id$='popupAvisoPasswordOlvidado']").click(function(){
		$("[id$='ogChkPwd:close']").click();
	});
	
	//Si se pulsa fuera del modal de "entrealmacenes", debe simularse el comportamiento de si pulsamos en el boton de cerrar del modal
	$("[id$='FChkAlm']").click(function(){
		$("[id$='FChkAlm:close2']").click();
	});
});