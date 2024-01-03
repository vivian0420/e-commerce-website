$(function () {
  $("head title").text($(".get-app-name").val());
  $(".website-name").text($(".get-app-name").val());
  $("#footer-date").html("Today is: " + new Date().toLocaleDateString());
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
  if(currentPage == "/cart" && parseInt($("#subtotal").text().substring(1)) == 0) {
    $(".login_prompt").html("You cart is empty!");
    $(".login_prompt").css("display", "block");
  }
  

  //Implementing user account functionality based on user status:
  //If a user is logged in, clicking the account button will navigate to the user's account page
  //Otherwise, it will display a login popup.
  let status = $(".get-status").attr("id");
  if (status === "login") {
    $(".nav-login").css("display", "none");
    $(".nav-account").css("display", "block");
  } else {
    $(".login_prompt").css("display","block");
  }
 
  // Shopping cart Shipping fee calculation function
  if(status === "login" && currentPage == "/cart") {
    const subtotal = parseFloat($("#subtotal").text().substring(1));
    console.log("subtotal in get cart: " + subtotal);
    if(subtotal > 59) {
        $(".cart-shipping-fee").text("Free");
        $(".cart-shipping-fee").css("color", "green");
        $(".subtotal_include_shipping").text("$" + subtotal);
    } else if (subtotal == 0 ) {
        $(".cart-shipping-fee").text("$0");
        $(".cart-shipping-fee").css("color", "black");
        $(".subtotal_include_shipping").text("$" + subtotal);
    } else {
        $(".cart-shipping-fee").text("$10.00");
        $(".cart-shipping-fee").css("color", "black");
        $(".subtotal_include_shipping").text("$" + Math.round((subtotal+10) * 100) / 100);
    }
  }


  // Product page "+" and "-" button functionality
  $(".bi-dash-circle").on("click", dec_quantity);
  $(".bi-plus-circle").on("click", inc_quantity);

  // Product page "Add to cart" button click event
  $("#addToCart").on("click", add_cart);

  // Login, logout and register click events
  $(".login").on("click", login);
  $(".register").on("click", register);
  $(".close_button").on("click", close);
  $(".main").on("mouseup", click_blank);
  $("#confirm_password").on("keyup", validate_password);
  $(".logout").on("click", alert_logout);
  $(".cancel-logout").on("click", cancel_logout);

  // Shopping cart functionalities
  $(".cartDeleteButton").on("click", delete_cartItem)
  $(".cartEditButton").on("click", edit_cartItem)
  $(".cart_quantity").on("keyup", update_amount);
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
      $(".alert").text("Quantity out of limit!")
      $(".alert").css("color", "red");
      $(".alert").show(3000);
      setTimeout(function () {
        $(".alert").hide();
      }, 3000);
      oldval = maxLimit;
    }
    return oldval;
  });
}

