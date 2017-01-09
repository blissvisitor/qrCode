// dao/classDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('util');
// 使用连接池，提升性能
var pool  = mysql.createPool($util._extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	getFirstClass: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
      var sql='select * from firstclass order by name';
			connection.query(sql, function(err, result) {
        if(err){
          result={
            error:err,
            msg:'获取一级分类失败'
          }
        }
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接
				connection.release();
			});
		});
	},
  getSecondClass: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = req.query.id;
      var sql='select * from secondclass where first_id ='+id+' order by name' ;
			connection.query(sql, function(err, result) {
        if(err){
          result={
            error:err,
            msg:'获取二级分类失败'
          }
        }
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
  getThirdClass: function (req, res, next) {
    // delete by Id
    pool.getConnection(function(err, connection) {
      var first_id = req.query.first_id;
      var second_id=req.query.second_id;
      var sql='select * from thirdclass where first_id ='+first_id+' and second_id='+second_id+' order by name';
      connection.query(sql, function(err, result) {
        if(err){
          result={
            error:err,
            msg:'获取三级分类失败'
          }
        }
        jsonWrite(res, result);
        connection.release();
      });
    });
  }



};
