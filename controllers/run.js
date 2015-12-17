var express = require('express');
var Run = require('../models/runs');
var router = express.Router();

router.route('/')
.get(function(err, res){
	console.log("****** Am I here?");
	Run.find(function(err, runs){
		if (err) return res.status(500).send(err);
		res.send(runs)
	});
})
.post(function(req, res){
	console.log('post this run damn it')
	Run.create(req.body, function(err, run){
		if(err) return res.status(500).send(err);
		res.send(run);
	});
});
router.route('/:id')
.get(function(req, res){
	console.log("Trying to return a run");
	Run.findById(req.params.id, function(err, run){
		console.log(run);
		if (err) return res.status(500).send(err);
		res.send(run);
	});
})
.put(function(req, res){
	Run.findByIdAndUpdate(req.params.id, function(err, run){
		if (err) return res.status(500).send(err);
		res.send({'message': 'success'});
	});
})
.delete(function(req, res){
	Run.findByIdAndRemove(req.params.id, function(err, run){
		if (err) return res.status(500).send(err);
		res.send({'message': 'success'});
	});
});


module.exports = router;