var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var assert = require('assert');
var	http = require('http');
var request = require('superagent');
var express = require('express');
var app = express();

var server = require('../server/server');

describe('server routes', function () {
  it('should return 200 for /', function (done) {
    http.get('http://localhost:3000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('should return 200 for /yelp', function (done) {
    http.get('http://localhost:3000/yelp', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
