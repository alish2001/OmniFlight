-- test user registration/login
SELECT * FROM users WHERE email = "contact@alish.se"
SELECT * FROM users WHERE email = "crawling@uwaterloo.ca"
INSERT INTO users (first_name, last_name, email, password) VALUES ("Connor", "Rawlings", "crawling@uwaterloo.ca", "mypass")
SELECT * FROM users WHERE email = "crawling@uwaterloo.ca"

-- test path finding
SELECT * FROM routes WHERE destAirportUID = 146
