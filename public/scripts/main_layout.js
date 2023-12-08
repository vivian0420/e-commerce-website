$(function () {
  $("head title").text($(".get-app-name").val());
  $(".website-name").text($(".get-app-name").val());
  $("#footer").html("Today is: " + new Date().toLocaleDateString());
  $(".nav-cart-count").text($(".get-cartitem-amount").val());
  
  //active page management
  if ($("#active-control").hasClass("homeActive")) {
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

  // Tracking the current page for redirection after user login
  let currentPage = $(".get-route").val();
  if (currentPage != "") {
    $(".current-page").val(currentPage);
  }

  //Implementing user account functionality based on user status:
  //If a user is logged in, clicking the account button will navigate to the user's account page
  //Otherwise, it will display a login popup.
  let status = $(".get-status").attr("id");
  if (status === "login") {
    $(".nav-login").css("display", "none");
    $(".nav-account").css("display", "block");
  }

  //increase and decrease button functionality
  $(".bi-dash-circle").on("click", dec_quantity);
  $(".bi-plus-circle").on("click", inc_quantity);

  $(".addToCart").on("click", add_cart);
  $(".login").on("click", login);
  $(".register").on("click", register);
  $(".close_button").on("click", close);
  $(".main").on("mouseup", click_blank);
  $("#confirm_password").on("keyup", validate_password);
  $(".logout").on("click", alert_logout);
  $(".cancel-logout").on("click", cancel_logout);
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
  } else if (parseInt($(".quantity-input").val()) === 0) {
        $(".alert").text("Please enter a number!")
        $(".alert").show(3000);
        setTimeout(function () {
          $(".alert").hide();
        }, 3000);
  } else {
    const id = $(".get-item-id").val();
    const quantity = $(".quantity-input").val();
    let xhr = new XMLHttpRequest();  //create a new XMLHttpRequest object
    xhr.open('POST', '/add_cart');   
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const data = "_id=" + encodeURIComponent(id) + "&quantity=" + encodeURIComponent(quantity);
    xhr.send(data);

    xhr.addEventListener("load", function(){
        if ($(".get-status").attr("id") == "login" && xhr.status == 200) {
            $(".alert").text("Item(s) added to cart successfully!");
            $(".alert").show(3000);
            setTimeout(function () {
                $(".alert").hide();
            }, 3000);
            let res = JSON.parse(xhr.response);  
            const sizeofcart = res.sizeOfCart;
            $(".nav-cart-count").text(sizeofcart);
            $(".quantity-input").val(0);
        } else {
            $(".alert").text("Please log in before proceeding!");
            $(".alert").show(3000);
            setTimeout(function () {
                $(".alert").hide();
            }, 3000);
        }
    })
  }
}

function login() {
  $(".register-box").css("display", "none");
  $(".login-box").css("display", "block");
  $(".main").addClass("blur");
}

function register() {
  $(".login-box").css("display", "none");
  $(".register-box").css("display", "block");
}

function close() {
  $(".login-box").css("display", "none");
  $(".register-box").css("display", "none");
  $(".main").removeClass("blur");
}

function click_blank() {
  $(".login-box").css("display", "none");
  $(".register-box").css("display", "none");
  $(".main").removeClass("blur");
}

function validate_password() {
  let pass = $(".register_password").val();

  let re_pass = $("#confirm_password").val();
  console.log("re_pass:" + re_pass);
  if (pass !== re_pass) {
    $(".password-hint").html("❌ Password not match!");
    $(".password-hint").css("font-color", "red");
    $(".submit").prop("disabled", true);
  } else {
    $(".password-hint").html("✅ Password match!");
    $(".password-hint").css("font-color", "red");
    $(".submit").prop("disabled", false);
  }
  if (pass === "") {
    $(".password-hint").html(
      "Hint: password must contain at least one  number,one uppercase and one lowercase letter. At least 8 or more characters"
    );
  }
}

function alert_logout() {
  $(".logout-confirm-message").css("display", "block");
}

function cancel_logout() {
  $(".logout-confirm-message").css("display", "none");
}
