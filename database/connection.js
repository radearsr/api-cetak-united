const sql = require("mssql");
const dbConf = require("./config");

const databaseConf = {
  port: parseFloat(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const newPool = new sql.ConnectionPool(databaseConf);

const connectToDatabase = async () => {
  try {
    const pool = await newPool.connect();
    return pool;
  } catch (error) {
   console.error(error); 
  } 
};

connectToDatabase().then((result) => {
  if (!result.connected) throw new Error("Failed to connect db");
  console.log("Success Connect");
});
module.exports = { sql, connectToDatabase };