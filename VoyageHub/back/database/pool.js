const { db_config } = require("./config");
var mysql = require("mysql");

var pool = mysql.createPool(db_config);

console.log("MySQL: Connection established.");

module.exports = pool;
