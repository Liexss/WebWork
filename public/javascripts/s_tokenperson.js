$(document).ready(function() {
  const t = localStorage.getItem("user-t");
  $.ajax({
    data: { token: t },
    url: "http://localhost:3001/token",
    type: "POST",
    success: function(data) {
      //console.log(data);
      if (data.token == true) {
        $("#textname").html(data.user.user_name);
        $("#user_id").html(data.user.user_id);
        $("#user_name").html(data.user.user_name);
        $("#college_name").html(data.user.college_name);
      } else {
        window.location = "/signin";
      }
    },
    error: function() {
      //console.log(error);
    }
  });
  $("#back").click(function() {
    event.preventDefault();
    localStorage.removeItem("user-t");
    window.location = "/signin";
  });
});
