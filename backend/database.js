var mysql = require("mysql2");
var db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "password",
  database: "omniflight",
  port: "3306",
});

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;