// Product page "Add to cart" button click event: set up alert based on the current quantity of 
// corresponding product. If the input value is greater than the max limit or the user didn't enter
// a number, display an alert for 3 seconds. Otherwise, send an XMLHttpRequest to the backend to add 
// the item to the shopping cart.
function add_cart() {
  const maxLimit = parseInt($(".quantity-input").attr("max"));
  if (parseInt($(".quantity-input").val()) > maxLimit) {
    $(".alert").text("Quantity out of limit!")
    $(".alert").css("color", "red");
    $(".alert").show(3000);
    setTimeout(function () {
      $(".alert").hide();
    }, 3000);
    $(".quantity-input").val(0);
  } else if (parseInt($(".quantity-input").val()) < 0) {
    $(".alert").text("Negative quantity is not allowed")
    $(".alert").css("color", "red");
    $(".alert").show(3000);
    setTimeout(function () {
      $(".alert").hide();
    }, 3000);
    $(".quantity-input").val(0);
  } else if (parseInt($(".quantity-input").val()) === 0) {
        $(".alert").text("Please enter a number!")
        $(".alert").css("color", "red");
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
            $(".alert").css("color", "green");
            $(".alert").show(3000);
            setTimeout(function () {
                $(".alert").hide();
            }, 3000);
            let res = JSON.parse(xhr.response);  
            const sizeofcart = res.sizeOfCart;
            $(".nav-cart-count").text(sizeofcart);
            $(".quantity-input").val(0);
        }  else if (xhr.status == 400) {
            $(".alert").text("Quantity out of limit!");
            $(".alert").css("color", "red");
            $(".alert").show(3000);
            setTimeout(function () {
                $(".alert").hide();
            }, 3000);
        }
        else {
            $(".alert").text("Please log in before proceeding!");
            $(".alert").css("color", "red");
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

// Validate password function for registration
function validate_password() {
  let pass = $(".register_password").val();
  let re_pass = $("#confirm_password").val();
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

// Shopping cart "Delete" button functionality: remove the item from the shopping cart, then send an 
// XMLHttpRequest to the backend. If the shopping cart is empty after the item is removed, alert the 
// user that the shopping cart is empty. Otherwise, modify the subtotal and shipping fee based on the 
// current items in the shopping cart.
function delete_cartItem() {
    $(this).closest('.individualItem').remove();
    let id = $(this).closest('.individualItem').find('.item-id').text();
    let amount = parseInt($(this).closest('.individualItem').find('.cart_quantity').val());

    let CartSize = parseInt($(".nav-cart-count").text());
    let subtotal = parseFloat($("#subtotal").text().substring(1));
    let xhr = new XMLHttpRequest(); 
    xhr.open('POST', '/delete_cart_item');  
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const data = "_id=" + encodeURIComponent(id) + "&amount=" + encodeURIComponent(amount) + "&cartSize=" + encodeURIComponent(CartSize);
    xhr.send(data);

    xhr.addEventListener("load", function(){
        let res = JSON.parse(xhr.response); 
        const deduction = res.deduction;
        const currentCartSize = CartSize - amount;
        if(currentCartSize === 0) {
            $(".login_prompt").html("You cart is empty!");
            $(".login_prompt").css("display", "block");
        }
        $(".nav-cart-count").text(currentCartSize);
        let currentSubtotal = subtotal- parseFloat(deduction);
        currentSubtotal = Math.round(currentSubtotal * 100) / 100;
        $(".subtotal_exclude_shipping").text("$" + currentSubtotal);
        if (currentSubtotal == 0 ) {
            $(".cart-shipping-fee").text("$0");
            $(".cart-shipping-fee").css("color", "black");
            $(".subtotal_include_shipping").text("$" + currentSubtotal);
        } else if(currentSubtotal < 59 ) {
            $(".cart-shipping-fee").text("$10.00");
            $(".cart-shipping-fee").css("color", "black");
            $(".subtotal_include_shipping").text("$" + Math.round((currentSubtotal+10)*100) / 100);
        } else {
            $(".cart-shipping-fee").text("Free");
            $(".cart-shipping-fee").css("color", "green");
            $(".subtotal_include_shipping").text("$" + currentSubtotal);
        }
        

    })
}

// Shopping cart "Edit" button functionality: If the amount of the item is 0 after edit, remove the 
// item from the shopping cart. Send an XMLHttpRequest to the backend. If the shopping cart is empty 
// after the item is removed, alert the user that the shopping cart is empty. Otherwise, modify the 
// subtotal and shipping fee based on the current items in the shopping cart.
function edit_cartItem() {
    let id = $(this).closest('.individualItem').find('.item-id').text();
    const amount = parseInt($(this).closest('.individualItem').find('.cart_quantity').val());
    if (amount === 0) {
        $(this).closest('.individualItem').remove();
    }
    let CartSize = parseInt($(".nav-cart-count").text());
    let subtotal = parseFloat($("#subtotal").text().substring(1));
    let xhr = new XMLHttpRequest(); 
    xhr.open('POST', '/edit_cart_item'); 
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const data = "_id=" + encodeURIComponent(id) + "&amount=" + encodeURIComponent(amount) + "&cartSize=" + encodeURIComponent(CartSize);
    xhr.send(data);

    xhr.addEventListener("load", function() {
        let res = JSON.parse(xhr.response); 
        const deduction = res.deduction;
        const diff = res.diff;
        const currentCartSize = CartSize + diff;
        if(currentCartSize === 0) {
            $(".login_prompt").html("You cart is empty!");
            $(".login_prompt").css("display", "block");
        }
        $(".nav-cart-count").text(currentCartSize);
        let currentSubtotal = subtotal + parseFloat(deduction);
        currentSubtotal = Math.round(currentSubtotal * 100) / 100;
        //let currentSubtotal = Math.round((subtotal + parseFloat(deduction)) * 100) /100;
        $(".subtotal_exclude_shipping").text("$" + currentSubtotal);
        if (currentSubtotal == 0 ) {
            $(".cart-shipping-fee").text("$0");
            $(".cart-shipping-fee").css("color", "black");
            $(".subtotal_include_shipping").text("$" + currentSubtotal);
        } else if(currentSubtotal < 59) {
            $(".cart-shipping-fee").text("$10.00");
            $(".cart-shipping-fee").css("color", "black");
            $(".subtotal_include_shipping").text("$" + Math.round((currentSubtotal+10) * 100)/100);
        } else {
            $(".cart-shipping-fee").text("Free");
            $(".cart-shipping-fee").css("color", "green");
            $(".subtotal_include_shipping").text("$" + currentSubtotal);
        }
    })
}

// Shopping cart update amount key-up event: If the input value is less than 0, alert "Quantity can't be 
// less than 0!" If the input is greater than the qunatity of corresponding product, alert "Quantity
// out of limit"
function update_amount() {
    const amount = parseInt($(this).closest('.individualItem').find('.cart_quantity').val());
    const max = parseInt($(this).closest('.individualItem').find('.cart_quantity').attr("max"));
    let self = this;
    if(amount < 0) {
        $(this).closest('.individualItem').find('.cart_quantity').val("0");
        $(this).closest('.individualItem').find('.cart_quantity_alert').text("Quantity can't be less than 0!");
        $(this).closest('.individualItem').find('.cart_quantity_alert').css("color", "red");
        ($(this).closest('.individualItem').find('.cart_quantity_alert')).show(2000);
        setTimeout(function () {
            $(self).closest('.individualItem').find('.cart_quantity_alert').hide();
        }, 2000);
    } else if (amount > max) {
        $(this).closest('.individualItem').find('.cart_quantity').val(max);
        $(this).closest('.individualItem').find('.cart_quantity_alert').text("Quantity out of limit!");
        $(this).closest('.individualItem').find('.cart_quantity_alert').css("color", "red");
        $(this).closest('.individualItem').find('.cart_quantity_alert').show(2000);
        setTimeout(function () {
            $(self).closest('.individualItem').find('.cart_quantity_alert').hide();
        }, 2000);
    }
}
