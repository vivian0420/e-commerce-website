const modelProduct = require("../modules/ProductSchema");
const modelUser = require("../modules/UserSchema");
const session = require("express-session");   //Load session module
const bodyParser = require("body-parser");
const config = require("../modules/config");  // Load config
const appName = config.app.name;

// Generates a random floating-point number in the range [0, 1), and subtracting 0.5 from it shifts the range to [-0.5, 0.5). 
// Random numbers are evenly distributed around zero
function getRandomNumber() {
  return Math.random() - 0.5;  
}

module.exports = function (app) {
  let userSession;
  app.use(bodyParser.urlencoded({ extended: true }));    //Enabling the application to parse incoming URL-encoded data from POST requests
  app.use(
    session({         // Use session and set some options
      secret: "wHoopeE CoOkiE S$Cr$t",      // Use signed cookies
      resave: true,                         // Resave option
      saveUninitialized: false,             // SaveUninitialized option
      maxAge: Date.now() + 86400 * 1000,    // maxAge option: 24 hours
    })
  );

  // Home page route
  app.get("/", async (req, res) => {
    try {
      const arrivals = await modelProduct
        .find({ newArrival: true }, "_id name path")
        .sort({ _id: 1 })
        .lean();
      const sales = await modelProduct
        .find({ sale: true, homePic: true }, "_id name path")
        .sort({ _id: 1 })
        .lean();
      const categories = await modelProduct
        .find({ species: "category" }, "_id name path")
        .lean();
      const activePage = "homeActive";     // For active page management
      const page = "/";                    // Remember the current page for redirect purposes after the user logs in
      userSession = req.session;           // Get user session from the request
      if (userSession.user) {              // Retrieve the user's cart information if they are logged in
        const status = "login";            // Set the current status to "login" if the user is logged in
        const cart = await modelUser.findOne(
          { email: userSession.user.split(" ")[0] },
          { sizeOfCart: 1 }
        );
        const cartItemAmount = cart["sizeOfCart"];
        res.render("home_page_view", {
          arrivals,
          sales,
          categories,
          activePage,
          page,
          status,
          appName,
          cartItemAmount,
        });
      } else {
        const cartItemAmount = 0;
        res.render("home_page_view", {
          arrivals,
          sales,
          categories,
          activePage,
          page,
          appName,
          cartItemAmount,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  // Birthday page route
  app.get("/birthday", async (req, res) => {
    try {                          // Retrieve all products in the birthday category.
      const birthdayItems = await modelProduct
        .find({ category: "birthday" }, "_id name path price newPrice")
        .sort({ _id: 1 })
        .lean();
      const activePage = "birthdayActive";
      const h5Title = birthdayItems.length + " products";      // Title for diaplaying the total amount of birthday category
      const page = "/birthday";
      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne(
          { email: userSession.user.split(" ")[0] },
          { sizeOfCart: 1 }
        );
        const cartItemAmount = cart["sizeOfCart"];
        res.render("birthday_page_view", {
          birthdayItems,
          activePage,
          h5Title,
          page,
          status,
          appName,
          cartItemAmount,
        });
      } else {
        const cartItemAmount = 0;
        res.render("birthday_page_view", {
          birthdayItems,
          activePage,
          h5Title,
          page,
          appName,
          cartItemAmount,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  // Christmas page route
  app.get("/christmas", async (req, res) => {
    try {                // Retrieve all products in the christmas category.
      const christmasItems = await modelProduct
        .find({ category: "christmas" }, "_id name path price newPrice")
        .sort({ _id: 1 })
        .lean();
      const activePage = "christmasActive";
      const h5Title = christmasItems.length + " products";
      const page = "/christmas";

      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne(
          { email: userSession.user.split(" ")[0] },
          { sizeOfCart: 1 }
        );
        const cartItemAmount = cart["sizeOfCart"];
        res.render("christmas_page_view", {
          christmasItems,
          activePage,
          h5Title,
          page,
          status,
          appName,
          cartItemAmount,
        });
      } else {
        const cartItemAmount = 0;
        res.render("christmas_page_view", {
          christmasItems,
          activePage,
          h5Title,
          page,
          appName,
          cartItemAmount,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  // Halloween page route
  app.get("/halloween", async (req, res) => {
    try {               // Retrieve all products in the halloween category.
      const halloweenItems = await modelProduct
        .find({ category: "halloween" }, "_id name path price newPrice")
        .sort({ _id: 1 })
        .lean();
      const activePage = "halloweenActive";
      const h5Title = halloweenItems.length + " products";
      const page = "/halloween";

      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne(
          { email: userSession.user.split(" ")[0] },
          { sizeOfCart: 1 }
        );
        const cartItemAmount = cart["sizeOfCart"];
        res.render("halloween_page_view", {
          halloweenItems,
          activePage,
          h5Title,
          page,
          status,
          appName,
          cartItemAmount,
        });
      } else {
        const cartItemAmount = 0;
        res.render("halloween_page_view", {
          halloweenItems,
          activePage,
          h5Title,
          page,
          appName,
          cartItemAmount,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  // Sales page route
  app.get("/sales", async (req, res) => {
    try {           // Retrieve all products in the sales category.
      const salesItems = await modelProduct
        .find({ sale: true }, "_id name path price newPrice")
        .sort({ _id: 1 })
        .lean();
      const activePage = "salesActive";
      const h5Title = salesItems.length + " products";
      const page = "/sales";

      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne(
          { email: userSession.user.split(" ")[0] },
          { sizeOfCart: 1 }
        );
        const cartItemAmount = cart["sizeOfCart"];
        res.render("sales_page_view", {
          salesItems,
          activePage,
          h5Title,
          status,
          page,
          appName,
          cartItemAmount,
        });
      } else {
        const status = "";
        const cartItemAmount = 0;
        res.render("sales_page_view", {
          salesItems,
          activePage,
          h5Title,
          status,
          page,
          appName,
          cartItemAmount,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.get("/product", async (req, res) => {
    try {
      const item = await modelProduct
        .findOne(
          { _id: req.query.id },
          "_id name path price newPrice quantity details category"
        )
        .lean();
      const recomItems = await modelProduct
        .find({ category: item.category }, "_id name price newPrice path")
        .lean();
      const shuffledItems = recomItems.sort(getRandomNumber);       // Sort items based on the random numbers generated.
      const randomResults = shuffledItems.slice(0, 4);              // Select the first 4 products of the same type as recommended products
      const h5Title = "You May Also Like";
      const page = "/product?id=" + req.query.id;

      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne(
          { email: userSession.user.split(" ")[0] },
          { sizeOfCart: 1 }
        );
        const cartItemAmount = cart["sizeOfCart"];
        res.render("product_page_view", {
          item,
          randomResults,
          h5Title,
          page,
          status,
          appName,
          cartItemAmount,
        });
      } else {
        const cartItemAmount = 0;
        res.render("product_page_view", {
          item,
          randomResults,
          h5Title,
          page,
          appName,
          cartItemAmount,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  // Route for 'add-cart' post request
  app.post("/add_cart", async (req, res) => {
    userSession = req.session;
    if (userSession.user) {
      const _id = req.body._id;
      let product = await modelProduct.findOne({ _id: _id });    // Retrieve the current product that the user attempted to add to the cart
      let maxLimit = product["quantity"];                        // Retrieve the stock of the current product as the maximum limit
      const quantity = parseInt(req.body.quantity);              // Retrieve the quantity of the product that the user tried to add to the cart from the request body
      const userEmail = userSession.user.split(" ")[0];          // Retrieve the user email from request body
      const cart = await modelUser.findOne(
        { email: userEmail },
        { sizeOfCart: 1 }
      );
      let sizeofcart = cart["sizeOfCart"] + quantity;           // Udpate size of cart
      const targetAccount = await modelUser.findOne({ email: userEmail });
      const targetCart = targetAccount.cart;                    // Retrieve the user's shopping cart info
      let itemQuantity;
      targetCart.forEach((cartItem) => {                        // Iterate the user's shopping cart to see if the item has already in the cart
        if (cartItem._id === _id) {
          itemQuantity = cartItem.quantity;
        }
      });

      if (itemQuantity) {                                      // If the item that the user tried to add to the shopping cart exists in the cart
        const itemQuantityUpdated = itemQuantity + quantity;   // Retrieve the updated quantity of the current item the user wants to add to the cart
        if (itemQuantityUpdated <= maxLimit) {                 // Allow the user's operation if the quantity is less than the stock of the item
          await modelUser.findOneAndUpdate(
            { email: userEmail, "cart._id": _id },
            {
              $set: {
                "cart.$.quantity": itemQuantityUpdated,
                sizeOfCart: sizeofcart,
              },
            },
            { new: true }
          );
          res.json({ status: 200, sizeOfCart: sizeofcart});
        } else {                                             // Reject the user's operation if the quantity is greater than the stock of the item
          res.status(400).end();
        }
      } else {
        await modelUser.findOneAndUpdate(
          { email: userEmail },
          {
            $push: { cart: { _id, quantity } },
            $set: { sizeOfCart: sizeofcart },
          },
          { new: true }
        );
        res.json({ status: 200, sizeOfCart: sizeofcart });
      }
    } else {                                              // Reject the 'add item to cart' operation if the user isn't logged in
      res.json({ status: 500 });
    }
  });

  // route for getting user's cart info
  app.get("/cart", async (req, res) => {
    userSession = req.session;
    if (userSession.user) {                              // Allow the user to check the shopping cart if the user is logged in
      const cartItems = [];                              // Array for storing items in the shopping cart
      let subtotal = 0;
      const userEmail = userSession.user.split(" ")[0];
      const targetAccount = await modelUser.findOne({ email: userEmail });
      const targetCart = targetAccount.cart;
      processCartItem = async function (cartItem) {
        const product = await modelProduct.findOne({ _id: cartItem._id });
        subtotal += product.newPrice * cartItem.quantity;     // For calculating the subtotal of current shopping cart based on the product prices and quantities
        const item = { product: product, quantity: cartItem.quantity }; 
        cartItems.push(item);                                // Add item to cartItems array
      };
      for (const cartItem of targetCart) {
        await processCartItem(cartItem);
      }
      const status = "login";
      const page = "/cart";
      const cart = await modelUser.findOne(
        { email: userSession.user.split(" ")[0] },
        { sizeOfCart: 1 }
      );
      const cartItemAmount = cart["sizeOfCart"];
      const jsonCartItems = JSON.parse(JSON.stringify(cartItems));    
      subtotal = Math.round(subtotal * 100) / 100;     //Round the subtotal to two decimal places
      res.render("cart_page_view", {
        jsonCartItems,
        status,
        page,
        appName,
        cartItemAmount,
        subtotal,
      });
    } else {                                       // Prompt the user to log in if they aren't currently logged in.
      const status = "";
      const page = "/cart";
      const cartItemAmount = 0;
      res.render("cart_page_view", { status, page, appName, cartItemAmount });
    }
  });

  // route for handling the 'delete cart item' post request
  app.post("/delete_cart_item", async (req, res) => {
    userSession = req.session;
    const userEmail = userSession.user.split(" ")[0];
    const _id = req.body._id;
    const amount = req.body.amount;
    const cartSize = req.body.cartSize;
    const product = await modelProduct.findOne({ _id: _id });

    const productPrice = product.newPrice;
    const deduction = productPrice * parseInt(amount);   
    await modelUser.updateOne(
      { email: userEmail },
      { $pull: { cart: { _id: _id } }, $set: { sizeOfCart: cartSize - amount } }       // Delete the item from the user's cart
    );
    res.json({ status: 200, deduction: deduction });
  });

  // route for handling the 'edit cart item' post request
  app.post("/edit_cart_item", async (req, res) => {
    userSession = req.session;
    const userEmail = userSession.user.split(" ")[0];
    const _id = req.body._id;
    const amount = parseInt(req.body.amount);
    const cartSize = parseInt(req.body.cartSize);
    const product = await modelProduct.findOne({ _id: _id });
    const user = await modelUser.findOne({ email: userEmail });
    const cartItemIndex = user.cart.findIndex((item) => item._id === _id);  // Retrieve the index of the current item in the shopping cart
    const preQuantity = user.cart[cartItemIndex].quantity;
    if (cartItemIndex !== -1) {             // If the index exists
      user.cart[cartItemIndex].quantity = amount;
    }
    const diff = amount - preQuantity;     
    const productPrice = product.newPrice;
    const deduction = productPrice * diff; 

    if (amount === 0) {   // If the user edits the quantity of the current item to 0, remove the item from the shopping cart
      await modelUser.updateOne(
        { email: userEmail },
        { $pull: { cart: { _id: _id } }, $set: { sizeOfCart: cartSize + diff } }
      );
    } else {              // Else, update the quantity of the current item
      await modelUser.updateOne(
        { email: userEmail },
        { $set: { cart: user.cart, sizeOfCart: cartSize + diff } }
      );
    }
    res.json({ status: 200, deduction: deduction, diff: diff });
  });

  // route for getting the user's account page
  app.get("/account", async (req, res) => {
    userSession = req.session;
    const page = "/account";

    if (userSession.user) {     // Display the user's account info if the user is logged in
      const status = "login";
      const info =
        "<div class='account-list'><ul class='account-list-item'>" +
        "<li><a>Settings(TBD)</a></li>" +
        "<li><a>Order history(TBD)</a></li>" +
        "<li><a class='logout'>Sign out</a></li></ul></div>";
      const cart = await modelUser.findOne(
        { email: userSession.user.split(" ")[0] },
        { sizeOfCart: 1 }
      );
      const cartItemAmount = cart["sizeOfCart"];
      res.render("account_page_view", {
        info,
        status,
        page,
        appName,
        cartItemAmount,
      });
    } else {                      // Prompt the user to log in if they aren't currently logged in
      const info =
        "<div class='register-info'><h3>You are not logged in. Please log in or register an account.</h3>" +
        "<a class='login'>Login</a> <a class='register'>Register</a></div>";
      const status = "";
      const cartItemAmount = 0;
      res.render("account_page_view", {
        info,
        status,
        page,
        appName,
        cartItemAmount,
      });
    }
  });


  // route for handling the user's register and login post request
  app.post("/account", async (req, res) => {
    const page = "/account";
    const cartItemAmount = 0;
    if (req.body.type == "register") {        // Handling the user's register post requset
      const firstname = req.body.firstName;
      const lastname = req.body.lastName;
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      const user = await modelUser.find({ email: userEmail }).lean();

      if (user.length === 0) {
        modelUser
          .create({
            firstname: firstname,
            lastname: lastname,
            email: userEmail,
            password: userPassword,
          })
          .then(function () {
            console.log("New user added.");
          });
        const info =
          "<div class='register-info text-center'><h3>Your registration has been completed successfully!</h3>" +
          "<a class='login'>Login</a></div>";

        res.render("account_page_view", {
          info,
          appName,
          page,
          cartItemAmount,
        });
      } else {
        const info =
          "<div class='register-info'><h3>This email address has already been registered!</h3>" +
          "<a class='login'>Login</a>&nbsp&nbsp&nbsp<a class='register'>Register</a></div>";
        res.render("account_page_view", {
          info,
          appName,
          page,
          cartItemAmount,
        });
      }
    } else if (req.body.type == "login") {      // Handling the user's login post requset
      userSession = req.session;
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      const user = await modelUser
        .find({ email: userEmail, password: userPassword })
        .lean();
      if (user.length === 0) {   
        const info =
          "<div class='register-info'><h3>Login failed. Please check that the email or password is correct and try again.</h3>" +
          "<a class='login'>Login</a></div>";

        res.render("account_page_view", {
          info,
          appName,
          page,
          cartItemAmount,
        });
      } else {
        // custom the user's session
        userSession.cookie.maxAge = 86400 * 1000;
        userSession.user = userEmail + " " + userPassword;
        modelUser
          .findOneAndUpdate(
            { email: userEmail },
            { session: JSON.stringify(userSession) },
            { new: true }
          )
          .then(function () {
            console.log("Add session success");
          });
        res.redirect(303, req.body.page);                 // redirect to the page that the user is on
      }
    }
  });

  // route for handling the user's log out behavior
  app.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
      if (err) return console.log(err);
    });
    res.redirect(303, "/account");
  });
};
