var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var Urlencoded = bodyParser.urlencoded({ extended: false });
//a middleware function

var redis = require('redis');
var client = redis.createClient();

//client.select(process.env.NODE_ENV.length);

//hashset, send in key/value
client.hset('cities', 'Walnut Creek', 'My hometown');
client.hset('cities', 'Oakland', 'Hipsterville');
client.hset('cities', 'Fremont', 'where is that');

/*
var cities = {
  'walnutcreek' : ["Walnut Creek", "My hometown"],
  'oakland' : ['Oakland', 'Where the hipsters live'],
  'sanfrancisco': ['San Francsico', 'The new Athens']
}
*/


//path relative
router.route('/')
  .get(function(request, response){
      client.hkeys('cities', function(error, names){
        if(error) throw error;
        response.json(names);
      });
    })


  .post(Urlencoded, function(request, response){
    var newCity = request.body;
    if(!newCity.name || !newCity.description){
      response.sendStatus(400);
      return false;
    }
    client.hset('cities', newCity.name, newCity.description, function(error){
      if(error) throw error;
      response.status(201).json(newCity.name);
    })
  });

router.route('/:name')
    .all(function(request, response, next){
      var city = request.params.name;
      //var city = name.slice(0).toLowerCase();
      request.cityName = city;
      next();
  })
  .get(function(request, response){
      //only match on exact block names; normaliz request parameters
      client.hget('cities', request.params.name, function(error, description){
        response.render('show.ejs', { city: { name: request.params.name, description: description }});
      });

  })
  .delete(function(request, response){
      client.hdel('cities', request.params.name, function(error){
        if(error) throw error;
        response.sendStatus(204);
      });

  });

module.exports = router;
//exports the router as a Node module
