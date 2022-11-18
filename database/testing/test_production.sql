-- test user registration/login
SELECT * FROM users WHERE email = "contact@alish.se";
SELECT * FROM users WHERE email = "crawling@uwaterloo.ca"
INSERT INTO users (first_name, last_name, email, password) VALUES ("Connor", "Rawlings", "crawling@uwaterloo.ca", "mypass");
SELECT * FROM users WHERE email = "crawling@uwaterloo.ca";

-- test path finding
SELECT * FROM routes WHERE destAirportUID = 146;


-- Test getting routes by origin and destination cities
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


-- Test filtering routes by origin and destination countries, airlines, and airplane type
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


-- Test getting list of cities, countries, and airlines for filter list

SELECT DISTINCT city as value FROM omniflight.airports ORDER BY value ASC;

SELECT DISTINCT country as value FROM omniflight.airports ORDER BY value ASC;

SELECT DISTINCT name as value FROM omniflight.airlines ORDER BY value ASC;