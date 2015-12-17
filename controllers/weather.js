var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/:search', function(req, res){
	console.log('running?')
	var search = req.params.search;
	console.log(search)
	console.log(process.env)
	request('http://api.openweathermap.org/data/2.5/weather?q='+search+'&units=imperial&APPID='+process.env.WEATHER_KEY,
	function(error, response, body){
		console.log('inside here?')
	if (!error && response.statusCode == 200){
		var data = JSON.parse(body);
		res.send(data)
		console.log(body)
		}
		else{
			console.log('response')
		}
	})
})

module.exports = router;