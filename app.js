var express = require('express');
var app = express();



//to serve static files from the public folder: middleware
app.use(express.static('public'));
/*
app.get('/', function(request, response){
  response.sendFile(__dirname+'/public/index.html');
  //the send function converts objects and arrays to JSON
});
*/

var cities = require('./routes/cities');
app.use('/cities', cities);

/*
app.param('name', function(request, response, next){

app.route('/cities')

app.route('/cities/:name')
  */


app.listen(3000, function(){
  console.log("Listening on port 3000");

});
//question spaces in request


