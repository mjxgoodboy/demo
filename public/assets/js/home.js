//获取轮播图数据
$.ajax({
  type: 'get',
  url: '/slides',
  success: function (response) {
    // console.log(response);
    let html = template('imgTep', {
      data: response
    });
    // console.log(html);

    $('#imgBox').html(html);


    //先渲染完模板里的Li,然后在调用插件实现轮播图
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;

        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);

      if (_this.is('.prev')) {
        swiper.prev();
      } else if (_this.is('.next')) {
        swiper.next();
      }
    })
  }
})


//最新发布文章数据

$.ajax({
  type:'get',
  url:'/posts/lasted',
  success:function(response){
 
    let html = template('newTep',{
      data:response
    });
 
    $('#new').html(html);
  }
})

