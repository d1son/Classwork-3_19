var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

/*Mongoose Connect*/
var db = 'mongodb://localhost/orders';
mongoose.connect(db);

var Order = require('./Order');

app.use(logger('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.send(index.html);
});


app.get('/orders', function(req, res){
//find all orders, set up the route to interact with the database
	Order.find(function(err, docs) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			res.send(docs);
		}
	})

});

app.post('/neworder', function(req, res){
//create a new order
	var newOrder = new Order(req.body);
	newOrder.save(function(err, doc) {
		if (err){
			console.log(err);
			res.send(err);
		} else {
			console.log(doc);
			res.send(doc);
		}
	});
});


var port = 3000;
app.listen(port, function() {
  console.log("listening on port:" + port);
});
