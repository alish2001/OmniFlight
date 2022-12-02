-- R6 Test user registration/login
SELECT * FROM users WHERE email = "contact@alish.se";
SELECT * FROM users WHERE email = "crawling@uwaterloo.ca";
INSERT INTO users (first_name, last_name, email, password) VALUES ("Connor", "Rawlings", "crawling@uwaterloo.ca", "mypass");
SELECT * FROM users WHERE email = "crawling@uwaterloo.ca";

-- R8 Test getting routes by origin and destination cities
SELECT 
r.routeUID,
origin.city as origin_city,
origin.iata as origin_iata, origin.lat as origin_lat,
origin.long as origin_long, origin.name as origin_name, 
dest.city as dest_city, dest.country as dest_country, dest.iata as dest_iata, 
dest.lat as dest_lat, dest.long as dest_long, dest.name as dest_name, 
airline.name as airline_name FROM omniflight.routes as r 
INNER JOIN (SELECT * from omniflight.airports WHERE city LIKE '%Toronto') as origin ON r.originAirportUID = origin.airportUID
INNER JOIN  (SELECT * from omniflight.airports WHERE city LIKE '%Karachi') as dest ON r.destAirportUID = dest.airportUID
INNER JOIN omniflight.airlines as airline ON r.airlineUID = airline.airlineUID;

-- R7 Test Adding a route to favorites
INSERT INTO favoriteroutes (userid, routeUID) VALUES (1,44562);

SELECT f.routeUID AS routeUID, a.name AS airline , air1.country AS origin,
air2.country AS destination, air1.iata AS origin_iata, air2.iata AS destination_iata
FROM favoriteroutes f, routes r, airlines a, airports air1, airports air2 WHERE
f.routeUID = r.routeUID AND f.userid = 1 AND r.airlineUID = a.airlineUID AND
air1.airportUID = r.originAirportUID AND air2.airportUID = r.destairportUID;

-- R10 Test viewing most favorited routes
INSERT INTO favoriteroutes (userid, routeUID) VALUES (2,44562);
SELECT * FROM omniflight.routes WHERE popularity > 1 ORDER BY popularity DESC;

-- R7 Test deleting a route from favorites
DELETE FROM favoriteroutes WHERE userid = 1 AND routeUID = 44562;

SELECT f.routeUID AS routeUID, a.name AS airline , air1.country AS origin,
air2.country AS destination, air1.iata AS origin_iata, air2.iata AS destination_iata
FROM favoriteroutes f, routes r, airlines a, airports air1, airports air2 WHERE
f.routeUID = r.routeUID AND f.userid = ? AND r.airlineUID = a.airlineUID AND
air1.airportUID = r.originAirportUID AND air2.airportUID = r.destairportUID;

-- R9 Test filtering routes by origin and destination countries, airlines, and airplane type
SELECT 
r.routeUID, origin.city as origin_city,
origin.iata as origin_iata, origin.lat as origin_lat, origin.long as origin_long, origin.name as origin_name, 
dest.city as dest_city, dest.country as dest_country, dest.iata as dest_iata, dest.lat as dest_lat,
dest.long as dest_long, dest.name as dest_name, airline.name as airline_name, p.name as airplane_name
FROM omniflight.routes as r
INNER JOIN omniflight.planesonroutes as pr ON r.routeUID = pr.routeUID
INNER JOIN (SELECT * from omniflight.planes WHERE name LIKE '%Boeing%') as p ON p.planeUID = pr.planeUID 
INNER JOIN (SELECT * from omniflight.airports WHERE city LIKE '%Toronto' AND country LIKE '%Canada') as origin ON r.originAirportUID = origin.airportUID 
INNER JOIN  (SELECT * from omniflight.airports WHERE city LIKE '%' AND country LIKE '%Pakistan') as dest ON r.destAirportUID = dest.airportUID
INNER JOIN (SELECT * from omniflight.airlines WHERE name LIKE '%Pakistan International Airlines%') as airline ON r.airlineUID = airline.airlineUID;

-- R11 Test viewing most popular airplanes
SELECT p.planeUID, p.name, planeCount FROM
(SELECT planeUID, COUNT(planeUID) AS planeCount FROM omniflight.planesonroutes GROUP
BY planeUID) as r
INNER JOIN omniflight.planes as p on p.planeUID = r.planeUID
ORDER BY planeCount DESC;

-- R11 Test viewing most popular airlines
SELECT a.airlineUID, name, airlineCount FROM
(SELECT airlineUID, COUNT(airlineUID) AS airlineCount FROM omniflight.routes
GROUP BY airlineUID) as a
INNER JOIN omniflight.airlines as l on a.airlineUID = l.airlineUID
ORDER BY airlineCount DESC;
