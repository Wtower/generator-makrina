/**
 * Created by yeoman generator-makrina on <%= date %>.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../models/object');

mongoose.connect('mongodb://127.0.0.1/<%= name %>', function(err) {
  if (err) console.log('connection error', err);
  else console.log('connection successful');
});

module.exports = mongoose;
