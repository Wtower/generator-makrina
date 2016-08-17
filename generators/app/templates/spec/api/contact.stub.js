/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var request = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');
var express = require('express');
var getToken = require('../helpers/get-token');

describe('Routing: API contact with stub transport', function() {
  var stub = sinon.stub();
  var app, email, route;

  beforeEach(function () {
    // configure stub transport for each run, 3rd run should fail
    stub
      .onCall(2)
      .returns(
        Promise.promisifyAll(
          nodemailer
            .createTransport(
              stubTransport({error: new Error('ERR')})
            )));
    stub
      .returns(
        Promise.promisifyAll(
          nodemailer
            .createTransport(stubTransport())
        ));
    // Mock requires
    route = proxyquire('../../routes/api/contact.js', {
      '../../services/email': stub()
    });
    app = proxyquire('../../app', {
      './routes/api/contact': route
    });
  });

  it('should require csrf protection', function(done) {
    sinon.assert.calledOnce(stub);
    request(app)
      .post('/api/contact')
      .expect(403)
      .end(done);
  });

  it('should send an email', function(done) {
    sinon.assert.calledTwice(stub);
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        request(app)
          .post('/api/contact')
          .set({cookie: res.headers['set-cookie']})
          .send({_csrf: getToken(res.headers['set-cookie'])})
          .expect(200)
          .end(done);
      });
  });

  it('should fail', function(done) {
    sinon.assert.calledThrice(stub);
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        request(app)
          .post('/api/contact')
          .set({cookie: res.headers['set-cookie']})
          .send({_csrf: getToken(res.headers['set-cookie'])})
          .expect(502)
          .end(done);
      });
  });
});
