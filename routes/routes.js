const modelProduct = require("../modules/ProductSchema");
module.exports = function (app) {
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
};
