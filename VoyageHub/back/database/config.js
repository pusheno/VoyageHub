require("dotenv").config();
const db_config = {
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
};
exports.db_config = db_config;
