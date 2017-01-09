$(document).ready(function(){
  // if($('#firstClass .a').length>0){
  //   var first_id=$('#firstClass .active').attr("id");
  //
  // }
})
//展示列表
function showQrList(data){
  $.ajax({
    url:"../../qr/getQr",
    type:"post",
    dataType:"json",
    data:data,
    success:function(ret) {
      if(ret.error){
        console.log(ret.error+ret.msg)
      }else{
      $("#qrList").html('');
      $("#listCount").text(ret[0]['count(id)']);
      for(var i=1;i<ret.length;i++){
        var id=ret[i].id;
        var title=ret[i].title;
        var content=ret[i].content;
        var region=ret[i].region;
        var img=ret[i].qrimg;
        var arr=['<li class="list-group-item"><div class="media"><div class="media-left media-middle"><a href="#">'];
        // arr.push(img);
        arr.push('<img class="media-object" src="../images/runningcat.jpg" style="height:64px;width:64px;" alt="Generic placeholder image">');
        arr.push('</a></div><div class="media-body">');
                // <img class="media-object" src="../images/runningcat.jpg" style="height:64px;width:64px;" alt="Generic placeholder image">
        arr.push('<h5 class="media-heading">'+title+'</h5>');
        arr.push('<p>'+content+'</p>');
        arr.push('<p>'+region+'</p>')
        arr.push('</div><div class="media-right media-middle">');
        // arr.push('<a href="#" class="btn " onclick=showQrDetail({"id":'+id+'}) >查看详情</a></div><div></li>');
        arr.push('<a href="../../qr/getQrById/'+id+'" class="btn" >查看详情</a></div><div></li>');
              // <a href=" # " class="btn ">查看详情</a>
        var htm=arr.join("");
        $("#qrList").append(htm);
      }
      }
    },
    error:function(err){
      console.log(err)
    }
  });
}
//展示详情
function showQrDetail(data){
  $.ajax({
    url:"../../qr/getQrById",
    type:"post",
    dataType:"json",
    data:data,
    success:function(ret) {
      if(ret.error){
        console.log(ret.error+ret.msg)
      }else{

      }
    },
    error:function(err) {
      console.log(err);
    }
  });
}
