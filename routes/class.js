var express=require('express');
var router=express.Router();
//classDao
//获取一级分类
var classDao=require('../dao/classDao');
//一级
router.get('/first',function(req,res,next){
  classDao.getFirstClass(req,res,next);
})
//二级
router.get('/second',function(req,res,next){
  classDao.getSecondClass(req,res,next);
})
//三级
router.get('/third',function(req,res,next){
  classDao.getThirdClass(req,res,next);
});
module.exports=router;
