const modelProduct = require("../modules/ProductSchema");
const modelUser = require("../modules/UserSchema");
const session = require("express-session");
const bodyParser = require("body-parser")
const config = require("../modules/config");
const appName = config.app.name

function getRandomNumber() {
  return Math.random() - 0.5;
}


module.exports = function (app) {

  let userSession;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'wHoopeE CoOkiE S$Cr$t',
    resave: true,
    saveUninitialized: false,
    maxAge: Date.now() + (86400 * 1000)
  }))
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
      const activePage = "homeActive";
      const page = "/";
      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        res.render("home_page_view", { arrivals, sales, categories, activePage, page, status, appName, cartItemAmount});
      } else {
        const cartItemAmount = 0;
        res.render("home_page_view", { arrivals, sales, categories, activePage, page, appName, cartItemAmount });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.get("/birthday", async (req, res) => {
    try {
      const birthdayItems = await modelProduct
        .find({ category: "birthday" }, "_id name path price newPrice")
        .sort({ _id: 1 })
        .lean();
      const activePage = "birthdayActive";
      const h5Title = birthdayItems.length + " products";
      const page = "/birthday";
      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        res.render("birthday_page_view", { birthdayItems, activePage, h5Title, page, status, appName, cartItemAmount});
      } else {
        const cartItemAmount = 0;
        res.render("birthday_page_view", { birthdayItems, activePage, h5Title, page, appName, cartItemAmount });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.get("/christmas", async (req, res) => {
    try {
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
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        res.render("christmas_page_view", {christmasItems, activePage, h5Title, page, status, appName, cartItemAmount});
      } else {
        const cartItemAmount = 0;
        res.render("christmas_page_view", {christmasItems, activePage, h5Title, page, appName, cartItemAmount });
      } 
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.get("/halloween", async (req, res) => {
    try {
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
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        res.render("halloween_page_view", {halloweenItems, activePage, h5Title, page, status, appName, cartItemAmount});
      } else {
        const cartItemAmount = 0;
        res.render("halloween_page_view", {halloweenItems, activePage, h5Title, page, appName, cartItemAmount});
      }
      
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.get("/sales", async (req, res) => {
    try {
      const salesItems = await modelProduct
        .find({sale: true}, "_id name path price newPrice")
        .sort({ _id: 1 })
        .lean();
      const activePage = "salesActive";
      const h5Title = salesItems.length + " products";
      const page = "/sales";

      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        res.render("sales_page_view", { salesItems, activePage, h5Title, status, page, appName, cartItemAmount});
      } else {
        const status = "";
        const cartItemAmount = 0;
        res.render("sales_page_view", { salesItems, activePage, h5Title, status, page, appName, cartItemAmount});
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
      const shuffledItems = recomItems.sort(getRandomNumber);
      const randomResults = shuffledItems.slice(0, 4);
      const h5Title = "You May Also Like";
      const page = "/product?id=" + req.query.id;

      userSession = req.session;
      if (userSession.user) {
        const status = "login";
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        res.render("product_page_view", { item, randomResults, h5Title, page, status, appName, cartItemAmount});
      } else {
        const cartItemAmount = 0;
        res.render("product_page_view", { item, randomResults, h5Title, page, appName, cartItemAmount });
      }
      
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.post("/add_cart", async(req, res)=> {
    userSession = req.session;
    if (userSession.user) {
        const _id = req.body._id;
        const quantity = parseInt(req.body.quantity);
        const userEmail = userSession.user.split(" ")[0];
        const cart = await modelUser.findOne({email: userEmail}, {sizeOfCart: 1});
        let sizeofcart = cart['sizeOfCart'] + quantity;
        const targetAccount = await modelUser.findOne({email: userEmail});
        const targetCart = targetAccount.cart;
        let itemQuantity;
        targetCart.forEach(cartItem => {
            if(cartItem._id === _id) {
                itemQuantity = cartItem.quantity;
            }
        })

        if(itemQuantity) {
            const itemQuantityUpdated = itemQuantity + quantity;
            await modelUser.findOneAndUpdate({email: userEmail, 'cart._id': _id}, {$set: {'cart.$.quantity': itemQuantityUpdated, sizeOfCart: sizeofcart}}, {new: true});
        } else {
            await modelUser.findOneAndUpdate({email: userEmail}, {$push: {cart: {_id, quantity}}, $set: {sizeOfCart: sizeofcart}}, {new: true});
        }
        res.json({ status: 200, sizeOfCart: sizeofcart});
    } else {
        res.json({ status: 500});
    }
  })

  app.get("/cart", async(req, res) => {
    userSession = req.session;
    if (userSession.user) {
        let cartItems = [];
        let subtotal = 0;
        const userEmail = userSession.user.split(" ")[0];
        const targetAccount = await modelUser.findOne({email: userEmail});
        const targetCart = targetAccount.cart;
        processCartItem = async function(cartItem) {
            const product = await modelProduct.findOne({_id: cartItem._id});
            subtotal += (product.newPrice * cartItem.quantity);
            const item = {product: product, quantity: cartItem.quantity};
            cartItems.push(item);
        }
        for (const cartItem of targetCart) {
            await processCartItem(cartItem);
        }
        const status = "login";
        const page = '/cart';
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        const jsonCartItems = JSON.parse(JSON.stringify(cartItems));
        subtotal = Math.round(subtotal * 100) / 100;
        res.render("cart_page_view", {jsonCartItems, status, page, appName, cartItemAmount, subtotal});
       
    } else {
        const status = ""; 
        const page = '/cart';
        const cartItemAmount = 0;
        res.render("cart_page_view", {status, page, appName, cartItemAmount});
    }
  })

  app.post('/delete_cart_item', async(req, res) => {
    userSession = req.session;
    const userEmail = userSession.user.split(" ")[0];
    const _id = req.body._id;
    const amount = req.body.amount;
    const cartSize = req.body.cartSize;
    const product = await modelProduct.findOne({_id: _id});
    
    const productPrice = product.newPrice;
    const deduction = productPrice * (parseInt(amount));
    await modelUser.updateOne({email: userEmail}, {$pull: {cart: {_id: _id}}, $set: {sizeOfCart: cartSize - amount}});
    res.json({ status: 200, deduction: deduction});
  })

  app.post('/edit_cart_item', async(req, res) => {
    userSession = req.session;
    const userEmail = userSession.user.split(" ")[0];
    const _id = req.body._id;
    const amount = parseInt(req.body.amount);
    const cartSize = parseInt(req.body.cartSize);
    const product = await modelProduct.findOne({_id: _id});
    const user = await modelUser.findOne({email: userEmail});
    const cartItemIndex = user.cart.findIndex(item => item._id === _id);
    const preQuantity = user.cart[cartItemIndex].quantity;
    if(cartItemIndex !== -1) {
        user.cart[cartItemIndex].quantity = amount;
    }
    const diff = amount - preQuantity;
    const productPrice = product.newPrice;
    const deduction = productPrice * diff;
    
    if(amount === 0) {
        await modelUser.updateOne({email: userEmail}, {$pull: {cart: {_id: _id}}, $set: {sizeOfCart: cartSize + diff}});
    } else {
        await modelUser.updateOne({email: userEmail}, {$set: {cart: user.cart, sizeOfCart: cartSize + diff}});
    }
    res.json({ status: 200, deduction: deduction, diff: diff});
  })

  app.get("/account", async(req, res) => {
    userSession = req.session;
    const page = "/account";
    
    if (userSession.user) {
        const status = "login";
        const info = "<div class='account-list'><ul class='account-list-item'>" + 
                     "<li><a>Settings(TBD)</a></li>" + 
                     "<li><a>Order history(TBD)</a></li>" + 
                     "<li><a class='logout'>Sign out</a></li></ul></div>";
        const cart = await modelUser.findOne({email: userSession.user.split(" ")[0]}, {sizeOfCart: 1});
        const cartItemAmount = cart['sizeOfCart'];
        res.render("account_page_view", { info, status, page, appName, cartItemAmount });
    } else {
        const info = "<div class='register-info'><h3>You are not logged in. Please log in or register an account.</h3>" +
                     "<a class='login'>Login</a> <a class='register'>Register</a></div>"
        const status = "";
        const cartItemAmount = 0;
        res.render("account_page_view", { info, status, page, appName, cartItemAmount });            
    }
    
  })

  app.post("/account", async (req, res) => {
    const page = "/account";
    const cartItemAmount = 0;
    if(req.body.type == 'register') {
        const firstname = req.body.firstName;
        const lastname = req.body.lastName;
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const user = await modelUser.find({email: userEmail}).lean();
        
        if (user.length === 0) {
            modelUser.create({
                firstname: firstname,
                lastname: lastname,
                email: userEmail,
                password: userPassword,
            }).then(function(){
                console.log("New user added.");
            })
            const info = "<div class='register-info text-center'><h3>Your registration has been completed successfully!</h3>" +
                          "<a class='login'>Login</a></div>"

            res.render("account_page_view", { info, appName, page, cartItemAmount });
        } else {
            const info = "<div class='register-info'><h3>This email address has already been registered!</h3>" +
                          "<a class='login'>Login</a>&nbsp&nbsp&nbsp<a class='register'>Register</a></div>"
            res.render("account_page_view", { info, appName, page, cartItemAmount });
        }
    } else if (req.body.type == 'login') {
        userSession = req.session;
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const user = await modelUser.find({email: userEmail, password: userPassword}).lean();
        if (user.length === 0) {
            const info = "<div class='register-info'><h3>Login failed. Please check that the email or password is correct and try again.</h3>" +
                          "<a class='login'>Login</a></div>"
            
            res.render("account_page_view", { info, appName, page, cartItemAmount });
        } else {
            userSession.cookie.maxAge = 86400 * 1000;
            userSession.user = userEmail + " " + userPassword;
            modelUser.findOneAndUpdate({email: userEmail}, {session: JSON.stringify(userSession)}, {new: true}).then(function() {
                console.log("Add session success");
            });
            res.redirect(303, req.body.page);
        }
        
    }
    
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        if(err) return console.log(err);
    })
    res.redirect(303, '/account');
  })
};
