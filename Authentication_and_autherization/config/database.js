const mongoose = require("mongoose");
exports.connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/authN_and_authZ", {
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
