const request = require('request');
var geocodeAddress = function(address){


 return new Promise((resolve,reject)=>{

 	var encodeAddress = encodeURIComponent(address);

	request({url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,json:true},(error,response,body)=>{
	if(error){
		reject('unable to reach the servers');
	}

	else if(body.status === 'ZERO_RESULTS'){
		reject('unable to find that address');
	}

	else if(body.status === 'OK'){
		resolve({
			address: body.results[0].formatted_address,
			latitude:body.results[0].geometry.location.lat,
			longitude:body.results[0].geometry.location.lng
		});

}
}); 

	

 });
};


module.exports.geocodeAddress=geocodeAddress;
//geocodeAddress('jaipur rajasthan india').then((location)=>{
//	console.log(JSON.stringify(location,undefined,2));
//
//},(errorMessage)=>{
 //	console.log(errorMessage);

//});