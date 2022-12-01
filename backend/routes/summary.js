const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/plane", (req, res) => {
    const routeUID = req.body.routeUID;

    db.query(
        "SELECT p.planeUID, p.name, planeCount FROM " +
        "(SELECT planeUID, COUNT(planeUID) AS planeCount FROM planesonroutes GROUP BY planeUID) as r " +
        "INNER JOIN omniflight.planes as p on p.planeUID = r.planeUID " +
        "ORDER BY planeCount DESC LIMIT 10;", 
    (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ err: err });
        }
        return res.send(result);
    });
});

router.post("/airline", (req, res) => {
    const routeUID = req.body.routeUID;

    db.query(
        "SELECT a.airlineUID, name, airlineCount FROM " +
        "(SELECT airlineUID, COUNT(airlineUID) AS airlineCount FROM routes GROUP BY airlineUID) as a " +
        "INNER JOIN omniflight.airlines as l on a.airlineUID = l.airlineUID " +
        "ORDER BY airlineCount DESC LIMIT 10;", 
    (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ err: err });
        }
        return res.send(result);
    });
});

module.exports = router;
