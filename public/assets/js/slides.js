
//上传图片
$('#file').on('change',function(){
  let formData = new FormData();
  formData.append('avatar',this.files[0]);

  $.ajax({
    type:'post',
    url:'/upload',
    // 告诉$.ajax方法不要解析参数
		processData: false,
		//告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
    data:formData,
    success:function(response){
      //隐藏域保存图片地址
         $('#image').val(response[0].avatar)
    }
  })
})

//给表单添加提交事件
$('#slideForm').on('submit',function(){
  let formData = $(this).serialize();
  $.ajax({
    type:'post',
    url:'/slides',
    data:formData,
    success:function(){
      location.reload();
    }
  })
})


//获取轮播图列表
$.ajax({
  type:'get',
  url:'/slides',
  success:function(response){
    //  console.log(response);
    let html = template('imagesTep',{
      data:response
    })
    $('#imagesBox').html(html);
  }
})

//删除轮播图片
$('#imagesBox').on('click','.delete',function(){
    let id  = $(this).attr('data-id');
    let _this = $(this);
    $.ajax({
      type:'delete',
      url:'/slides/'+id,
      success:function(){
        //这里DOM元素中直接移除,因为进入请求成功函数,代表数据库中本条数据已经删除
          _this.parents('tr').remove();
      }
    })
})