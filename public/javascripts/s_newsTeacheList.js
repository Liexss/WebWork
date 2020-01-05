$(document).ready(function () {
  $("#Teachenav").siblings('li').removeClass('active');
  $("#Teachenav").addClass('active');
  var t=0;
  $(".littlecard").each(function(index,item) {
    if(t%3==0){
      $(this).attr("fill","#007bff");
    }
    else if(t%3==1){
      $(this).attr("fill","#e83e8c");
    }
    else if(t%3==2){
      $(this).attr("fill","#6f42c1");
    }
    t++;
    console.log(t);
  });
  $(".page-item").click(function () {
    var id = parseInt($(this).attr("id"));
    var totnum = parseInt($("#pagenum").attr("name"));
    var nowpage = parseInt($("#page").attr("name"));
    var str = $(this).attr("class");
    if (str.indexOf("disabled") != -1) {
      return;
    }
    if (id == totnum + 1) {
      nowpage++;
      location.href = "/newsTeacheList?pagenum=" + nowpage;
    } else if (id == 0) {
      nowpage--;
      location.href = "/newsTeacheList?pagenum=" + nowpage;
    } else {
      location.href = "/newsTeacheList?pagenum=" + id;
    }
  });
});
