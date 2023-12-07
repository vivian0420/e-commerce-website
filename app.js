const express = require("express");
const hbs = require("express-handlebars");
const config = require("./modules/config");
const connectDB = require("./modules/db");
const root = "/public";

const app = express();
app.use(express.static(__dirname + root));


// const modelUser = require("./modules/UserSchema");

// modelUser.create({
//     firstname: "Jiayun",
//     lastname: "Zhang",
//     email: "wszjy0420@gmail.com",
//     password: "Aa112233",
// }).then(function(){
//     console.log("create user.");
// })


    
// const dataProduct = modelProduct.create({
//     id: 25,
//     name: "Halloween retro iron lamp",
//     path: "/images/halloween-lamp.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 15.99,
//     newPrice: 15.99,
//     addDate: Date.now()
// },
// {
//     id: 26,
//     name: "Halloween light spider/witch/ghost/pumkpin/web 1pc",
//     path: "/images/halloween-light.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 9.99,
//     newPrice: 9.99,
//     addDate: Date.now()
// },
// {
//     id: 27,
//     name: "Halloween paper decoration set",
//     path: "/images/halloween-decoration1.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 9.99,
//     newPrice: 6.99,
//     addDate: Date.now(),
//     sale: true
// },
// {
//     id: 28,
//     name: "Halloween windon sticker set",
//     path: "/images/halloween-sticker.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 8.99,
//     newPrice: 6.99,
//     addDate: Date.now(),
//     sale: true
// },
// {
//     id: 29,
//     name: "Halloween spider light",
//     path: "/images/halloween-spider-light.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 15.99,
//     newPrice: 15.99,
//     addDate: Date.now()
// },
// {
//     id: 30,
//     name: "Halloween outdoor ghost decoration",
//     path: "/images/halloween-ghost.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 69.99,
//     newPrice: 69.99,
//     addDate: Date.now()
// },
// {
//     id: 31,
//     name: "Halloween Jack-o'-Lantern light 1pc",
//     path: "/images/halloween-Jack-o'-Lantern.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 19.99,
//     newPrice: 14.99,
//     addDate: Date.now(),
//     sale: true
// },
// {
//     id: 32,
//     name: "Halloween inflatable decoration set" ,
//     path: "/images/halloween-decoration.png",
//     category: "halloween",
//     species: "decoration",
//     quantity: 20,
//     price: 12.99,
//     newPrice: 9.99,
//     addDate: Date.now(),
//     sale: true
// }
// );
// dataProduct
//     .then(function(){
//         connectDB(false);
//     })

app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    helpers: {ifEquals: function(arg1, arg2, options) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
      }},
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "main_layout",
    extname: "hbs",
  })
);

require("./routes/routes")(app);

app.listen(config.app.port, config.app.host, function () {
  console.log("Server started on " + new Date().toLocaleString());
  connectDB(true);
});
