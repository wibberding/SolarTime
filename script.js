var solarTime = {
	checkLocationMethod: function() { //Checks location input (one of three).
		if(document.getElementById('device').checked) {
			this.deviceFindLocation();
		// } else if (document.getElementById('zipcodeButton').checked) {
		// 	this.zipcodeFindLocation();
		} else {
			this.longi = this.longitudeFindLocation();
		}
		this.displayTime(this.findSolarTime());

	},

	deviceFindLocation: function() { //Find longitude by device.
		if (navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function(position) {
    			var latitude = position.coords.latitude;
    			var longitude = position.coords.longitude;
    			// alert("Your position: " + latitude + ", " + longitude);
    			solarTime.longi = longitude;
  			});
   		} else {
   			alert("Geolocation is not supported by this browser.");
   		}
  	},

	longitudeFindLocation: function() { //Find longitude by longitude. Format to standard.
		var longTemp = document.getElementById('longitude').value;
		// alert(long);
		return longTemp;
	},

	// zipcodeFindLocation: function() { //Find longitude by zipcode.
	// 	var zip = document.getElementById('zipcode').value;
	// 	var request = "https://zipcodedistanceapi.redline13.com/rest/SCzMta7zwXomImY0bGcYJo7TNr3nwe4oRDblNiUkgiHYEFZQmbO6AVZnn3KThPi9/info.json/" + zip + "/degrees"
	// 	var jsonToParse = this.httpGet(request);
	// 	var info = JSON.parse(jsonToParse); //HERE
	// 	var longTemp = info.lng;
	// 	solarTime.longi = longTemp;
	// },

	// httpGet: function(theUrl) {
	// 		var xmlHttp = null;
	// 		xmlHttp = new XMLHttpRequest();
	// 		xmlHttp.open( "GET", theUrl, false );
	// 		xmlHttp.send( null );
	// 		return xmlHttp.responseText;
	// },

	findSolarTime: function(){ // Calulates Solar Time based on LatLong location
		var longi = this.longi;
		var a = longi * 4 * 60000; // converts to milliseconds from UTC.
		var b = this.earthCorrect * 60000;
		var c = new Date();
		var d = c.getTime(); //date in milliseconds.
		var e = new Date(d + a + b);
		return e;
	},

	displayTime: function(adjustedDate) {

		var today= adjustedDate;
		var h=today.getUTCHours();
		var m=today.getUTCMinutes();
		var s=today.getUTCSeconds();
		// add a zero in front of numbers<10
		m=this.checkTime(m);
		s=this.checkTime(s);
		document.getElementById('clock').innerHTML=h+":"+m+":"+s;
		t=setTimeout(function(){solarTime.displayTime(solarTime.findSolarTime())},500);
	},

	checkTime: function(i) {
			if (i<10) {
	  			i="0" + i;
	 		}
		return i;
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

	longi: -12.26758199999999, // Property to store longitude.
	earthCorrect: 0 //Property to store correction to avoid repeated calculation. Stored during startup.

} //Closing bracket for solarTime Object.



///////////////////// Startup Code ////////////

Date.prototype.getDOY = function() { // Adds DOY method to Date prototype.
var onejan = new Date(this.getFullYear(),0,1);
return Math.ceil((this - onejan) / 86400000);
}

solarTime.earthCorrect = solarTime.earthCorrection(); //stores earth correction for repeated use.

