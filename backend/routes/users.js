var express = require("express");
var router = express.Router();
var db = require("../database");
var bcrypt = require("bcrypt");
var saltRounds = 10;

router.post("/register", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    console.log(result);
    if (err) {
      res.send({ err: err });
    }
    if (result && result.length > 0) {
      console.log("Email Already Exists!");
      res.status(406).send({ err: "Email Already Exists!" });
    } else {
      console.log("Email is good!");
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }
        db.query(
          "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
          [first_name, last_name, email, hash],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send({ err: "Error inserting into database" });
            }
            res.send(result);
          }
        );
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.json(result[0]);
        } else {
          res.status(401).send({ err: "Incorrect Email/Password!" });
        }
      });
    } else {
      res.status(401).send({ message: "User doesn't exist!" });
    }
  });
});

module.exports = router;
