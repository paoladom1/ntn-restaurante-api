import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV,
    DB_URL: process.env.MONGODB_URL,
    DB_NAME: process.env.MONGODB_NAME,
    JWT_KEY: process.env.JWT_KEY,
};
