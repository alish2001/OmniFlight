const mysql = require("mysql2");
const db = mysql.createConnection({
  user: process.env.DB_USER || "user",
  host: process.env.DB_ADDRESS || "127.0.0.1",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "omniflight",
  port: "3306",
});

db.connect(function (err) {
  if (err) console.log(err);
});

module.exports = db;
