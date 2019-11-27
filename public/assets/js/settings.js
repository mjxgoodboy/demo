//头像上传
$('#file').on('change', function () {
  let formData = new FormData();
  formData.append('avatar', this.files[0]);

  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    // 告诉$.ajax方法不要解析参数
    processData: false,
    //告诉$.ajax方法不要设置请求参数的类型
    contentType: false,
    success: function (response) {
      $('#site_logo').val(response[0].avatar);
      $('#preview').attr('src', response[0].avatar);
    }
  })
})

// 整个表单提交
$('#settingForm').on('submit', function () {
  let formData = $(this).serialize();
  $.ajax({
    type: 'post',
    url: '/settings',
    data: formData,
    success: function () {
      // location.reload();
    }
  })
  return false;
})

//向服务器发送请求获取网站配置,如果为真就显示到页面中
$.ajax({
  type: 'get',
  url: '/settings',
  success: function (response) {
    console.log(response)
    if (response) {
      //标题
      $('#site_name').val(response.title);
      //描述
      $('#site_description').val(response.description);
      //关键字
      $('#site_keywords').val(response.keywords);
      //两个按钮
      $('#comment_status').prop('checked', response.comment);
      $('#comment_reviewed').prop('checked', response.review);
      //图片和隐藏域
      $('#preview').attr('src', response.logo);
      $('#site_logo').val(response.logo);
    }

  }
})