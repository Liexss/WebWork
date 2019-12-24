$(document).ready(function() {
    const t = localStorage.getItem("user-t");
    $("#changepas").click(function() {
        $.ajax({
            data: { token: t,fpwd:$("#fpwd").val(),pwd:$("#fpwd").val(),rpwd:$("#fpwd").val() },
            url: "http://localhost:3001/personalpas/check",
            type: "POST",
            success: function(data) {
              console.log(data);
              if (data.token == true) {
                window.location = "/home";
              } else {
              }
            },
            error: function() {
              console.log(error);
            }
        });
    });
  });
  