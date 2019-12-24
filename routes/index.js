const ctrl = require('../controller/userController');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '1958' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '1958' });
});
router.post('/', ctrl.login);

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: '1958' });
});
router.post('/register', ctrl.register);

module.exports = router;
