
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://abhishekshetter1999:jobAPI@job.drj4z67.mongodb.net/";

async function mongoConnect() {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("connected successfully");
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = mongoConnect;
