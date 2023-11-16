const express = require("express");
const app = express();
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const root = '/public';

app.use(express.static(__dirname + root));

const config = require("./modules/config");


app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main_layout',
    extname: 'hbs',
}));


app.get("/", function(req, res) {
    res.render('home_page_view');
})

app.listen(config.app.port, config.app.host, function() {
    console.log("Server started on " + new Date().toLocaleString());
})