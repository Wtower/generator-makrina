/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // in order to allow id in path, must disable uploading for entity create
      var p = path.join(__dirname, '..', '..', 'uploads', req.body.entity);
      mkdirp(p, function (err) {
        if (err) console.log(err);
        cb(null, p);
      });
    },
    filename: function(req, file, cb) {
      var p = path.join(__dirname, '..', '..', 'uploads', req.body.entity, file.originalname);
      fs.stat(p, function (err, stats) {
        if (stats) {
          var fileParts = file.originalname.split('.');
          fileParts.splice(Math.min(fileParts.length - 1, 1), 0, Date.now());
          cb(null, fileParts.join('.'));
        }
        else cb(null, file.originalname);
      });
    }
  }),
  limits: {fileSize: 10000000} // 10MB
}).single('file');

var status = {
  ok: 200,
  multipleChoices: 300,
  unauthorized: 401,
  accessDenied: 403,
  notFound: 404,
  notPermitted: 409,
  requestEntityTooLarge: 419,
  badGateway: 502
};

router.post('/', function(req, res, next) {
  if (!req.session.login) return res.redirect('/admin/login');
  // use middleware explicitly to override error
  upload(req, res, function (err) {
    if (err) {
      if (err.code == 'LIMIT_FILE_SIZE') {
        return res.status(status.requestEntityTooLarge).send('File too large.');
      }
      else return res.status(status.badGateway).send('File upload error.');
    }
    res.json({'upload': req.file.filename});
  });
});

module.exports = router;
