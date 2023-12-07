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
        res.render("home_page_view", { arrivals, sales, categories, activePage, page, status, appName});
      } else {
        res.render("home_page_view", { arrivals, sales, categories, activePage, page, appName });
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
        res.render("birthday_page_view", { birthdayItems, activePage, h5Title, page, status, appName});
      } else {
        res.render("birthday_page_view", { birthdayItems, activePage, h5Title, page, appName });
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
        res.render("christmas_page_view", {christmasItems, activePage, h5Title, page, status, appName});
      } else {
        res.render("christmas_page_view", {christmasItems, activePage, h5Title, page, appName });
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
        res.render("halloween_page_view", {halloweenItems, activePage, h5Title, page, status, appName});
      } else {
        res.render("halloween_page_view", {halloweenItems, activePage, h5Title, page, appName});
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
        res.render("sales_page_view", { salesItems, activePage, h5Title, status, page, appName});
      } else {
        const status = "";
        res.render("sales_page_view", { salesItems, activePage, h5Title, status, page, appName});
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
        res.render("product_page_view", { item, randomResults, h5Title, page, status, appName});
      } else {
        res.render("product_page_view", { item, randomResults, h5Title, page, appName });
      }
      
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.get("/account", (req, res) => {
    userSession = req.session;
    const page = "/account";
    if (userSession.user) {
        const status = "login";
        const info = "<div class='account-list'><ul class='account-list-item'>" + 
                     "<li><a>Settings(TBD)</a></li>" + 
                     "<li><a>Order history(TBD)</a></li>" + 
                     "<li><a class='logout'>Sign out</a></li></ul></div>";
        
        res.render("account_page_view", { info, status, page, appName });
    } else {
        const info = "<div class='register-info'><h3>You are not logged in. Please log in or register an account.</h3>" +
                     "<a class='login'>Login</a> <a class='register'>Register</a></div>"
        const status = "";
        res.render("account_page_view", { info, status, page, appName });            
    }
    
  })

  app.post("/account", async (req, res) => {
    const page = "/account";
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
            res.render("account_page_view", { info, appName, page });
        } else {
            const info = "<div class='register-info'><h3>This email address has already been registered!</h3>" +
                          "<a class='login'>Login</a>&nbsp&nbsp&nbsp<a class='register'>Register</a></div>"
            res.render("account_page_view", { info, appName, page });
        }
    } else if (req.body.type == 'login') {
        userSession = req.session;
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const user = await modelUser.find({email: userEmail, password: userPassword}).lean();
        if (user.length === 0) {
            const info = "<div class='register-info'><h3>Login failed. Please check that the email or password is correct and try again.</h3>" +
                          "<a class='login'>Login</a></div>"
            res.render("account_page_view", { info, appName, page });
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
