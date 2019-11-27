//从地址栏获取文章id
let id = getQuery('id');

$.ajax({
  type:'get',
  url:'/posts/'+id,
  success:function(response){
      // console.log(response);
      let html = template('detailTep',response);
      $('#detailBox').html(html);
  }
})

//文章点赞
$('#detailBox').on('click','#link',function(){
  $.ajax({
    type:'post',
    url:'/posts/fabulous/'+id,
    success:function(){
      alert('谢谢您的支持');
    }
  })
})

//获取网站配置信息
$.ajax({
  type:'get',
  url:'/settings',
  success:function(response){
     console.log(response);
    //判断管理员是否开启了评论功能
    if(response.comment){
      console.log(0)
      //渲染评论模板
      let html=template('commentTpl',{});
      console.log(html)
      $('#commentBox').html(html);
    }

  }
})