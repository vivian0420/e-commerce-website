const express = require("express");
const app = express();

const root = "/public";
app.use(express.static(__dirname + root));

const hbs = require("express-handlebars");
const config = require("./modules/config");

const connectDB = require("./modules/db");
const modelProduct = require("./modules/ProductSchema");

// modelProduct.updateMany({homePic: true}, {newArrival: true}, {new: true})
//     .then (function(){
//         connectDB(false);
//     })
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
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main_layout",
    extname: "hbs",
  })
);

app.get("/", async (req, res) => {
  try {
    const arrivals = await modelProduct
      .find({ newArrival: true }, "id name path")
      .sort({ id: 1 })
      .lean();
    const sales = await modelProduct
      .find({ sale: true, homePic: true }, "id name path")
      .sort({ id: 1 })
      .lean();
    const categories = await modelProduct
      .find({ species: "category" }, "id name path")
      .sort({ id: 1 })
      .lean();
    const activePage = "homeActive";
    res.render("home_page_view", { arrivals, sales, categories, activePage });
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

app.get("/birthday", async (req, res) => {
  try {
    const birthdayItems = await modelProduct
      .find({ category: "birthday" }, "id name path price")
      .sort({ id: 1 })
      .lean();
    const activePage = "birthdayActive";
    res.render("birthday_page_view", { birthdayItems, activePage });
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

app.get("/christmas", async (req, res) => {
  try {
    const christmasItems = await modelProduct
      .find({ category: "christmas" }, "id name path price")
      .sort({ id: 1 })
      .lean();
    const activePage = "christmasActive";
    res.render("christmas_page_view", { christmasItems, activePage });
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

app.get("/halloween", async (req, res) => {
  try {
    const halloweenItems = await modelProduct
      .find({ category: "halloween" }, "id name path price")
      .sort({ id: 1 })
      .lean();
    const activePage = "halloweenActive";
    res.render("halloween_page_view", { halloweenItems, activePage });
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

app.get("/sales", async (req, res) => {
  try {
    const salesItems = await modelProduct
      .find({ sale: true }, "id name path price newPrice")
      .sort({ id: 1 })
      .lean();
    const activePage = "salesActive";
    res.render("sales_page_view", { salesItems, activePage });
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

app.listen(config.app.port, config.app.host, function () {
  console.log("Server started on " + new Date().toLocaleString());
  connectDB(true);
});
