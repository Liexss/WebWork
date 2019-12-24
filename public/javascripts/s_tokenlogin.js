$(document).ready(function() {
  const t = localStorage.getItem("user-t");
  $.ajax({
    data: { token: t },
    url: "http://localhost:3001/token",
    type: "POST",
    success: function(data) {
      //console.log(data);
      if (data.token == true) {
        window.location = "/home";
      } else {
      }
    },
    error: function() {
      //console.log(error);
    }
  });
});
