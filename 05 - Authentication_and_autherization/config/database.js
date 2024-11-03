const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Connected successfully");
    })
    .catch((er) => {
      console.log("Recieved an Error to connect DataBase:", er);
    });
};
