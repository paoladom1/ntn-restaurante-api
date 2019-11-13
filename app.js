import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, DB_URL, DB_NAME } from "./config";
import routes from "./src/routes/index";

mongoose
  .connect(
    `${DB_URL}/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Connected to DB");
  }).catch(e =>{
    console.log(e);
  });

mongoose.Promise = global.Promise;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;