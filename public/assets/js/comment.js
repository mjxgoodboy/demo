//获取评论列表数据
$.ajax({
  type: 'get',
  url: '/comments',
  success: function (response) {
    // console.log(response);
    let html = template('commentTep', response);
    $('#commentBox').html(html);

    let page = template('pageTep', response);
    $('#pageBox').html(page);
  }
})

// //添加评论
// $.ajax({
//   type: 'post',
//   url: '/comments',
//   data: {
//     author: '5dd795ea3b807a326c31bdec',
//     content: '000放电饭锅时光飞逝',
//     post: '5dda4a0f32c55847ece4c20c'
//   },
//   success: function () {

//   }
// })

//点击页码跳转
function toPage(page) {
  $.ajax({
    type: 'get',
    url: '/comments',
    data: {
      page: page
    },
    success: function (response) {
      console.log(response);
      let html = template('commentTep', response);
      $('#commentBox').html(html);

      let page = template('pageTep', response);
      $('#pageBox').html(page);
    }
  })
}


//修改评论审核状态
$('#commentBox').on('click', '.changeStatus', function () {
  let id = $(this).attr('data-id');
  let state = $(this).attr('data-state');
  let _this = $(this);
  $.ajax({
    type: 'put',
    url: '/comments/' + id,
    data: {
      //!!!!这个传过去的时我们希望改变的状态值,如果0传1过去,反之如同
      state: state == 0 ? 1 : 0
    },
    success: function (response) {
      // console.log(response);
      _this.html(response.state=='1'?'驳回':'批准');
      if(response.state=='1'){
        _this.addClass('btn-danger');
      }else{
        _this.removeClass('btn-danger');
      }
      _this.attr('data-state',response.state);
      _this.parent().siblings('.check').html(response.state=='0'?'未审核':'已审核');
    }
  })
  return false;

})

//删除评论
$('#commentBox').on('click', '.delete', function () {
  let id = $(this).attr('data-id');

  let confirmValue = confirm('您确定删除吗?');
  if (confirmValue) {
    $.ajax({
      type: 'delete',
      url: '/comments/' + id,
      success: function () {
        location.reload();
      }
    })
  }
})