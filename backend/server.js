const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const saltRounds = 10;
var request = require("request");
const PORT = 8000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "db",
  password: "password",
  database: "omniflight",
});

app.post("/register", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log("Email Already Exists!");
      res.send({ message: "Email Already Exists!" });
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
              res.send({ err: err });
            }
            res.send(result);
          }
        );
      });
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token is Needed");
  } else {
    JWT.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ authurized: false, message: "Failed to Authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/authUser", verifyJWT, (req, res) => {
  res.send("Authenticated User");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?;", username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const id = result[0].id;
          const token = JWT.sign({ id }, email, {
            expiresIn: 300,
          });

          res.json({ authorized: true, token: token, result });
        } else {
          res.send({ message: "Incorrect Email/Password!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist!" });
    }
  });
});

app.listen(PORT, () => {
  console.log("server is running");
});
