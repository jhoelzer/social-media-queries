CREATE TABLE IF NOT EXISTS posts (
    id serial PRIMARY KEY,
    title varchar(50),
    body varchar(500),
    -- getting users primary and makes it foreign; the foreign key part might be optional 
    user_id INTEGER REFERENCES users(id)
)