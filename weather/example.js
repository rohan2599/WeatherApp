const request = require('request');


 //var getWeather =(lat ,lng ,callback)=>{
//request({url:`https://api.darksky.net/forecast/a383007c66aee9064e917b24cd25839e/${lat},${lng}`,json:true},(error,response,body)=>{
	//if(error){
	//	callback('unable to reach forecast.io servers ');
	//}
	//else if (response.statusCode === 400){
	//	callback('bad request error 400,unable to fetch weather');
	//}
	//else if(response.statusCode === 200){
	//	callback(undefined,{
	//		temperature:body.currently.temperature,
	//		apparentTemperature:body.currently.apparentTemperature  
	//	});
 
//}
//});

//};


var getWeather = function(message){
	return new Promise((resolve , reject)=>{
		request({url:`https://api.darksky.net/forecast/a383007c66aee9064e917b24cd25839e/${message.latitude},${message.longitude}`,json:true},(error,response,body)=>{
			if(response === undefined || response.statusCode ===400){
				reject('unable to fetch data from the servers');
			}

			else if(response.statusCode===200){
				resolve({
					temperature : body.currently.temperature,
					precipitation : body.currently.precipIntensity,
					humidity     : body.currently.humidity,
					visibility   : body.currently.visibility,
					wind         : body.currently.windSpeed 

				});
			}

		});

	});
};





module.exports.getWeather= getWeather