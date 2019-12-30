const ctrl = require('../controller/userController');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ctrl.home);

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '1958' });
});
router.post('/login', ctrl.login);

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: '1958' });
});
router.post('/register', ctrl.register);

/* GET product page. */
router.get('/product', ctrl.product);

router.post('/product', ctrl.upload);

module.exports = router;
