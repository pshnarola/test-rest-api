const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("connected", function () {
  console.log("Database connected successfully...");
});
db.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});