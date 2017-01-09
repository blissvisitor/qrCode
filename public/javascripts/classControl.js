$(document).ready(function(){
  var first_id=undefined,
      second_id=undefined,
      third_id=undefined;
  //初始化一级分类
  $.get("../class/first",function(ret){
    if(ret){
      $("#navigation").html('');
      $('#navigation').append('<li class="nav-item"><a href="#" class="nav-link active" data-toggle="tab">首页</a></li>');
      for(var i=0;i<ret.length;i++){
        var str='<li class="nav-item">';
        str+='<a class="nav-link" data-toggle="tab" href="#" id='+ret[i].id+'>'+ret[i].name+'</a></li>';
        $('#navigation').append(str);
      }
      if($('#navigation .active').length>0){
        var firstClass=$('#firstClass .active').attr("id");
        showQrList({'firstclass':firstClass,'num':1,'count':3});
      }
      //一级分类点击事件
      $('#navigation a').click(function(){
        var id=this.id;
        if(id){
            first_id=id;
            second_id=undefined;
            $("#secondVal").text('二级分类');
            third_id=undefined;
            $("#thirdVal").text('三级分类');
          //初始化二级分类
        $.get("../class/second?id="+id+"",function(ret){
          if(ret){
            $("#secondClass").html('');
            for(var i=0;i<ret.length;i++){
              var str='	<a class="dropdown-item second-item" id='+ret[i].id+' href="#">'+ret[i].name+'</a>';
              $('#secondClass').append(str);
            }
            //二级分类点击事件
            $('#secondClass a').click(function(){
              var id=this.id;
              third_id=undefined;
              $("#thirdVal").text('三级分类');
              if(id){
                second_id=id;
                $("#secondVal").text($(this).text());
                //初始化三级分类
              $.get("../class/third?first_id="+first_id+"&second_id="+second_id,function(ret){
                if(ret){
                  $("#thirdClass").html('');
                  for(var i=0;i<ret.length;i++){
                    var str='	<a class="dropdown-item second-item" id='+ret[i].id+' href="#">'+ret[i].name+'</a>';
                    $('#thirdClass').append(str);
                  }
                  //三级分类点击事件
                  $('#thirdClass a').click(function(){
                    $("#thirdVal").text($(this).text());
                    third_id=this.id;
                  });
                }else{
                  console.log(ret.msg);
                }
              });
            }
            });
          }else{
            console.log(ret.msg);
          }
        });
      }
      });
    }else{
      console.log(ret.msg);
    }
  });
  //查询
  $("#search").click(function(){
    var data={
      "firstclass":first_id,
      "secondclass":second_id,
      "thirdclass":third_id,
      "num":1,
      "count":10000
    }
    showQrList(data);
  });


})
