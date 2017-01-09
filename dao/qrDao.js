// dao/qrDao.js
// mysql数据操作
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('util');
var $sql = require('./qrSqlMapping');
// 使用连接池，提升性能
var pool = mysql.createPool($util._extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '请求失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    //根据条件获取数据 id proid cityid countyid num count firstclass secondclass thirdclass title label
    getQrByWhere: function(req, res, next) {
        var params =req.body;
        if (params.num==undefined||params.count==undefined) {
          return  jsonWrite(res,{"msg":"缺少num、count参数"} );
        }

        var sql = '';
        var querysql = 'select * from wxq_souweixin ';
        var querycount = 'select count(id) from wxq_souweixin ';
        //id
        // if (params.id) {
        //     sql += ' id=' + params.id + ' and';
        // }
        //省份id
        if (params.proid) {
            sql += ' proid=' + params.proid + ' and';
        }
        //城市id
        if (params.cityid) {
            sql += ' cityid=' + params.cityid + ' and';
        }
        //区县id
        if (params.countyid) {
            sql += ' countyid=' + params.countyid + ' and';
        }
        //一级分类
        if (params.firstclass) {
            sql += ' firstclass=' + params.firstclass + ' and';
        }
        //二级分类
        if (params.secondclass) {
            sql += ' secondclass=' + params.secondclass + ' and';
        }
        //三级分类
        if (params.thirdclass) {
            sql += ' thirdclass=' + params.thirdclass + ' and';
        }
        //标题
        if (params.title) {
            sql += ' title like %' + params.title + '% and';
        }
        //标签
        if (params.label) {
            sql += ' label like %' + params.label + '% and';
        }
        if (sql) {
            sql = sql.substring(0, sql.length - 3);
            querycount += ' where ' + sql;
            querysql += ' where ' + sql + ' order by id' + ' limit ' + (params.num - 1) * params.count + ',' + params.count;
        } else {
            querysql += ' limit ' + (params.num - 1) * params.count + ',' + params.count;
        }
        var ret = [];
        pool.getConnection(function(err, connection) {
            connection.query(querycount, function(err, result) {
                if (err) {
                    result = {
                        error: err,
                        msg: '获取数据失败'
                    }
                    jsonWrite(res, ret);
                    // connection.release();
                } else {
                    connection.release();
                    if (result[0]['count(id)'] > 0) {
                        ret = result;
                        pool.getConnection(function(err, connection) {
                            connection.query(querysql, function(err, result) {
                              console.log(querysql);
                              if(err){
                                result = {
                                    error: err,
                                    msg: '获取数据失败'
                                }
                                jsonWrite(res, result);
                              }else{
                                for (var i = 0; i < result.length; i++) {
                                    ret.push(result[i]);
                                }
                                jsonWrite(res, ret);
                                // connection.release();
                              }
                            });
                        });
                    }
                }
                  connection.release();
            });
        });
        // pool.getConnection(function(err, connection) {
        //
        //   connection.query(sqlcount,function(err,result){
        //     if(result){
        //       ret.push(result);
        //       connection.query(sql,function(err, result) {
        //         ret.push(result);
        //         jsonWrite(res,ret);
        //         connection.release();
        //       });
        //     }
        //   })
        // });
    },
    getQrById:function(req,res,next){
      var id = req.param('id');
      if(id){
        var sql='select * from wxq_souweixin where id='+id;
      pool.getConnection(function(err, connection) {
          connection.query(sql, function(err, result) {
              if (err) {
                  result = {
                      error: err,
                      msg: '获取数据失败'
                  }
                  jsonWrite(res, ret);
                  connection.release();
              } else {
                  // jsonWrite(res, result);
                  res.render('suc', {
        						result: result
        					}); // 第二个参数可以直接在jade中使用
              }
          });
      });
    }else{
      result = {
        code: 404,
        msg:'缺少参数'
      };
      jsonWrite(res,result);
    }

    }

}
