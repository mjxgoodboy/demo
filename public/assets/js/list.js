//获取地址栏中的title参数,设置分类右侧对应的分类名称
let title = getQuery('title');
$('#title').html(title);

//获取地址栏中的categoryId参数,为了显示对应分类下的文章内容 

let id = getQuery('categoryId');

$.ajax({
  type: 'get',
  url: '/posts/category/' + id,
  success: function (response) {
    console.log(response);
    let html = template('listTep', {
      data: response
    });
    $('#listBox').html(html);
  }
})