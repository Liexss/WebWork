$(document).ready(function () {
  $("#homenav")
    .siblings("li")
    .removeClass("active");
  $("#homenav").addClass("active");
  $('#Partylist').addClass("active");
  $('#Medialist').removeClass('active');
  $(".Media").hide();
  $(".Party").show();
  $("#Partychange").click(function () {
    event.preventDefault();
    $('#Partylist').addClass("active");
    $('#Medialist').removeClass('active');
    $(".Media").hide();
    $(".Party").show();
  });
  $("#Mediachange").click(function () {
    event.preventDefault();
    $('#Medialist').addClass("active");
    $('#Partylist').removeClass('active');
    $(".Party").hide();
    $(".Media").show();
  });
});
