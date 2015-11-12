var Sequelize = require('sequelize');
var express = require('express');
var app = express();
var YelpModel = require('./postgres.js').yelpModel;

var findYelpData = function (req, res, next) {
		
	YelpModel.findAll().then(function (posts){

		console.log(posts);
		res.send(posts);

	})

	// console.log();
	// res.end();
}


module.exports = findYelpData;