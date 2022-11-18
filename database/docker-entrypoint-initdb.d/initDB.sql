-- User(userid, email, first_name, last_name, password)
CREATE TABLE `users` (
  `userid` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45),
  `last_name` VARCHAR(45),
  `password` VARCHAR(255)
);
-- Airports(airportUID, name, city, country, iata, lat, long, altitude, timezone)
CREATE TABLE `airports` (
  `airportUID` INT UNSIGNED PRIMARY KEY,
  `name` VARCHAR(70),
  `city` VARCHAR(45),
  `country` VARCHAR(45),
  `iata` VARCHAR(3) default NULL,
  `lat` DECIMAL(21, 18) NOT NULL,
  `long` DECIMAL(21, 18) NOT NULL,
  `altitude` INT(11) default NULL,
  `timezone` VARCHAR(45)
);
-- Airlines(airlineUID, name, country)
CREATE TABLE `airlines` (
  `airlineUID` INT UNSIGNED PRIMARY KEY,
  `name` VARCHAR(45),
  `country` VARCHAR(45)
);
-- Planes(planeUID, name)
CREATE TABLE `planes` (
  `planeUID` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(75)
);
-- Routes(routeUID, airlineUID, originairportUID, destairportUID, codeshare, stops, popularity)
CREATE TABLE `routes` (
  `routeUID` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `airlineUID` INT UNSIGNED NOT NULL,
  `originAirportUID` INT UNSIGNED NOT NULL,
  `destAirportUID` INT UNSIGNED NOT NULL,
  `codeshare` VARCHAR(1) DEFAULT 'N',
  `stops` INT DEFAULT 0,
  `popularity` INT UNSIGNED NOT NULL DEFAULT 0,
  FOREIGN KEY (`airlineUID`) REFERENCES `airlines` (`airlineUID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`originairportUID`) REFERENCES `airports` (`airportUID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`destairportUID`) REFERENCES `airports` (`airportUID`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- PlanesOnRoutes(planeUID, routeUID)
CREATE TABLE `planesonroutes` (
  `planeUID` INT UNSIGNED,
  `routeUID` INT UNSIGNED,
  PRIMARY KEY (`planeUID`, `routeUID`),
  FOREIGN KEY (`planeUID`) REFERENCES `planes` (`planeUID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`routeUID`) REFERENCES `routes` (`routeUID`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- FavoriteRoutes(userid, routeUID)
CREATE TABLE `favoriteroutes` (
  `userid` INT UNSIGNED,
  `routeUID` INT UNSIGNED,
  PRIMARY KEY (`userid`, `routeUID`),
  FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`routeUID`) REFERENCES `routes` (`routeUID`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Popularity Triggers
CREATE TRIGGER `increment_popularity`
AFTER
INSERT ON `favoriteroutes` FOR EACH ROW
UPDATE `routes`
SET `popularity` = `popularity` + 1
WHERE `routeUID` = NEW.`routeUID`;
CREATE TRIGGER `decrement_popularity`
AFTER DELETE ON `favoriteroutes` FOR EACH ROW
UPDATE `routes`
SET `popularity` = `popularity` - 1
WHERE `routeUID` = OLD.`routeUID`;
INSERT INTO `users`
VALUES (
    1,
    'contact@alish.se',
    'Ali',
    'Shariatmadari',
    'password'
  );
LOAD DATA INFILE "/var/lib/mysql-files/airports.dat" INTO TABLE airports FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';
LOAD DATA INFILE "/var/lib/mysql-files/airlines.dat" INTO TABLE airlines FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' (airlineUID, name, country);
LOAD DATA INFILE "/var/lib/mysql-files/routes.dat" INTO TABLE routes FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' (
  airlineUID,
  originAirportUID,
  destAirportUID,
  codeshare,
  stops
);
LOAD DATA INFILE "/var/lib/mysql-files/planes.dat" INTO TABLE planes COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' (name);
LOAD DATA INFILE "/var/lib/mysql-files/planesonroutes.dat" INTO TABLE planesonroutes COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';
LOAD DATA INFILE "/var/lib/mysql-files/users.dat" INTO TABLE users COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';
LOAD DATA INFILE "/var/lib/mysql-files/favoriteroutes.dat" INTO TABLE favoriteroutes COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';