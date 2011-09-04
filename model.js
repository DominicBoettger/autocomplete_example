var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/autocomplete');
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

// Person schema
var Person = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true}
});
mongoose.model('Person', Person);
var Person = exports.Person = mongoose.model('Person');