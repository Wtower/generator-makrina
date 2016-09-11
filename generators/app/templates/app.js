/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
// require('newrelic');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var i18n = require('i18n');
var i18nConfig = require('./services/i18n-config');
var sessionConfig = require('./services/session-config');

var routes = require('./routes/index');
var apiContact = require('./routes/api/contact');
var routesAdmin = require('./routes/admin');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
i18n.configure(i18nConfig);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'node_modules')));

app.use(sessionConfig());
app.use(csrf({ cookie: true }));
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
});
app.use(i18n.init);

app.use('/', routes);
app.use('/api/contact', apiContact);
app.use('/admin', routesAdmin);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// istanbul ignore next
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// istanbul ignore next
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
