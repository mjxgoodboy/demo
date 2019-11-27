//文章分类属性
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    let html = template('categoryListTep', {
      data: response
    });
    $('#category').html(html);
  }
})


//文章封面上传
$('#editBox').on('change', '#feature', function () {
  let file = this.files[0];
  let formData = new FormData();
  formData.append('cover', file);

  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#thumbnail').val(response[0].cover);
      $('#preview').attr('src', response[0].cover);
    }
  })
});

//添加文章
$('#addArticle').on('submit', function () {

  let formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type: 'post',
    url: '/posts',
    data: formData,
    success: function () {
      //文章添加 成功跳转到文章 列表
      location.href = '/admin/posts.html';
    }
  });

  return false;
});


//修改文章第一步判断地址栏参数是否有id的函数
function getParams(select) {
  let params = location.search.substr(1).split('&');
  // console.log(params);
  //["id=5dda4a0f32c55847ece4c20c"]
  for (let i = 0; i < params.length; i++) {
    let value = params[i].split('=');
    // console.log(value)
    // ["id", "5dda4a0f32c55847ece4c20c"]
    if (value[0] == select) {
      return value[1];
    }
  }
  return null;
}
//获取地址栏传过来的id
let id = getParams('id');
if (id !== null) {
  //根据id获取文章信息
  $.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (response) {

      //查询文章分类属性,需要添加至下拉框中
      $.ajax({
        type: 'get',
        url: '/categories',
        success: function (categories) {
          //将获取的文章分类属性值添加到外层的返回值response对象身上
          response.categories = categories;
        
          //渲染编辑文章界面
          let html = template('modifyTep', response);
          $('#editBox').html(html);
        }
      })


    }
  })
}

//修改文章的表单提交事件

$('#editBox').on('submit', '#modifyForm', function () {
  let formData = $(this).serialize();
  let id = $(this).attr('data-id');
  $.ajax({
    type: 'put',
    url: '/posts/' + id,
    data: formData,
    success: function () {
      location.href = '/admin/posts.html'
    }
  })
  return false;
})