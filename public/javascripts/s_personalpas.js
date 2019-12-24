$(document).ready(function() {
    const t = localStorage.getItem("user-t");
    $("#changepas").click(function() {
        event.preventDefault();
        $.ajax({
            data: { token: t,fpwd:$("#fpwd").val(),pwd:$("#pwd").val(),rpwd:$("#rpwd").val() },
            url: "http://localhost:3001/personalpas/check",
            type: "POST",
            success: function(data) {
              //console.log(data);
              if (data.token == true) {
                if(data.change==true){
                  window.alert(data.msg);
                  location.reload();
                }
                else {
                  window.alert(data.msg);
                }
              } else {
                window.location = "/signin";
              }
            },
            error: function() {
              //console.log(error);
            }
        });
    });
  });
  