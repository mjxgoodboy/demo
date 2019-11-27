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
  let html=template.render(tuijianTep,{
    data:response
  });
  $('#tuijianBox').html(html);
  }
})

//随机推荐数据
$.ajax({
  type:'get',
  url:'/posts/random',
  success:function(response){
    console.log(response);

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
  let html=template.render(randomTep,{
    data:response
  });
  $('#randomBox').html(html);
  }
})