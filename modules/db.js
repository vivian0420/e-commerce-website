const config = require("./config");
const connString = config.mongo.connectionString;

const mongoose = require("mongoose");
const connectDB = function(blnOpen) {
    if (blnOpen) {
        mongoose.connect(connString)
        .then(function() {
           let conn = mongoose.connection;
           console.log(`Database is connected on ${new Date().toLocaleString()}: ${conn.host}:${conn.port} @ ${conn.name}`); 
        }, function(err) {
            console.log("Problem occurred while connecting to the database. " + err);
        })
    } else {
        mongoose.connection.close()
        .then(
            function() {
                console.log(`MongoDB connection closed on ${new Date().toLocaleString()}`);
            }, function(err) {
                console.log("Problem occurred while closing the database. " + err);
            }
        )
    }
}
module.exports = connectDB;