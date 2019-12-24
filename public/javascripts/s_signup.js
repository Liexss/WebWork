$(document).ready(function() {
  $("#subcode").click(function() {
    event.preventDefault();
    var data = {};

    var t = $("#sign_up").serializeArray();
    $.each(t, function() {
      data[this.name] = this.value;
    });
    data["college"] = $("#sel1 option:selected").val();
    //console.log(data);
    $.ajax({
      data: data,
      url: "http://47.106.124.118:3001/signup",
      type: "POST",
      success: function(data) {},
      error: function() {
        //console.log("error");
      }
    });
  });
});
