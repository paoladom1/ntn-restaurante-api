import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import apiRouter from "./src/api/Api";

mongoose
  .connect(
    "mongodb+srv://Fran2333:puky28012008@cluster0-osbzz.mongodb.net/Restaurant",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database");
  });

mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", apiRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;