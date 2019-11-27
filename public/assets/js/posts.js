//获取文章列表
$.ajax({
  type: 'get',
  url: '/posts',
  success: function (response) {
    console.log(response);
    let html = template('postsTep', {
      data: response
    });
    $('#postsBox').html(html);

    //展示分页
    let html2 = template('pageTep', response);
    $('#pageBox').html(html2);
  }
})


//处理日期时间格式
function formateDate(date) {
  //将日期时间字符串转换成日期对象
  var date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

}


//页面点击跳转函数(page为页码)
function changePage(page) {
  //获取文章列表
  $.ajax({
    type: 'get',
    url: '/posts',
    data: {
      page: page
    },
    success: function (response) {
      let html = template('postsTep', {
        data: response
      });
      $('#postsBox').html(html);

      //展示分页
      let html2 = template('pageTep', response);
      $('#pageBox').html(html2);
    }
  })
}

//文章分类属性显示到下拉框中
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    let html = template('categoryTep', {
      data: response
    });
    $('#categroy').html(html);
  }
})

//筛选表单提交事件
$('#filterForm').on('submit', function () {
  let id = $('#categroy option:selected').val();
  console.log(id)
  let formDate = $(this).serialize();
  console.log(formDate)
  //获取文章列表
  $.ajax({
    type: 'get',
    url: '/posts',
    data: formDate,
    success: function (response) {
      console.log(response)
      let html = template('postsTep', {
        data: response
      });
      $('#postsBox').html(html);

      //展示分页
      let html2 = template('pageTep', response);
      $('#pageBox').html(html2);
    }
  })
  return false;
})

//文章删除功能
$('#postsBox').on('click', '.delete', function () {
  let id = $(this).attr('data-id');
  let confirmValue = confirm('您确定删除吗?');
  if (confirmValue) {
    $.ajax({
      type: 'delete',
      url: '/posts/' + id,
      success: function () {
        location.reload();
      }
    })
  }
})





//质数就是只能被1和它本身整除的数!!!!(记住1,2不是质数!!!!!)
//所以我们从3开始统计
// for (var i = 3; i <= 100; i++) {
//   //每次外层循环进来让sum设为0
//   var sum = 0;
//   for (var j = 1; j <= i; j++) {
//     //进入里层循环,j是<=i,举例 i=3,j=1,2,3/i=4,j=1,2,3,4(i是我们判断的数,j是用来取余的,我们用i和[1,i]之间的所有数进行取余)
//     //因为质数只能被1和它本身整除,所以反过来取余=0
//       if (i % j == 0) {
//           sum++
//       }
//   }
//   //(所以如果是质数,上面的sum++只会执行2次),   你可以拿4举例,i=4,j=1,2,3,4,sum=3
//   if (sum == 2) {
//       console.log(i)
//   }
// }