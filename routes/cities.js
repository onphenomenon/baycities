var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var Urlencoded = bodyParser.urlencoded({ extended: false });
//a middleware function
/*
var redis = require('redis');
var client = redis.createClient();

client.select(process.env.NODE_ENV.length);

//hashset, send in key/value
client.hset('cities', 'Walnut Creek', 'description');
client.hset('cities', 'Oakland', 'description');
client.hset('cities', 'Fremont', 'description');
*/

var cities = {
  'walnutcreek' : ["Walnut Creek", "My hometown"],
  'oakland' : ['Oakland', 'Where the hipsters live'],
  'sanfrancisco': ['San Francsico', 'The new Athens']
}


//path relative
router.route('/cities')
  .get(function(request, response){
  //var cities = ['Walnut Creek', "Oakland", "Berkeley" ];
    if(request.query.limit >= 0){
      response.json(cities.slice(0, request.query.limit));
    } else {
      client.hkeys('cities', function(error, names){
        if(error) throw error;
        response.json(names);
      })

    }
  })

  .post(Urlencoded, function(request, response){
    var newCity = request.body;
    client.hset('cities', newCity.name, newCity.description, function(error){
      if(error) throw error;
    }
    //cities[newCity.name] = newCity.description;

    response.status(201).json(newCity.name);
    //status code created,
  });

router.route('/cities/:name')
    .all(function(request, response, next){
      var name = request.params.name;
      var city = name.slice(0).toLowerCase();
      request.cityName = city;
      next();
  })
  .get(function(request, response){
      //only match on exact block names; normaliz request parameters

      var description = cities[request.cityName];
      if(!description){
        response.status(404).json("No description found for " + request.params.name);
      } else {
        response.json(description);
      }
  })
  .delete(function(request, response){
      delete cities[request.cityName];
      reponse.sendStatus(200);
  });

module.exports = router;
//exports the router as a Node module
