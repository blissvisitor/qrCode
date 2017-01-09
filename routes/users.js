var express = require('express');
var router = express.Router();
//用户数据库操作
var userDao=require('../dao/userDao');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 增加用户
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});
//getAll
router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});
//query
router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});
//删除
router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});
//更新界面
router.get('/updateUser', function(req, res, next) {
	res.render('updateUser');
});
//更新
router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});
module.exports = router;
