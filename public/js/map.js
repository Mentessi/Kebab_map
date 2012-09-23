$(document).ready(
	function(){
		
		getLocation();
		
		function getLocation()
		{
			showMap(51.550, 0.616);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(getLatLng);
			}
		}

		function getLatLng (position) {
			var lat = position.coords.latitude
			var lng = position.coords.longitude
			
			plotPlaces(lat, lng, 12);
		}


		function showMap (lat, lng, zoom) {
			
			console.log(lat);
			console.log(lng);
			
				var mapDiv = document.getElementById('map');
				var latLng = new google.maps.LatLng(lat,lng);

				var options = {
					center: latLng,
					zoom: zoom,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				var map = new google.maps.Map(mapDiv, options);
			
		};


		// function showMarker (lat, lng, zoom) {

			// console.log(lat);
			// console.log(lng);
			
			// var mapDiv = document.getElementById('map');
			// var latLng = new google.maps.LatLng(lat,lng);
			
			// var options = {
				// center: latLng,
				// zoom: zoom,
				// mapTypeId: google.maps.MapTypeId.ROADMAP
			// };

			// var map = new google.maps.Map(mapDiv, options);
			
			// var marker = new google.maps.Marker({
				// position: latLng,
				// map: map,
			// })

		// };


		function plotPlaces (lat, lng, zoom){

			var mapDiv = document.getElementById('map');
			
			var latLng = new google.maps.LatLng(lat,lng);
			
			var options = {
				center: latLng,
				zoom: zoom,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}; //options

			var map = new google.maps.Map(mapDiv, options); //new map
			

			$.getJSON("http://localhost:3000/data/fsadata.json", 
				function (data) {
				
					var places = [];
					var position;
					
					function getPlaceLat(i){
						if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode!=null){
							return parseFloat(data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode.Latitude);
						}
					} // getPlaceLat

					function getPlaceLng(i){
						if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode!=null){
							return parseFloat(data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode.Longitude);
						}
					} // getPlaceLng
					
					//Infowindow variable
					var infowindow;
					
					for (var t= 0; t < data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.length; t++) {
						// console.log("Latitude=" + getPlaceLat(t) + ", Longitude=" + getPlaceLng(t));
						if (getPlaceLat(t)==null || getPlaceLng(t)==null) {
							// do nothing cos position is null
						}
						else {
							position = new google.maps.LatLng(getPlaceLat(t),getPlaceLng(t));
							var marker = new google.maps.Marker({
							position: position,
							map: map,
							}) // marker
							places.push(new google.maps.LatLng(getPlaceLat(t),getPlaceLng(t)));
						}
						
						// anonymous function (immediately invoked) for event Handlers for marker interactions
						(function(i, marker) {
							
							google.maps.event.addListener(marker, 'click',
								function() {
								
									// initialize the infowindow variable if not already initilized (i.e. on first iteration)
									if (!infowindow) {
										infowindow = new google.maps.InfoWindow();
									}
									
									// Set the infowindow content
									infowindow.setContent('A dodgy kebab shop');
									
									// Open the infowindow tied to the marker
									infowindow.open(map, marker);
									
								} // anonymous inner function
							); // addlistener
							
						})(t, marker); // immediately invoke the function and pass the variables in
						
					} // for loop
					
					console.log(places);
					
				} // anonymous inner function
			);	// getJSON //arrays
		} // plotPlaces
	} // anonymous inner function
); // $(document).ready



	

