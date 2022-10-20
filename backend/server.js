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
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("Username Already Exists!");
        res.send({ message: "Username Already Exists!" });
      } else {
        console.log("Username is good!");
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
          db.query(
            "INSERT INTO users (person_name, username, pass) VALUES (?,?,?)",
            [name, username, hash],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              res.send(result);
            }
          );
        });
      }
    }
  );
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
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].pass, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = JWT.sign({ id }, "zainafzal52", {
              expiresIn: 300,
            });

            res.json({ authorized: true, token: token, result });
          } else {
            res.send({ message: "Incorrect Username/Password!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist!" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("server is running");
});
