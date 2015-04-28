function codeAddress() {
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById("address").value;
	alert("address: "+address);
	geocoder.geocode({ 'address': address }, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();
			alert("Latitude: " + latitude + "\nLongitude: " + longitude);
		} else {
			alert("Request failed.");
		}

	}

	});
};