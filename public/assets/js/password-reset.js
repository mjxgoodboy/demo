$('#passwordReset').on('submit', function () {

  let formData = $(this).serialize();
  $.ajax({
    type: 'put',
    url: '/users/password',
    data: formData,
    success: function () {
      // console.log(111)
      location.href = '/admin/login.html';
    }
  })
  return false;
})