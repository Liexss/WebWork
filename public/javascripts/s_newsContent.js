$(document).ready(function() {
    $("#submitcomment").click(function() {
        event.preventDefault();
        const t = localStorage.getItem("user-t");
        $.ajax({
          data: { token: t ,content:$("#ttcontent").val(),news_id:$('#content').attr('name')},
          url: "http://localhost:3001/newsContent/comment",
          type: "POST",
          success: function(data) {
            console.log(data);
            if (data.token == true) {
              if(data.insert==true){
                window.alert("发表成功");
                location.reload();
              }
              else{
                  window.alert("发表失败");
              }
            } else {
              window.location = "/signin";
            }
          },
          error: function() {
            console.log(error);
          }
        });
      });
});
  