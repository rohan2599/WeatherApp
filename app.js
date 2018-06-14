
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const request = require('request');
const sprintf = require('sprintf-js').sprintf;

const weather= require('./weather/example');

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
if(argv.address == "" || argv.address == undefined){
	argv.address = 302004;
	console.log('using the default address');
}


geocode.geocodeAddress(argv.address).then((location)=>{

console.log(sprintf("%-25s","location:"),location.address);

return weather.getWeather(location);

}).then((message)=>{
	console.log(sprintf("%-25s", "current temperature"),message.temperature ,sprintf("%cF or",176), Math.round(((message.temperature - 32)*5)/9), sprintf("%cC",176));
	console.log(sprintf("%-25s","precipitation"),message.precipitation);
	console.log(sprintf("%-25s","Humidity"),message.humidity);
	console.log(sprintf("%-25s","wind"),message.wind);
	console.log(sprintf("%-25s","visibility"),message.visibility);

}).catch((errorMessage)=>{
	console.log(errorMessage);
});