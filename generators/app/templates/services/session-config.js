/**
 * Created by yeoman generator-makrina on <%= date %>.
 */
const mongoose = require('./mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var sessionConfig = function() {
  return session({
    secret: '<%= uuid %>',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session',
      ttl: 24 * 60 * 60 // 1 day
    })
  });
};

module.exports = sessionConfig;
