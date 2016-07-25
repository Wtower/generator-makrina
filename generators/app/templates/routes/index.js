var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:locale(el|en)?', function(req, res, next) {
  if (req.params.locale) req.setLocale(req.params.locale);
  res.render('index', {
    title: '<%= verboseName %>',
    lang: req.getLocale(),
    description: '<%= description %>'
  });
});

// The following works as well
//router.get('/:locale(el|en)?/about', function(req, res, next) {

module.exports = router;
