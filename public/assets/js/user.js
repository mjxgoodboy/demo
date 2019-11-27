$('#deleteMany').attr('disabled', 'disabled');


$('#userForm').on('submit', function () {
	// 获取用户在表单中输入的内容并将格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器发送添加用户请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		},
		error: function () {
			alert('用户添加失败');
		}
	})
	// 阻止表单的默认行为
	return false;
})

// 当用户选择文件的时候
$('#avatar').on('change', function () {



})


$('#modifybox').on('change', '#avatar', function () {
	//用户选择文件
	// this.formData[0];
	var formData = new FormData;
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
			// console.log(response);
			//实现头像图片预览功能
			$('#preview').attr('src', response[0].avatar);
			$('#yincang').val(response[0].avatar);
		}
	})
});
//向服务器发送请求 索要用户列表
$.ajax({
	type: 'get',
	url: '/users',
	success: function (response) {
		// console.log(response);
		// 使用模板引擎将数据和HTML字符串进行拼接
		var html = template('usertpl', {
			data: response
		});
		//将拼接好的字符串显示在页面中
		$('#userbox').html(html);

	}
})

//通过事件委托的方式为编辑按钮添加点击事件
$('#userbox').on('click', '.edit', function () {
	//获取被点击用户的id值
	var id = $(this).attr('data-id');

	// 根据id获取用户信息
	$.ajax({
		type: 'get',
		url: '/users/' + id,
		success: function (response) {
			console.log(response);

			var html = template('modifytpl', response);
			$('#modifybox').html(html);
		}
	})
})

//未修改表单添加表单提交事件
$('#modifybox').on('submit', '#modifyForm', function () {

	var formData = $(this).serialize();
	console.log(formData);

	var id = $(this).attr('data-id');
	$.ajax({
		type: 'put',
		url: '/users/' + id,
		data: formData,
		success: function (response) {
			location.reload();
		}
	})
	// 阻止表单默认提交
	return false;
})



//删除单个用户

$('#userbox').on('click', '.delete', function () {
	let id = $(this).attr('data-id');
	let confirmValue = confirm('您确认删除吗');
	let _this = $(this);
	if (confirmValue) {
		$.ajax({
			type: 'delete',
			url: '/users/' + id,
			success: function () {
				// location.reload();
				_this.parent().parent().remove();
			}
		})
	}

})

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
	$('#userbox').find('input').prop('checked', status);

})

//用户勾选状态改变全选按钮状态

$('#userbox').on('change', '#userStatus', function () {
	var flag = true;
	//判断是否显示批量删除按钮的数字标志
	var deleteManyNum = 0;
	let statuss = document.getElementsByClassName('userStatus');
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
//上面几种情况都算是一个元素具有prop属性，如果一个元素不具有此属性，那么使用attr()获取属性值，那么返回值是undefined。!!!!
	if (typeof($('#deleteMany').attr('disabled'))=='undefined') {
		//放置勾选的用户ID数组,因为上传服务器需要id-id-id...我们用join('-')分割 
		var arr = [];
		//获取选中的用户(是一个数组)
		var checkedUser = $('#userbox').find('input').filter(':checked');
		//循环复选框,从复选框元素的身上获取data-id属性
		checkedUser.each(function (index, element) {
			var id = $(element).attr('data-id');
			arr.push(id);
		});
		let ids = arr.join('-');
		var confirmValue = confirm('您确定删除吗?');
		if (confirmValue) {
			$.ajax({
				type: 'delete',
				url: '/users/' + ids,
				success: function () {
					// location.reload();
					checkedUser.each(function (index, element) {
						$(element).parent().parent().remove();
					});
				}
			})
		}
	}

})