CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    username varchar(50) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password varchar(500) NOT NULL,
    userType smallint
);