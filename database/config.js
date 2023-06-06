require("dotenv").config();

const databaseConf = {
  port: parseFloat(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: toString(process.env.DB_HOST),
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

module.exports = databaseConf;
