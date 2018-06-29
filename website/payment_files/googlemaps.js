
//<ui:fragment rendered="#{tiendaFisicaForm.envioTiendaFisica or packstationAction.packStationVisible or pickPointAction.pickPointVisible}">
//scripts de google maps para el envio a tiendas
				
var address;
var lat;
var lng;
var info;		  
function loadGoogleMaps(init){		
	if(document.getElementById("googleMaps")==null){
		var script = document.createElement("script");
		script.setAttribute("id","googleMaps");
  		script.type = "text/javascript";
  		script.src = "https://maps-api-ssl.google.com/maps/api/js?v=3&client=gme-mangoonlinesa&sensor=true&callback="+init;
  		document.body.appendChild(script);	

  	}
  	else {
  		var initGM = window[init];	  						  		
  		initGM();					
  	}
}
function resizeMapContent(element_name){
	var element = $("#" + element_name);
	if(element.length > 0){
		$(element).css('height', '350px');
	}
}
function initializeMapPackStation(){				  			  
	if(lat!=''){
	var latlng = new google.maps.LatLng(lat,lng);				 
	var options = {
	  zoom: 15,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};		
	map = new google.maps.Map(document.getElementById("map_canvas_packstation"), options);				
	var marker = new google.maps.Marker({
	   position: latlng,
	   title:info
	});				
	marker.setMap(map);	
  }		              
}		  		 

function initializeMapPickPoint(){	  		 
	if(lat!=''){				
	var latlng = new google.maps.LatLng(lat,lng);				 
	var options = {
	  zoom: 15,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};		
	map = new google.maps.Map(document.getElementById("map_canvas_pickpoint"), options);				
	var marker = new google.maps.Marker({
	   position: latlng,
	   title:info
	});				
	marker.setMap(map);						
  }		              
}	

function initializeMapDropPoint(){
	if(lat!=''){				
	var latlng = new google.maps.LatLng(lat,lng);				 
	var options = {
	  zoom: 15,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};		
	map = new google.maps.Map(document.getElementById("map_canvas_droppoint"), options);				
		var marker = new google.maps.Marker({
		   position: latlng,
		   title:info
		});				
		marker.setMap(map);						
	  }			  	
  	}

function initializeMapPostNlPoint(){
	if(lat!=''){				
	var latlng = new google.maps.LatLng(lat,lng);				 
	var options = {
	  zoom: 15,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};		
	map = new google.maps.Map(document.getElementById("map_canvas_postnlpoint"), options);				
		var marker = new google.maps.Marker({
		   position: latlng,
		   title:info
		});				
		marker.setMap(map);						
	  }			  	
  	}


	function initialize() {			  	  
		var geocoder = new google.maps.Geocoder();			  
	  	var latlng = new google.maps.LatLng(50,15);
	  	var myOptions = {
	    	zoom: 15,
	    	center: latlng,
	    	mapTypeId: google.maps.MapTypeId.ROADMAP
	  	}		   
	  	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);		       		   
	  	codeAddress(geocoder,map);		  			    
	}

  function codeAddress(geocoder, map) {  				    
    if (geocoder) {	      										    	
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);		         
          var marker = new google.maps.Marker({
              map: map, 
              position: results[0].geometry.location
          });
        } 
      });
    }
}
