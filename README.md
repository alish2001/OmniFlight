# OmniFlight

The sickest flight route explorer on the block.

# Data loading
The database will initialize tables and load data from the [data directory](/database/data) upon the creation of the docker volume aka first start.
If you want to run this auto-creation again, delete your docker volume and restart the docker-compose.

# Usage

```shell
git clone https://github.com/alish2001/OmniFlight.git
cd OmniFlight/
docker-compose up --build
```

The app should now be available on `localhost:3000`

# Implemented features
The following 3 features have been implemented and tested: favorites, plane routes, and users login/registration. The implementations can be found in the corresponding files in the [feature implementation directory](/backend/routes).