import dotenv from "dotenv";

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV
}

