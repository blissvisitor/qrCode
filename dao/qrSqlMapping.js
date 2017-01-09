// dao/userSqlMapping.js
// CRUD SQL语句
var qr = {
	insert:'INSERT INTO user(name, age) VALUES(?,?)',
	update:'update user set name=?, age=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user',
  queryByWhere:'select * from wxq_souweixin where id=? and proid=? and cityid=? and countyid=? limit (num-1)*count,count'
};

module.exports = qr;
