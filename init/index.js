require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
  ...obj,
  owner:"6acdd83c0f7815249a2a6644",
   geometry: { type: "Point", coordinates: [77.209, 28.6139] }
}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();