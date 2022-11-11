-- User(userid, email, first_name, last_name, password)
CREATE TABLE `users` (
  `userid` INT UNSIGNED PRIMARY KEY,
  `email` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45),
  `last_name` VARCHAR(45),
  `password` VARCHAR(45)
);

-- Airports(airportUID, name, city, country, lat, long, altitude, timezone)
CREATE TABLE `airports` (
  `airportuid` INT UNSIGNED PRIMARY KEY,
  `name` VARCHAR(45),
  `city` VARCHAR(45),
  `country` VARCHAR(45),
  `lat` DECIMAL(45),
  `long` DECIMAL(45),
  `altitude` INT,
  `timezone` VARCHAR(45)
);

-- Airlines(airlineUID, name, country)
CREATE TABLE `airlines` (
  `airlineuid` INT UNSIGNED PRIMARY KEY,
  `name` VARCHAR(45),
  `country` VARCHAR(45)
);

-- Planes(name, planeUID)
CREATE TABLE `planes` (
  `name` VARCHAR(75) NOT NULL,
  `iata` VARCHAR(3),
  `icao` VARCHAR(4),
PRIMARY KEY (`iata`, `icao`));

-- Routes(routeUID, airlineUID, originalairportUID, destairportUID)
CREATE TABLE `routes` (
  `routeUID` INT UNSIGNED PRIMARY KEY,
  `airlineuid` INT UNSIGNED NOT NULL,
  `originairportuid` INT UNSIGNED NOT NULL,
  `destairportuid` INT UNSIGNED NOT NULL,
UNIQUE INDEX `airlineuid_UNIQUE` (`airlineuid` ASC) VISIBLE,
UNIQUE INDEX `originairportuid_UNIQUE` (`originairportuid` ASC) VISIBLE,
UNIQUE INDEX `destairportuid_UNIQUE` (`destairportuid` ASC) VISIBLE,
CONSTRAINT `airlineuid`
  FOREIGN KEY (`airlineuid`)
  REFERENCES `airlines` (`airlineuid`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `originairportuid`
  FOREIGN KEY (`originairportuid`)
  REFERENCES `airports` (`airportuid`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `destairportuid`
  FOREIGN KEY (`destairportuid`)
  REFERENCES `airports` (`airportuid`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);

-- PlaneRoutes(planeUID, routeUID)
CREATE TABLE `planeroutes` (
  `planeUID` VARCHAR(3),
  `routeUID` INT UNSIGNED,
PRIMARY KEY (`planeUID`, `routeUID`),
UNIQUE INDEX `planeUID_UNIQUE` (`planeUID` ASC) VISIBLE,
UNIQUE INDEX `routeUID_UNIQUE` (`routeUID` ASC) VISIBLE,
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

INSERT INTO `users` VALUES (1, 'contact@alish.se', 'Ali', 'Shariatmadari', 'password');

LOAD DATA INFILE "/var/lib/mysql-files/airlines.dat"
INTO TABLE airlines
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/var/lib/mysql-files/airports.dat"
INTO TABLE planes
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE "/var/lib/mysql-files/planesOG.dat"
INTO TABLE planes
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n';
