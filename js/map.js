$(document).ready(function(){

		getLocation();

function getLocation()
  {
  	showMap(51.550, 0.616);
  if (navigator.geolocation)

    {
    navigator.geolocation.getCurrentPosition(getLatLng);
    }
  	
  }

/*function showLatLong(position)
  {
  $("#demo").html("Latitude: " + position.coords.latitude + 
  "<br />Longitude: " + position.coords.longitude
  )};
*/

function getLatLng (position) {
	var lat = position.coords.latitude
	var lng = position.coords.longitude

	//showMap(lat,lng);
	//showMarker(lat,lng);
	plotPlaces(lat,lng);
}



function showMap (lat,lng) {
	
	console.log(lat);
	console.log(lng);
	
		var mapDiv = document.getElementById('map');
		var latLng = new google.maps.LatLng(lat,lng);

		var options = {
			center: latLng,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(mapDiv, options);
	
};




function showMarker (lat,lng) {

	console.log(lat);
	console.log(lng);
	
		var mapDiv = document.getElementById('map');
		var latLng = new google.maps.LatLng(lat,lng);
		
		var options = {
			center: latLng,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(mapDiv, options);
		
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
		})

};


function plotPlaces (lat,lng){

	var mapDiv = document.getElementById('map');
		var latLng = new google.maps.LatLng(lat,lng);
		
		var options = {
			center: latLng,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}; //options

		var map = new google.maps.Map(mapDiv, options); //new map
		

		$.getJSON("http://www.mentessi.com/maplife/fsadata.json", function (data) {
			function getPlaceLat(i){
				if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode==null){
				}
				else {
					return parseFloat(data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode.Latitude);
				}
			}

		function getPlaceLng(i){
				if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode==null){
				} 
				else {
					return parseFloat(data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode.Longitude);
				}
			}		
			
			
			//var placeLatitudes = [];
			//var placeLongitudes = [];
			var places = [];
			var position;

			for (var t= 0; t < data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.length; t++) {
				console.log("Latitude=" + getPlaceLat(t) + ", Longitude=" + getPlaceLng(t));

				if (getPlaceLat(t)==null || getPlaceLng(t)==null) {
					// do nothing cos position is null
				}
				else {
					position = new google.maps.LatLng(getPlaceLat(t),getPlaceLng(t));
					var marker = new google.maps.Marker({
					position: position,
					map: map,
					})
					places.push(new google.maps.LatLng(getPlaceLat(t),getPlaceLng(t)));
				}


				
				//placeLatitudes.push(getPlaceLat(t));

				//placeLongitudes.push(getPlaceLng(t));

			}
				//console.log(placeLatitudes);
				//console.log(placeLongitudes);
				console.log(places);
			

		});	//getJSON //arrays







		

}//plotPlaces

}); //document ready



	

