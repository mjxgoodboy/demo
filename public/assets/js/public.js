//随机推荐数据
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (response) {
    // console.log(response);

    let randomTep = `
    {{each data}}
    <li>
    <a href="javascript:;">
      <p class="title">{{$value.title}}</p>
      <p class="reading">阅读({{$value.meta.views}})</p>
      <div class="pic">
        <img src={{$value.thumbnail}} alt="">
      </div>
    </a>
  </li>
  {{/each}}
  `
    let html = template.render(randomTep, {
      data: response
    });
    $('#randomBox').html(html);
  }
})

//索要热门推荐数据
//因为是公共部分,所以将模板写在js中用变量保存 
$.ajax({
  type: 'get',
  url: '/posts/recommend',
  success: function (response) {
    // console.log(response)
    let tuijianTep = `
    {{each data}}
    <li>
    <a href="/detail.html?id={{$value._id}}">
      <img src={{$value.thumbnail}} alt="">
      <span>{{$value.title}}</span>
    </a>
  </li>
  {{/each}}
  `;
    let html = template.render(tuijianTep, {
      data: response
    });
    $('#tuijianBox').html(html);
  }
})

// //随机推荐数据
// $.ajax({
//   type:'get',
//   url:'/posts/random',
//   success:function(response){
//     console.log(response);

//     let randomTep = `
//     {{each data}}
//     <li>
//     <a href="javascript:;">
//       <p class="title">{{$value.title}}</p>
//       <p class="reading">阅读({{$value.meta.views}})</p>
//       <div class="pic">
//         <img src={{$value.thumbnail}} alt="">
//       </div>
//     </a>
//   </li>
//   {{/each}}
//   `
//   let html=template.render(randomTep,{
//     data:response
//   });
//   $('#randomBox').html(html);
//   }
// })


//最新评论
$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function (response) {
    // console.log(response);

    let commentTep =`
    {{each data}}
    <li>
    <a href="javascript:;">
      <div class="avatar">
        <img src={{$value.author.avatar}} alt="">
      </div>
      <div class="txt">
        <p>
      <span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
  </li>
  {{/each}}`
    let html = template.render(commentTep, {
      data: response
    });
    $('#commentBox').html(html);
  }


});

//分类列表

$.ajax({
  type:'get',
  url:'/categories',
  success:function(response){
    // console.log(response)
    let categoryTep=` 
    {{each data}}
    <li><a href='list.html?categoryId={{$value._id}}&title={{$value.title}}'><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    let html = template.render(categoryTep,{
      data:response
    });
    $('#categoryBox1,#categoryBox2').html(html);
  }
})

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

//获取地址栏参数,可以获取中英文的
function getQuery(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
} 

//获取搜索表单
$('.search form').on('submit',function(){
  let keys=$(this).find('.keys').val();
  location.href='/search.html?key='+keys;
  return false;
})