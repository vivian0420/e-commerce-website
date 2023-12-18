const express = require("express");
const hbs = require("express-handlebars");
const config = require("./modules/config");
const connectDB = require("./modules/db");
const root = "/public";

const app = express();
app.use(express.static(__dirname + root));

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
