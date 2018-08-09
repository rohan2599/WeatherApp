
const yargs = require('yargs');
const axios = require ('axios');


const argv = yargs.
options({

	a:{
		demand:true,
		alias:'address',
		describe:'Address to get weather of the location',
		string: true
	}
})
.options({

  address:{
  	demand :true,
  	alias:'address',
  	describe:'Another tag to fetch address',
  	string:true
  }

})  
.help()
.alias('help','h')
.argv;


var encodeAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeUrl).then((response)=>{
	if(response.data.status === 'ZERO_RESULTS'){
		throw new error('unable to find address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/a383007c66aee9064e917b24cd25839e/${lat},${lng}`;

console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl)

}).then((response)=>{

	var temperature =  response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;

	console.log('current Temperature :', temperature);
	console.log('Feels like: ',apparentTemperature);






}).catch((e)=>{
	if(e.code === 'ENOTFOUND'){ 
		console.log('unable to fetch data');
	}
	else{
		console.log(e.message);
	}

});









