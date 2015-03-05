var express = require('express');
var app = express();



//to serve static files from the public folder: middleware
app.use(express.static('public'));


var cities = require('./routes/cities');
app.use('/cities', cities);




app.listen(1234, function(){
  console.log("Listening on port 1234");

});

module.exports = app;


