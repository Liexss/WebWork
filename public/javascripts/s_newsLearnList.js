$(document).ready(function () {
  $("#Learnnav").siblings('li').removeClass('active');
  $("#Learnnav").addClass('active');
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
      location.href = "/newsLearnList?pagenum=" + nowpage;
    } else if (id == 0) {
      nowpage--;
      location.href = "/newsLearnList?pagenum=" + nowpage;
    } else {
      location.href = "/newsLearnList?pagenum=" + id;
    }
  });
});
