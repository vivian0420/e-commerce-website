const modelProduct = require("../modules/ProductSchema");
function getRandomNumber() {
  return Math.random() - 0.5;
}

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
      const h5Title = birthdayItems.length + " products";
      res.render("birthday_page_view", { birthdayItems, activePage, h5Title });
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
      const h5Title = christmasItems.length + " products";
      res.render("christmas_page_view", {
        christmasItems,
        activePage,
        h5Title,
      });
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
      const h5Title = halloweenItems.length + " products";
      res.render("halloween_page_view", {
        halloweenItems,
        activePage,
        h5Title,
      });
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
      const h5Title = salesItems.length + " products";
      res.render("sales_page_view", { salesItems, activePage, h5Title });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  app.get("/product", async (req, res) => {
    try {
      const item = await modelProduct
        .findOne(
          { id: req.query.id },
          "id name path price newPrice quantity details category"
        )
        .lean();
      const recomItems = await modelProduct
        .find({ category: item.category }, "id name price newPrice path")
        .lean();
      const shuffledItems = recomItems.sort(getRandomNumber);
      const randomResults = shuffledItems.slice(0, 4);
      const h5Title = "You May Also Like";
      res.render("product_page_view", { item, randomResults, h5Title });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });
};
