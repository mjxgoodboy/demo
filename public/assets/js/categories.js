$('#deleteMany').attr('disabled', 'disabled');

//查询显示分类数据
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    let html = template('categoryTep', {
      categories: response
    });
    $('#categoryBox').html(html);
  }
})


//添加分类
$('#addCategory').on('submit', function () {
  let formData = $(this).serialize();

  $.ajax({
    type: 'post',
    url: '/categories',
    data: formData,
    success: function () {
      location.reload();
    }
  })
  return false;
})



//修改按钮将原数据显示在左侧
$('#categoryBox').on('click', '.edit', function () {
  let id = $(this).attr('data-id');
  $.ajax({
    type: 'get',
    url: '/categories/' + id,
    success: function (response) {
      let html = template('editTep', response);
      $('#modify').html(html);
    }
  })
})

//修改表单提交事件
$('#modify').on('submit', '#CategoryModify', function () {
  let formData = $(this).serialize();
  // console.log(formData)
  let id = $(this).attr('data-id');
  // console.log(id)
  $.ajax({
    type: 'put',
    url: '/categories/' + id,
    data: formData,
    success: function () {
      location.reload();
    }
  });
  //阻止表单默认提交行为
  return false;
})

//删除单个
$('#categoryBox').on('click', '.delete', function () {
  let id = $(this).attr('data-id');
  let confirmValue = confirm('确认删除吗?');
  if (confirmValue) {
    $.ajax({
      type: 'delete',
      url: '/categories/' + id,
      success: function () {
        location.reload();
      }
    })
  }

});

//获取全选按钮

let selectAll = $('#selectAll');

//全选全不选
selectAll.on('change', function () {
  //获取全选按钮的状态
  let status = $(this).prop('checked');
  if (status) {
    //显示批量删除按钮
    // $('#deleteMany').show();
    $('#deleteMany').attr('disabled', false);
  } else {
    //隐藏批量删除按钮
    // $('#deleteMany').hide();
    $('#deleteMany').attr('disabled', 'disabled');
  }
  //实现全选全不选
  $('#categoryBox').find('input').prop('checked', status);

})
//用户勾选状态改变全选按钮状态
$('#categoryBox').on('change', '.categoryStatus', function () {
  var flag = true;
  //判断是否显示批量删除按钮的数字标志
  var deleteManyNum = 0;
  let statuss = document.getElementsByClassName('categoryStatus');
  $.each(statuss, function () {
    //$(this)指当前遍历的元素
    if (!$(this).prop('checked')) {
      flag = false;
    } else {
      //有一个勾选就显示批量删除
      // $('#deleteMany').show();
      $('#deleteMany').attr('disabled', false);
      deleteManyNum++;
    }
    //如果数字为0说明没有勾选,隐藏批量删除按钮
    if (deleteManyNum == 0) {
      // $('#deleteMany').hide();
      $('#deleteMany').attr('disabled', 'disabled');
    }
  });
  selectAll.prop('checked', flag);
})

//批量删除
$('#deleteMany').on('click', function () {

  if (typeof ($('#deleteMany').attr('disabled')) == 'undefined') {

    //放置勾选的用户ID数组,因为上传服务器需要id-id-id...我们用join('-')分割 
    var arr = [];
    //获取选中的分类(是一个数组)
    var checkedCategory = $('#categoryBox').find('input').filter(':checked');
    //循环复选框,从复选框元素的身上获取data-id属性
    checkedCategory.each(function (index, element) {
      var id = $(element).attr('data-id');
      arr.push(id);
    });
    let ids = arr.join('-');
    var confirmValue = confirm('您确定删除吗?');
    if (confirmValue) {
      $.ajax({
        type: 'delete',
        url: '/categories/' + ids,
        success: function () {
          checkedCategory.each(function (index, element) {
            $(element).parent().parent().remove();
          });
        }
      })
    }
  }

})