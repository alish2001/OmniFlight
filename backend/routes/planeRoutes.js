var express = require("express");
var router = express.Router();
var db = require("../database");

router.post("/getRoutes", (req, res) => {
  const origin_city = req.body.origin_city;
  const dest_city = req.body.dest_city;

  db.query(
    "SELECT " +
      "DISTINCT r.routeUID, " +
      "origin.city as origin_city, " +
      "origin.iata as origin_iata, origin.lat as origin_lat, " +
      "origin.long as origin_long, origin.name as origin_name,  " +
      "dest.city as dest_city, " +
      "dest.country as dest_country, dest.iata as dest_iata, dest.lat as dest_lat, " +
      "dest.long as dest_long, dest.name as dest_name, " +
      "airline.name as airline_name " +
      "FROM omniflight.routes as r " +
      "INNER JOIN (SELECT * from omniflight.airports WHERE city LIKE '%" +
      origin_city +
      "') as origin ON r.originAirportUID = origin.airportUID " +
      "INNER JOIN  (SELECT * from omniflight.airports WHERE city LIKE '%" +
      dest_city +
      "') as dest ON r.destAirportUID = dest.airportUID " +
      "INNER JOIN omniflight.airlines as airline ON r.airlineUID = airline.airlineUID LIMIT 250;",
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

router.post("/getFilterRoutes", (req, res) => {
  const origin_city = req.body.origin_city;
  const origin_country = req.body.origin_country;
  const dest_city = req.body.dest_city;
  const dest_country = req.body.dest_country;
  const airline_name = req.body.airline_name;
  const airplane_type = req.body.airplane_type;

  console.log(req.body);

  db.query(
    "SELECT " +
      "DISTINCT r.routeUID, " +
      "origin.city as origin_city, " +
      "origin.iata as origin_iata, origin.lat as origin_lat, " +
      "origin.long as origin_long, origin.name as origin_name,  " +
      "dest.city as dest_city, " +
      "dest.country as dest_country, dest.iata as dest_iata, dest.lat as dest_lat, " +
      "dest.long as dest_long, dest.name as dest_name, " +
      "airline.name as airline_name, p.name as airplane_name " +
      "FROM omniflight.routes as r " +
      "INNER JOIN omniflight.planesonroutes as pr ON r.routeUID = pr.routeUID " +
      "INNER JOIN (SELECT * from omniflight.planes WHERE name LIKE '%" +
      airplane_type +
      "%') as p ON p.planeUID = pr.planeUID " +
      "INNER JOIN (SELECT * from omniflight.airports WHERE city LIKE '%" +
      origin_city +
      "' AND country LIKE '%" +
      origin_country +
      "') as origin ON r.originAirportUID = origin.airportUID " +
      "INNER JOIN  (SELECT * from omniflight.airports WHERE city LIKE '%" +
      dest_city +
      "' AND country LIKE '%" +
      dest_country +
      "') as dest ON r.destAirportUID = dest.airportUID " +
      "INNER JOIN (SELECT * from omniflight.airlines WHERE name LIKE '%" +
      airline_name +
      "%') as airline ON r.airlineUID = airline.airlineUID LIMIT 250;",
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

router.get("/getCities", (req, res) => {
  db.query(
    "SELECT DISTINCT city as value FROM omniflight.airports ORDER BY value ASC;",
    (err, result) => {
      res.send(result);
    }
  );
});

router.get("/getCountries", (req, res) => {
  db.query(
    "SELECT DISTINCT country as value FROM omniflight.airports ORDER BY value ASC;",
    (err, result) => {
      res.send(result);
    }
  );
});

router.get("/getAirlines", (req, res) => {
  db.query(
    "SELECT DISTINCT name as value FROM omniflight.airlines ORDER BY value ASC;",
    (err, result) => {
      res.send(result);
    }
  );
});

module.exports = router;
