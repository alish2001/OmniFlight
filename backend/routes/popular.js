const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
    db.query(
        "SELECT " +
        "r.routeUID, r.popularity, " +
        "origin.city as origin_city, " +
        "origin.iata as origin_iata, origin.lat as origin_lat, " +
        "origin.long as origin_long, origin.name as origin_name, " +
        "dest.city as dest_city, dest.country as dest_country, dest.iata as dest_iata, " +
        "dest.lat as dest_lat, dest.long as dest_long, dest.name as dest_name, " +
        "airline.name as airline_name FROM omniflight.routes as r " + 
        "INNER JOIN omniflight.airports as origin ON r.originAirportUID = origin.airportUID " +
        "INNER JOIN omniflight.airports as dest ON r.destAirportUID = dest.airportUID " +
        "INNER JOIN omniflight.airlines as airline ON r.airlineUID = airline.airlineUID WHERE popularity >= 1 ORDER BY popularity DESC;", 
    (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ err: err });
        }
        return res.send(result);
    });
});

module.exports = router;
