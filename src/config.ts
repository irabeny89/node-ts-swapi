import dotenv from "dotenv";

dotenv.config();

const config = {
  host:
    process.env.NODE_ENV == "production"
      ? process.env.REMOTE_HOST
      : "http://localhost",
  port: process.env.PORT || 4000,
};

export default config;
