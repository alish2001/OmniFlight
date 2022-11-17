var express = require("express");
var router = express.Router();
var db = require("../database");

// router.get("/test", (req, res) => {
//     db.query("SELECT * FROM favoriteroutes", 
//     (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.send({ err: err });
//         }
//         console.log(result);
//         return res.send(result);
//     });
// });

router.post("/", (req, res) => {
    const userid = req.body.userid;

    db.query("SELECT f.routeUID AS routeUID, a.name AS airline , air1.country AS origin, air2.country AS destination, " + 
             "air1.iata AS origin_iata, air2.iata AS destination_iata " +
            "FROM favoriteroutes f, routes r, airlines a, airports air1, airports air2 " + 
            "WHERE f.routeUID = r.routeUID AND f.userid = ? AND r.airlineUID = a.airlineUID " +
            "AND air1.airportUID = r.originAirportUID AND air2.airportUID = r.destairportUID", [userid], 
    (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ err: err });
        }
        return res.send(result);
    });
});

router.post("/add", (req, res) => {
    const { userid, routeUID } = req.body;
    console.log(req.body)
    db.query("INSERT INTO favoriteroutes (userid, routeUID) VALUES (?,?)", [userid, routeUID], 
    (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ err: err });
        }
        return res.send(result);
    });
});

router.post("/remove", (req, res) => {
    const { userid, routeUID } = req.body;
    console.log(req.body);
    db.query("DELETE FROM favoriteroutes WHERE userid = ? AND routeUID = ?", [userid, routeUID], 
    (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ err: err });
        }
        return res.send(result);
    });
});

module.exports = router;
