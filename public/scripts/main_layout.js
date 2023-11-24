$(function () {
  $("#footer").html("Today is: " + new Date().toLocaleDateString());
  if($("#active-control").hasClass("homeActive")) {
    console.log("test");
    $(".active").removeClass("active");
    $(".home").addClass("active");
  } else if ($("#active-control").hasClass("birthdayActive")){
    $(".active").removeClass("active");
    $(".birthday").addClass("active");
  } else if ($("#active-control").hasClass("christmasActive")){
    $(".active").removeClass("active");
    $(".christmas").addClass("active");
  } else if ($("#active-control").hasClass("halloweenActive")){
    $(".active").removeClass("active");
    $(".halloween").addClass("active");
  } else if ($("#active-control").hasClass("salesActive")){
    $(".active").removeClass("active");
    $(".sales").addClass("active");
  }
});
