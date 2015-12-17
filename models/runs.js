var mongoose = require('mongoose');

var RunSchema = new mongoose.Schema({
	title: String,
	date: Date,
	minutes: Number,
	hours: Number, 
	distance: Number,
	note: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Run', RunSchema);