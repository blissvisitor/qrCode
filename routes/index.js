var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('layout', { title: '首页' });
  //res.redirect('/html/index.html');

});

module.exports = router;
