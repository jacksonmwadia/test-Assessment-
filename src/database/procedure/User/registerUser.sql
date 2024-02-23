use theJitu
CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(200),
    @fname VARCHAR(50),
    @lname VARCHAR(50),
    @CohortNo INT,
    @email VARCHAR(100),
    @phoneNumber VARCHAR(20),
    @gender VARCHAR(10),
    @password VARCHAR(100)
)
AS
BEGIN
    INSERT INTO users (user_id, fname, lname, CohortNo, phoneNumber, gender, password)
    VALUES (@user_id, @fname, @lname, @CohortNo, @phoneNumber, @gender, @password);
END;


SELECT * FROM users
