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
  UNIQUE INDEX `AirportUID_UNIQUE` (`airportuid` ASC) VISIBLE);
  
  CREATE TABLE `omniflight`.`airlines` (
  `airlineuid` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  PRIMARY KEY (`airlineuid`),
  UNIQUE INDEX `airlineuid_UNIQUE` (`airlineuid` ASC) VISIBLE);

CREATE TABLE `omniflight`.`planes` (
  `name` VARCHAR(45) NOT NULL,
  `planeUID` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`name`, `planeUID`),
  UNIQUE INDEX `iata_UNIQUE` (`planeUID` ASC) VISIBLE);

  CREATE TABLE `omniflight`.`routes` (
  `routeUID` INT UNSIGNED NOT NULL,
  `airlineuid` INT UNSIGNED NOT NULL,
  `originairportuid` INT UNSIGNED NOT NULL,
  `destairportuid` INT UNSIGNED NOT NULL,
  `planeuid` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`routeUID`),
  UNIQUE INDEX `routeUID_UNIQUE` (`routeUID` ASC) VISIBLE,
  UNIQUE INDEX `airlineuid_UNIQUE` (`airlineuid` ASC) VISIBLE,
  UNIQUE INDEX `originairportuid_UNIQUE` (`originairportuid` ASC) VISIBLE,
  UNIQUE INDEX `destairportuid_UNIQUE` (`destairportuid` ASC) VISIBLE,
  UNIQUE INDEX `planeuid_UNIQUE` (`planeuid` ASC) VISIBLE,
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
    ON UPDATE CASCADE,
  CONSTRAINT `planeuid`
    FOREIGN KEY (`planeuid`)
    REFERENCES `omniflight`.`planes` (`planeUID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);