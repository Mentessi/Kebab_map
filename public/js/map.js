$(document).ready(function(){
	var map;
	var mapDiv;
	var latLng;
	var lat;
	var lng;
	var infowindow;
	var timeoutHandle;
	
	getLocation();
	
	function getLocation() {
		// check if browser supports geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(drawLatLngOnMap);
		} else {
			drawDefaultLatLngOnMap();
		}
		console.log("getLocation lat= " + lat);
		console.log("getLocation lng= " + lng);
	} // getLocation()
	
	// receives position object from the navigator.geolocation.getCurrentPosition call
	function drawLatLngOnMap(position) {
		lat = position.coords.latitude
		lng = position.coords.longitude
		showMap(lat, lng, 14);
	} // drawLatLngOnMap
	
	// sets a default fixed lat and lng
	function drawDefaultLatLngOnMap() {
		lat = 51.550; // default
		lng = 0.616; // default
		showMap(lat, lng, 14);
	} // drawDefaultLatLngOnMap


	function showMap(lat, lng, zoom) {

		mapDiv = document.getElementById('map');
		latLng = new google.maps.LatLng(lat,lng);

		var options = {
			center: latLng,
			zoom: zoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}; //options

		map = new google.maps.Map(mapDiv, options); //new map

		// add event handler for map movements
		google.maps.event.addListener(map, 'bounds_changed', 
			function() { 
				if (timeoutHandle) {
					clearTimeout(timeoutHandle);
				}
				timeoutHandle = setTimeout(function() {
					plotPlaces(lat, lng, zoom);
					timeoutHandle = null;
				}, 500);
			} // anonymous inner function
		); // addlistener
	} // showMap
	
	function plotPlaces (lat, lng, zoom){
		
		// get map bounds
		// var bounds = map.getBounds();
		// console.log(bounds.getSouthWest());
		lat = map.getCenter().lat();
		console.log(lat);
		lng= map.getCenter().lng();
		console.log(lng);
		
		// http://localhost:3000/location/ratings.json?long=0.616&lat=51.550
		$.getJSON("http://localhost:3000/location/ratings.json?long=" + lng + "&lat=" + lat, plotData);	// getJSON //arrays
	} //plotPlaces
	
	function plotData(data) {
		
		console.log("Got Data!");
		
		function getData_FHRSID(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].FHRSID;
			}
		}
		
		function getData_LocalAuthorityBusinessID(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].LocalAuthorityBusinessID;
			}
		}
		
		function getData_BusinessName(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].BusinessName;
			}
		}
		
		function getData_BusinessType(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].BusinessType;
			}
		}
		
		function getData_BusinessTypeID(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].BusinessTypeID;
			}
		}
		
		function getData_AddressLine1(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].AddressLine1;
			}
		}
		
		function getData_AddressLine2(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].AddressLine2;
			}
		}
		
		function getData_AddressLine3(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].AddressLine3;
			}
		}
		
		function getData_PostCode(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].PostCode;
			}
		}
		
		function getData_RatingValue(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return parseInt(data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].RatingValue);
			} else {
				return 'unknown'
			}
		}
		
		function getData_RatingKey(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].RatingKey;
			} else {
				return 'unknown'
			}
		}
		
		function getData_RatingDate(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].RatingDate;
			} else {
				return 'unknown'
			}
		}
		
		function getData_LocalAuthorityCode(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].LocalAuthorityCode;
			} else {
				return 'unknown'
			}
		}
		
		function getData_LocalAuthorityName(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].LocalAuthorityName;
			} else {
				return 'unknown'
			}
		}
		
		function getData_LocalAuthorityWebSite(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].LocalAuthorityWebSite;
			} else {
				return 'unknown'
			}
		}
		
		function getData_LocalAuthorityEmailAddress(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].LocalAuthorityEmailAddress;
			} else {
				return 'unknown'
			}
		}
		
		function getData_Scores(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Scores;
			} else {
				return 'unknown'
			}
		}
		
		function getData_SchemeType(i) {
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].SchemeType;
			} else {
				return 'unknown'
			}
		}
		
		function getData_Geocode_Longitude(i){
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return parseFloat(data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode.Longitude);
			}
		} // getData_Geocode_Longitude
		
		function getData_Geocode_Latitude(i){
			if (data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i]!=null){
				return parseFloat(data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail[i].Geocode.Latitude);
			}
		} // getData_Geocode_Latitude
		
		function constructAddress(i) {
			var Address = "";
			if(getData_AddressLine1(i)!=undefined) {
				Address = Address + getData_AddressLine1(i);
			}
			if(getData_AddressLine2(i)!=undefined) {
				if(Address!="") { 
					Address = Address + ', ' + getData_AddressLine2(i);
				} else {
					Address = Address + getData_AddressLine2(i);
				}
			}
			if(getData_AddressLine3(i)!=undefined)  {
				if(Address!="") {
					Address = Address + ', ' + getData_AddressLine3(i);
				} else {
					Address = Address + getData_AddressLine3(i);
				}
			}
			if(getData_PostCode(i)!=undefined) {
				if(Address!="") { 
					Address = Address + ', ' + getData_PostCode(i);
				} else {
					Address = Address + getData_PostCode(i);
				}
			}
			return Address
		} // constructAddress
		
		function get_RatingImageName(i) {
			var RatingValue = getData_RatingValue(i);
			if (!RatingValue) {
				return 'fhrs_awaitingpublication_en-gb.jpg'
			} else {
				return 'score' + RatingValue + '.jpg'
			}
		} // get_RatingImageName
		
		function construct_InfoWindowContent(i) {
			return '<div class="popup">' +
				 '<h4>' + getData_BusinessName(i) + '<h4>' + 
				 '<p>' + constructAddress(i) + '</p>' +
				 '<div class="ratingIMG"><img src="img/' + get_RatingImageName(i) + '"/></div>' +
				 '<a class="yes button green" href="#">Eat Here</a>' +
				 '<a class="no button red" href="#">No Thanks</a>' +
				'</div>'
		} // construct_InfoWindowContent
		
		var position;
		var places = [];

		for (var t= 0; t < data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.length; t++) {
			// console.log("Latitude=" + get_Geocode_Latitude(t) + ", Longitude=" + get_Geocode_Longitude(t));
			var Geocode_Latitude = getData_Geocode_Latitude(t);
			var Geocode_Longitude = getData_Geocode_Longitude(t);
			if (!Geocode_Latitude || !Geocode_Longitude) {
				// do nothing cos position is null
			}
			else {
				position = new google.maps.LatLng(Geocode_Latitude, Geocode_Longitude);
				var marker = new google.maps.Marker({
				position: position,
				map: map,
				title: getData_BusinessName(t)
				}) // marker
				places.push(new google.maps.LatLng(Geocode_Latitude, Geocode_Longitude));
			}
			
			(function(i, marker) {
				google.maps.event.addListener(marker, 'click',
					function() {
						
						// initialize the infowindow variable if not already initilized (i.e. on first iteration)
						if (!infowindow) {
							infowindow = new google.maps.InfoWindow();
						}
						
						// Set the infowindow content
						infowindow.setContent(construct_InfoWindowContent(i));

						// Open the infowindow tied to the marker
						infowindow.open(map, marker);

					} // anonymous inner function
				); // google.maps.event.addlistener
			})(t, marker); // declare function and immediately invoke
		} // for loop
	} // plotData
}); // $(document).ready



