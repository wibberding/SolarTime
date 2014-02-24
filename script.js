var solarTime = {
	checkLocationMethod: function() { //Checks location input (one of three).
		if(document.getElementById('device').checked) {
			this.longitude = this.deviceFindLocation();
		} else if (document.getElementById('zipcodeButton').checked) {
			this.longitude = this.zipcodeFindLocation();
		} else {
			this.longitude = this.longitudeFindLocation();
		}
		this.findSolarTime();
	},

	deviceFindLocation: function() { //Find longitude by device.
		// alert('made it to device');
		return longitude;
	},

	longitudeFindLocation: function() { //Find longitude by longitude. Format to standard.
		var long = document.getElementById('longitude').value;
		alert(long);
		return longitude;
	},

	zipcodeFindLocation: function() { //Find longitude by zipcode.
		var zip = document.getElementById('zipcode').value;
		alert(zip);
		return longitude;
	},

	findSolarTime: function(){ // Calulates Solar Time based on LatLong location
		var longi = this.longi;
		var a = longi * 4 * 60000; // converts to milliseconds from UTC.
		var b = this.earthCorrect * 60000;
		var c = new Date();
		var d = c.getTime(); //date in milliseconds.
		var e = new Date(d + a + b);
		alert(e.toUTCString());
	
	},

	earthCorrection: function(day) { //Corrects for earth's orbit by day of year.
		var d = day || this.dayOfYear(); // uses today if no day is passed.
		var b = (d -81) * (360/365);
		var convertToDegrees = 0.017453293;
		var e = (9.87*Math.sin(2*b*convertToDegrees)) - (7.53* Math.cos(b*convertToDegrees)) - (1.58 * Math.sin(b*convertToDegrees));
		return e; // in 'time' minutes, not location minutes.
	},
	changeToLong: function() { // when longitiude is focused on, radio button changes to longitude option.
		document.getElementById('latLong').checked = true;
	},
	changeToZip: function() {
		document.getElementById('zipcodeButton').checked = true;
	},
	dayOfYear: function() { // gets day of year.
		var d = new Date();
		return d.getDOY();
	},
	longi: -122.2798, // Property to store longitude.
	earthCorrect: 0 //Property to store correction to avoid repeated calculation.

} //Closing bracket for solarTime Object.



///////////////////// Startup Code ////////////

Date.prototype.getDOY = function() { // Adds DOY method to Date prototype.
var onejan = new Date(this.getFullYear(),0,1);
return Math.ceil((this - onejan) / 86400000);
}

solarTime.earthCorrect = solarTime.earthCorrection();

