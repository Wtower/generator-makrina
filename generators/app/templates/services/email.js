/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var Promise = require('bluebird');
var nodemailer = require('nodemailer');

var transporter = Promise.promisifyAll(
  nodemailer.createTransport({
    host: '',
    auth: {
      user: '',
      pass: ''
    },
    secure: true
    // tls: {rejectUnauthorized: false}
  })
);

module.exports = transporter;
