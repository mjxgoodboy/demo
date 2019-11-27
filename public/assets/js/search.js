let key = getQuery('key');

$.ajax({
  type: 'get',
  url: 'posts/search/' + key,
  success: function (response) {
    console.log(response)
    let html = template('searchTep', {
      data: response
    });
    $('#listBox').html(html);
  }
})