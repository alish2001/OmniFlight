<p align="center">
<img src="https://github.com/alish2001/OmniFlight/blob/master/frontend/public/omniflight_logo_black_background.png?raw=true">
</p> 

Direct flights from more than 1000 airlines on an interactive flight map. Search, find, compare, and save any flight path or airline route with our flight maps!

# Data Loading
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
The following 3 features have been implemented and tested: favorites, plane routes, and users login/registration. The implementations can be found as backend api routes powered by `express.js` in the [routes directory of our backend](/backend/routes).
