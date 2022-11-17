var express = require("express");
var router = express.Router();
var db = require("../database");

router.post("/getFilterRoutes", (req, res) => {
  const origin_city = req.body.origin_city;
  const origin_country = req.body.origin_country;
  const dest_city = req.body.dest_city;
  const dest_country = req.body.dest_country;

  console.log(origin_country);
  // const origin_altitude_start = req.body.dest_altitude_start
  //   ? req.body.dest_altitude_start
  //   : 0;
  // const origin_altitude_end = req.body.origin_altitude_end
  //   ? req.body.origin_altitude_end
  //   : 1000000;
  // const dest_altitude_start = req.body.dest_altitude_start
  //   ? req.body.dest_altitude_start
  //   : 0;
  // const dest_altitude_end = req.body.dest_altitude_end
  //   ? req.body.dest_altitude_end
  //   : 1000000;
  const airline_name = req.body.airline_name;

  db.query(
    "SELECT " +
      "r.routeUID, r.stops, " +
      "origin.altitude as origin_altitude, origin.city as origin_city, " +
      "origin.country as origin_country, origin.iata as origin_iata, origin.lat as origin_lat, " +
      "origin.long as origin_long, origin.name as origin_name,  origin.timezone as origin_timezone, " +
      "dest.altitude as dest_altitude, dest.city as dest_city, " +
      "dest.country as dest_country, dest.iata as dest_iata, dest.lat as dest_lat, " +
      "dest.long as dest_long, dest.name as dest_name,  dest.timezone as dest_timezone, " +
      "airline.country as airline_country, airline.name as airline_name " +
      "FROM omniflight.routes as r " +
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
      "%') as airline ON r.airlineUID = airline.airlineUID LIMIT 100;",
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

module.exports = router;
