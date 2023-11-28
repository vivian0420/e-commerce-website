$(function () {
  $("#footer").html("Today is: " + new Date().toLocaleDateString());

  //active page management
  if ($("#active-control").hasClass("homeActive")) {
    console.log("test");
    $(".active").removeClass("active");
    $(".home").addClass("active");
  } else if ($("#active-control").hasClass("birthdayActive")) {
    $(".active").removeClass("active");
    $(".birthday").addClass("active");
  } else if ($("#active-control").hasClass("christmasActive")) {
    $(".active").removeClass("active");
    $(".christmas").addClass("active");
  } else if ($("#active-control").hasClass("halloweenActive")) {
    $(".active").removeClass("active");
    $(".halloween").addClass("active");
  } else if ($("#active-control").hasClass("salesActive")) {
    $(".active").removeClass("active");
    $(".sales").addClass("active");
  }

  //increase and decrease button functionality
  $(".bi-dash-circle").on("click", dec_quantity);
  $(".bi-plus-circle").on("click", inc_quantity);
  $(".addToCart").on("click", add_cart);
});

function dec_quantity() {
  $(".quantity-input").val(function (i, oldval) {
    if (--oldval < 0) {
      return 0;
    }
    return oldval;
  });
}

function inc_quantity() {
  $(".quantity-input").val(function (i, oldval) {
    const maxLimit = $(".quantity-input").attr("max");
    if (++oldval > maxLimit) {
      $(".alert").show(3000);
      setTimeout(function () {
        $(".alert").hide();
      }, 3000);
      oldval = maxLimit;
    }
    return oldval;
  });
}
function add_cart() {
  const maxLimit = parseInt($(".quantity-input").attr("max"));
  
  if (parseInt($(".quantity-input").val()) > maxLimit) {
    $(".alert").show(3000);
    setTimeout(function () {
      $(".alert").hide();
    }, 3000);
    $(".quantity-input").val(0);
  } else {
    $(".nav-cart-count").text (function() {
        const currentCount = parseInt($(".nav-cart-count").text());
        const inputValue = parseInt($(".quantity-input").val());
        const cartValue = currentCount + inputValue;
        $(".quantity-input").val(0);
        return cartValue;
    })
  }
}
