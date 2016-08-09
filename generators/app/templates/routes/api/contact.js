/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var express = require('express');
var router = express.Router();
var email = require('../../services/email');
var Promise = require('bluebird');
var path = require('path');
var ejs = Promise.promisifyAll(require('ejs'));

router.post('/', function(req, res, next) {
  ejs.renderFileAsync(path.join(__dirname, '../../views/contact.txt.ejs'), {contact: req.body})
    .then(function (tpl) {
      var mailOptions = {
        from: '',
        to: '',
        subject: '[<%= verboseName %>] [Website Feedback] ' + req.body.subject,
        text: tpl
      };
      return email.sendMail(mailOptions);
    })
    .then(function (){
      return res.send('Message sent');
    })
    .catch(function (error) {
      console.log(error);
      return res.status(502).send(error);
    });
});

module.exports = router;
