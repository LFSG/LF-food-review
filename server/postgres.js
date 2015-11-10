var Sequelize = require('sequelize');

var sequelize = new Sequelize('truereview', 'WillG', undefined, {
  host: 'localhost',
  dialect: 'postgres'
});

// HERE'S THE ONE TABLE WITH ALL DATA
var YelpModel = sequelize.define('yelp', {
  name: {type: Sequelize.STRING},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  lon: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING, unique: true},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.INTEGER}
});

var FoursquareModel = sequelize.define('foursquare', {
  name: {type: Sequelize.STRING},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  lon: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.INTEGER}
});

sequelize.authenticate().then(function(err, data) {
  console.log('Connected with PostgreSQL');
}).catch(function(err) {
  console.log(err.message);
});

sequelize.sync();

module.exports = {
  yelpDatabaseSync: function(data)  {
    console.log(data);
    YelpModel.bulkCreate(data)
      .then(function() {
        console.log(`${modelName} was created!`);
        next();  
      });
  },
  fourSqDatabaseSync: function(data)  {
    FoursquareModel.bulkCreate(data)
      .then(function() {
        console.log(`${modelName} was created!`);
        next();  
      });
  },
  getTables: function(){
    var yelp = YelpModel
      .findAll()
      .then(function(yelpData){
          return yelpData;
      });
    var fourSq = FoursquareModel
      .findAll()
      .then(function(fourSqData){
        return fourSqData;
      });
    Promise.all([yelp, fourSq])
      .then(function(val) {
        console.log(val);
        return val;
      });
  }

};
