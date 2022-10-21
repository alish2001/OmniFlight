-- User(userid, email, first_name, last_name, password)
CREATE TABLE `omniflight`.`users` (
  `userid` INT UNSIGNED NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
PRIMARY KEY (`userid`),
UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

-- Airports(airportUID, name, city, country, lat, long, altitude, timezone)
CREATE TABLE `omniflight`.`airports` (
  `airportuid` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `lat` DECIMAL(45) NULL,
  `long` DECIMAL(45) NULL,
  `altitude` INT NULL,
  `timezone` VARCHAR(45) NULL,
PRIMARY KEY (`airportuid`),
UNIQUE INDEX `airportUID_UNIQUE` (`airportuid` ASC) VISIBLE);

-- Airlines(airlineUID, name, country)
CREATE TABLE `omniflight`.`airlines` (
  `airlineuid` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
PRIMARY KEY (`airlineuid`),
UNIQUE INDEX `airlineuid_UNIQUE` (`airlineuid` ASC) VISIBLE);

-- Planes(name, planeUID)
CREATE TABLE `omniflight`.`planes` (
  `name` VARCHAR(45) NOT NULL,
  `planeUID` VARCHAR(3) NOT NULL,
PRIMARY KEY (`planeUID`),
UNIQUE INDEX `iata_UNIQUE` (`planeUID` ASC) VISIBLE);

-- Routes(routeUID, airlineUID, originalairportUID, destairportUID)
CREATE TABLE `omniflight`.`routes` (
  `routeUID` INT UNSIGNED NOT NULL,
  `airlineuid` INT UNSIGNED NOT NULL,
  `originairportuid` INT UNSIGNED NOT NULL,
  `destairportuid` INT UNSIGNED NOT NULL,
PRIMARY KEY (`routeUID`),
UNIQUE INDEX `routeUID_UNIQUE` (`routeUID` ASC) VISIBLE,
UNIQUE INDEX `airlineuid_UNIQUE` (`airlineuid` ASC) VISIBLE,
UNIQUE INDEX `originairportuid_UNIQUE` (`originairportuid` ASC) VISIBLE,
UNIQUE INDEX `destairportuid_UNIQUE` (`destairportuid` ASC) VISIBLE,
CONSTRAINT `airlineuid`
  FOREIGN KEY (`airlineuid`)
  REFERENCES `omniflight`.`airlines` (`airlineuid`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `originairportuid`
  FOREIGN KEY (`originairportuid`)
  REFERENCES `omniflight`.`airports` (`airportuid`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `destairportuid`
  FOREIGN KEY (`destairportuid`)
  REFERENCES `omniflight`.`airports` (`airportuid`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);

-- PlaneRoutes(planeUID, routeUID)
CREATE TABLE `omniflight`.`planeroutes` (
  `planeUID` VARCHAR(3) NOT NULL,
  `routeUID` INT UNSIGNED NOT NULL,
PRIMARY KEY (`planeUID`, `routeUID`),
UNIQUE INDEX `planeUID_UNIQUE` (`planeUID` ASC) VISIBLE,
UNIQUE INDEX `routeUID_UNIQUE` (`routeUID` ASC) VISIBLE,
CONSTRAINT `planeUID`
  FOREIGN KEY (`planeUID`)
  REFERENCES `omniflight`.`planes` (`planeUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT `routeUID`
  FOREIGN KEY (`routeUID`)
  REFERENCES `omniflight`.`routes` (`routeUID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);


