const mongoose = require("mongoose");

async function connectedToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI_USER_POST);
    console.log("Connected To MongoDB...");
  } catch (error) {
    (error) => console.log("Connection Failed To MongoDB", error);
  }
}

module.exports = connectedToDB;
