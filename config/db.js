require("dotenv").config();
const { Sequelize } = require("sequelize");

const otomax = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: false,
        enableArithAbort: false,
        cryptoCredentialsDetails: {
          minVersion: "TLSv1",
        },
        logging: false,
      },
    },
  }
);

module.exports = otomax;
