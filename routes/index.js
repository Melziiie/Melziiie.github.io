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
router.get('/:id', ctrl.product);

router.post('/product', ctrl.uploadProduct);

router.get('/productManager', ctrl.loadProduct);
router.post('/productManager', function(req, res, next){
  console.log(req.body)
  if (req.body.Type == "delete"){
    ctrl.removeProduct(req, res);
  }
  if (req.body.Type == "modify"){
    ctrl.modifyProduct(req, res);
  }
});

router.get('/productModifier', ctrl.loadProductModifier);
router.post('/productModifier', ctrl.saveProductModification)

router.get('/checkout', function(req, res, next){
  res.render('checkout');
});
module.exports = router;
