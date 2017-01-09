var express=require('express');
var router=express.Router();
//qrDao
var qrDao=require('../dao/qrDao');
router.get('/getQrById/:id',function(req,res,next){
  qrDao.getQrById(req,res,next);
})
//根据条件获取数据 id proid cityid countyid num count
router.post('/getQr',function (req,res,next) {
  qrDao.getQrByWhere(req,res,next);
})
module.exports=router;
