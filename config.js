import dotenv from "dotenv";

dotenv.config();

module.exports = {
    port: process.env.PORT,
    enviroment: process.env.NODE_ENV
}

