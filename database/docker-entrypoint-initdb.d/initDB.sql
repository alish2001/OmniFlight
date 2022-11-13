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
  `name` VARCHAR(45),
  `city` VARCHAR(45),
  `country` VARCHAR(45),
  `iata` VARCHAR(3) default NULL,
  `lat` DECIMAL(45) NOT NULL,
  `long` DECIMAL(45) NOT NULL,
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
  `name` VARCHAR(75),
);

-- Routes(routeUID, airlineUID, originairportUID, destairportUID)
CREATE TABLE `routes` (
  `routeUID` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `airlineUID` INT UNSIGNED NOT NULL,
  `originAirportUID` INT UNSIGNED NOT NULL,
  `destAirportUID` INT UNSIGNED NOT NULL,
  `popularity` INT UNSIGNED NOT NULL DEFAULT 0,
CONSTRAINT `airlineUID`
  FOREIGN KEY (`airlineUID`)
  REFERENCES `airlines` (`airlineUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `originairportUID`
  FOREIGN KEY (`originairportUID`)
  REFERENCES `airports` (`airportUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `destairportUID`
  FOREIGN KEY (`destairportUID`)
  REFERENCES `airports` (`airportUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);

-- PlanesOnRoutes(planeUID, routeUID)
CREATE TABLE `PlanesOnRoutes` (
  `planeUID` INT UNSIGNED,
  `routeUID` INT UNSIGNED,
PRIMARY KEY (`planeUID`, `routeUID`),
CONSTRAINT `planeUID`
  FOREIGN KEY (`planeUID`)
  REFERENCES `planes` (`planeUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `routeUID`
  FOREIGN KEY (`routeUID`)
  REFERENCES `routes` (`routeUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);

-- FavoriteRoutes(userid, routeUID)
CREATE TABLE `favoriteroutes` (
  `userid` INT UNSIGNED,
  `routeUID` INT UNSIGNED,
PRIMARY KEY (`userid`, `routeUID`),
CONSTRAINT `userid`
  FOREIGN KEY (`userid`)
  REFERENCES `users` (`userid`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `routeUID`
  FOREIGN KEY (`routeUID`)
  REFERENCES `routes` (`routeUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);

-- Popularity Triggers
CREATE TRIGGER `increment_popularity` AFTER INSERT ON `favoriteroutes`
FOR EACH ROW
BEGIN
  UPDATE `routes` SET `popularity` = `popularity` + 1 WHERE `routeUID` = NEW.`routeUID`;
END;

CREATE TRIGGER `decrement_popularity` AFTER DELETE ON `favoriteroutes`
FOR EACH ROW
BEGIN
  UPDATE `routes` SET `popularity` = `popularity` - 1 WHERE `routeUID` = OLD.`routeUID`;
END;

INSERT INTO `users` VALUES (1, 'contact@alish.se', 'Ali', 'Shariatmadari', 'password');

LOAD DATA INFILE "/data/airlines.dat"
INTO TABLE airlines
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/data/airports.dat"
INTO TABLE airpots
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/data/planes.dat"
INTO TABLE planes
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/data/routes.dat"
INTO TABLE routes
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/data/planesonroutes.dat"
INTO TABLE planesonroutes
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/data/users.dat"
INTO TABLE users
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/data/favoriteroutes.dat"
INTO TABLE favoriteroutes
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';
