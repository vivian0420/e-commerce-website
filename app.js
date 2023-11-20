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
//     id: 9,
//     name: "Birthday",
//     path: "/images/category-birthday.png",
//     category: " ",
//     species: "category",
//     quantity: 0,
//     price: 0,
//     newPrice: 0,
//     addDate: Date.now(),
//     homePic: true
// },
// {
//     id: 10,
//     name: "Christmas",
//     path: "/images/category-christmas.png",
//     category: " ",
//     species: "category",
//     quantity: 0,
//     price: 0,
//     newPrice: 0,
//     addDate: Date.now(),
//     homePic: true
// },
// {
//     id: 11,
//     name: "Thanksgiving",
//     path: "/images/category-thanksgiving.png",
//     category: " ",
//     species: "category",
//     quantity: 0,
//     price: 0,
//     newPrice: 0,
//     addDate: Date.now(),
//     homePic: true
// },
// {
//     id: 12,
//     name: "Halloween",
//     path: "/images/category-halloween.png",
//     category: " ",
//     species: "category",
//     quantity: 0,
//     price: 0,
//     newPrice: 0,
//     addDate: Date.now(),
//     homePic: true
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
    const arrivals = await modelProduct.find({ newArrival: true }, "id name path").sort({ id: 1}).lean();
    const sales = await modelProduct.find({ sale: true }, "id name path").sort({ id: 1}).lean();
    const categories = await modelProduct.find({ species: "category" }, "id name path").sort({ id: 1}).lean();

    res.render("home_page_view", { arrivals, sales, categories });
  } catch (error) {
    console.error("Error occurred:", error);
  } 
});



app.listen(config.app.port, config.app.host, function () {
  console.log("Server started on " + new Date().toLocaleString());
  connectDB(true);
});
