import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import { port } from "./config";
import routes from "./src/routes/index";

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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;