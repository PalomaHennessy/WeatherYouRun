var express = require('express');
var User = require('../models/users');
var router = express.Router();
var Runs = require('../models/runs');
var ObjectId = require("mongoose").Types.ObjectId;

router.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    User.create(req.body, function(err, user) {
      if (err) return res.status(500).send(err);
      res.send(user);
    });
  });

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

router.get("/:id/runs", function(req, res){
  Runs.find({user: req.params.id}, function(err, runs){
    res.send(runs);
  });
});

module.exports = router;