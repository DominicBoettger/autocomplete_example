/**
 * Example node.js application to show how jquery.ui autocomplete
 * can use data from a node.js socket connection
 * 
 * @author: Dominic Böttger
 * @date: 2011/09/04
 */

var sys = require('sys');

var express = require('express'),
    sys = require('sys'),
    app = module.exports = express.createServer(),
    models = require('./model'),
    Person = models.Person;

var app = module.exports = express.createServer();
var everyone = require("now").initialize(app);

//Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

// base url and template
app.get('/', function(req, res){
	res.render('index', {
	    title: 'Home'
	});
});

// now js search function
everyone.now.search = function(text, count, callback) {
	// create regex for "contains" and ignore case
	var regex = new RegExp(text.term, 'i');
	// execute the search
	Person.find({firstname: regex}, function(err, docs) {
	  var names = [];
	  for(var nam in docs) {
		  // push the firstname to the array
		  names.push(docs[nam].firstname);
	  }
	  // send back via callback function
	  callback(null, names);
  });
};

// function to create our test content...
app.get('/create', function(req, res){
	var person = new Person({firstname: 'Dominic', lastname: 'Böttger'});
	person.save();
	var person2 = new Person({firstname: 'Lorem', lastname: 'Ipsum'});
	person2.save();
	var person3 = new Person({firstname: 'Heinz', lastname: 'Ketchup'});
	person3.save();
	res.redirect('/');
});

app.listen(3000);
console.log("Autocomplete server listening on port %d in %s mode", app.address().port, app.settings.env);