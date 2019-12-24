$(document).ready(function() {
  const t = localStorage.getItem("user-t");
  $.ajax({
    data: {token:t},
    url: "http://localhost:3001/token",
    type: "POST",
    success: function(data) {
      console.log(data);
      if(data.token==true){
        $("#textname").html(data.user_id);
      }
      else {
        window.location='/signin';
      }
    },
    error: function() {
      console.log(error);
    }
  });
  $('#back').click(function() {
    event.preventDefault();
    localStorage.removeItem("user-t");
    window.location='/signin';
  });
});
