import "dotenv/config";
import mongoose from "mongoose";
const db_uri = process.env.DB_URL;

mongoose.connect(db_uri);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
