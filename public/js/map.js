$(document).ready(
	function(){
		
		getLocation();
		
		function getLocation()
		{
			showMapOnly(51.550, 0.616, 3);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(getLatLng);
			}
		}

		function getLatLng (position) {
			var lat = position.coords.latitude
			var lng = position.coords.longitude
			
			showMap(lat, lng, 17);
		}


		function showMapOnly (lat, lng, zoom) {
			
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


		function showMap (lat, lng, zoom){

			var mapDiv = document.getElementById('map');
			var latLng = new google.maps.LatLng(lat,lng);
			
			var options = {
				center: latLng,
				zoom: zoom,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}; //options

			var map = new google.maps.Map(mapDiv, options); //new map
			var timer;
			
			// add event handler for map movements
			google.maps.event.addListener(map, 'bounds_changed', 
				function() {
					clearTimeout(timer);
					timer = setTimeout(
						function plotPlaces (lat, lng, zoom){
						// get map bounds
						// var bounds = map.getBounds();
						// console.log(bounds.getSouthWest());
						lat = map.getCenter().lat();
						console.log(lat);
						lng= map.getCenter().lng();
						console.log(lng);
						
						$.getJSON("http://localhost:3000/location/ratings.json?long=" + lng + "&lat=" + lat, 
							function (data) {
								
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
								
								var position;
								var infowindow;
								var places = [];
								
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
												infowindow.setContent('<div class="popup">' +
													 '<h3>Daves Deadly Kebab<h3>' +
													 '<h4>125 the street, darlington</h4>' +
													 '<div class="ratingIMG"><img src="img/score1.jpeg"/></div>' +
													 '<a class="yes button green" href="#">Eat Here</a>' +
													 '<a class="no button red" href="#">No Thanks</a>' +
													'</div>');
												
												// Open the infowindow tied to the marker
												infowindow.open(map, marker);
												
											} // anonymous inner function
										); // addlistener
										
									})(t, marker); // immediately invoke the function and pass the variables in
									
								} // for loop
								
								//console.log(places);
								
								} // anonymous inner function
							);	// getJSON //arrays
						} //plotPlaces
					, 500); // setTimeout
				}
			); // addlistener
		} // plotPlaces
	} // anonymous inner function
); // $(document).ready



	

