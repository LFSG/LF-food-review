var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var Sequelize = require("sequelize");
var YelpModel = require('./../server/postgres').yelpModel;
var DatabaseSync = require("./../server/postgres").yelpDatabaseSync;
//testing if can add yelp records to database

describe("Yelp", function () {
  this.timeout(5000);
  var testData = [
      {
      name: 'test',
      rating: 1,
      review_count: 1,
      lat: 1,
      lon: 1,
      address: 'Real Street',
      city: 'LA',
      state: 'CA',
      postal_code: 01234
    },
    {
    name: 'test2',
    rating: 2,
    review_count: 2,
    lat: 2,
    lon: 2,
    address: 'Fake Street',
    city: 'LA',
    state: 'CA',
    postal_code: 01234
  },
  ];
  //test to see if a record is being created.
  it("should create record", function (done) {
      DatabaseSync(testData);
      YelpModel.find({
        where: {address: testData[0].address}
      })
      .then(function(data){
        expect(data.address).to.equal(testData[0].address);
        done();
      });
  });

  it("should not have duplicate restaurants based on name", function(done) {
    DatabaseSync(testData);
    DatabaseSync(testData);
    YelpModel.find({
      where: {name: testData.name}
    })
    .then(function(data){
      done();
    });
  });
});
