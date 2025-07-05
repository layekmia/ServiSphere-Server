const mongoose = require("mongoose");

async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/service-app`);
}

module.exports = connectDB;