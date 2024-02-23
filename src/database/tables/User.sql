USE  theJitu;
-- Create a database
CREATE DATABASE theJitu


-- Create a Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    fname VARCHAR(50),
    lname VARCHAR(50),
    CohortNo INT,
    email AS (LOWER(fname) + '.' + LOWER(lname) + '@thejitu.com') PERSISTED,
    phoneNumber VARCHAR(20),
    gender VARCHAR(10),
    password VARCHAR(100)
);



SELECT * FROM users;

/* 
ALTER TABLE users ADD password BIT DEFAULT 0

SELECT * FROM users;
UPDATE users SET isDeleted = 0

DROP TABLE users

ALTER TABLE users
ADD isAdmin BIT DEFAULT 0;
 */
/* UPDATE users
SET isAdmin = 0
WHERE isAdmin IS NULL;

UPDATE users
SET isAdmin = 1
WHERE name = 'Jackson Isa';

 */