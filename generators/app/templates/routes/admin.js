/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var express = require('express');
var router = express.Router();
var pack = require('../package.json');

var context = {
  title: 'Administration',
  name: '<%= verboseName %>',
  version: pack.version
};

router.get('/', function(req, res, next) {
  if (req.session.login) {
    context.user = req.session.user;
    res.render('admin', context);
  }
  else {
    res.redirect('/admin/login');
  }
});

router.get('/login', function (req, res, next) {
  context.loginError = false;
  context.csrf = req.csrfToken();
  res.render('login', context);
});

router.post('/login', function (req, res, next) {
  if (req.body.username == 'admin' && req.body.password == '<%= pass %>') {
    req.session.login = true;
    req.session.user = {
      id: 'admin',
      name: 'Administrator',
      image: 'images/9dev2sc.png'
    };
    req.session.save(function (err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      context.user = req.session.user;
      context.loginError = false;
      res.redirect('/admin');
    });
  }
  else {
    context.loginError = true;
    res.render('login', context);
  }
});

router.get('/logout', function (req, res, next) {
  req.session.login = false;
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;
