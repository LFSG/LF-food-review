var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var Sequelize = require("sequelize");
var Model = require("./../server/postgres").model;
var AddYelp = require("./../server/postgres").yelp;

//testing if can add yelp records to database

describe("AddYelp", function () {
  this.timeout(5000);
  var testData = [
      {
      name: 'test',
      rating: 1,
      review_count: 1,
      lat: 1,
      long: 1,
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
    long: 2,
    address: 'Fake Street',
    city: 'LA',
    state: 'CA',
    postal_code: 01234
  },
  ];
  //test to see if a record is being created.
  it("should create record", function (done) {
      AddYelp(testData);
      Model.find({
        where: {address: testData[0].address}
      })
      .then(function(data){
        console.log('HELLLLLLLLLOOOOOOOOO', data.address, testData[0].address);
        expect(data.address).to.equal(testData[0].address);
        done();
      });
  });

  // it("should not have duplicate restaurants based on address", function(done) {
  //   run Will function twice
  //   Model.create(testData)
  //   .then(Model.create(testData)
  //   .then(
  //   Model.count().then(function(count){
  //     expect(count).to.eql(100);
  //     done();
  //   })));
  // });
});
