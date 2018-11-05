-- makes users table, which represents users of app
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  username varchar(15),
  bio varchar(255)
)