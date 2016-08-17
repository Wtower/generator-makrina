/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var request = require('supertest');
var app = require('../app');
var getToken = require('./helpers/get-token');

describe('Routing: admin', function() {
  it('should redirect to login if no user', function(done) {
    request(app)
      .get('/admin')
      .expect(302)
      .expect('Location', '/admin/login')
      .end(done);
  });
  it('should redirect to login after logout', function(done) {
    request(app)
      .get('/admin/logout')
      .expect(302)
      .expect('Location', '/admin/login')
      .end(done);
  });
  it('should render login page without error', function(done) {
    request(app)
      .get('/admin/login')
      .expect(200)
      .end(done);
  });
  it('should require csrf protection', function(done) {
    request(app)
      .post('/admin/login')
      .expect(403)
      .end(done);
  });
  it('should not login and re-render login page with error', function(done) {
    // get login page to get csrf token
    request(app)
      .get('/admin/login')
      .expect(200)
      .end(function(err, res) {
        // post login
        request(app)
          .post('/admin/login')
          .set({cookie: res.headers['set-cookie']})
          .send({
            _csrf: getToken(res.headers['set-cookie']),
            username: 'invalid',
            password: 'invalid'
          })
          .expect(200)
          .end(done);
      });
  });
  it('should login and redirect to admin', function(done) {
    // get login page to get csrf token
    request(app)
      .get('/admin/login')
      .expect(200)
      .end(function(err, res) {
        // post login
        request(app)
          .post('/admin/login')
          .set({cookie: res.headers['set-cookie']})
          .send({
            _csrf: getToken(res.headers['set-cookie']),
            username: 'admin',
            password: '<%= pass %>'
          })
          .expect(302)
          .expect('Location', '/admin')
          .end(function (err, res) {
            // now test logged in connection to increase coverage
            var cookies = res.headers['set-cookie']
              .map(function (r) {
                return r.replace("; path=/; httponly", "")
              }).join("; ");
            request(app)
              .get('/admin')
              .set({'Cookie': cookies})
              .expect(200)
              .end(done);
          });
      });
  });
});
