import dontenv from "dotenv";

dontenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: ["http://localhost:3000", "https://yourdomain.com"],
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_SCHEMA: process.env.DB_SCHEMA,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
