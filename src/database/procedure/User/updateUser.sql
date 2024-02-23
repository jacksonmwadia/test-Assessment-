/* DROP PROCEDURE dbo.updateUser; */

CREATE PROCEDURE updateUser
    @user_id VARCHAR(50),
    @fname VARCHAR(255),
    @lname VARCHAR(255),
    @CohortNo INT,
    @email VARCHAR(255),
    @phoneNumber VARCHAR(20),
    @gender VARCHAR(10)
AS
BEGIN
    UPDATE users
    SET
        fname = @fname,
        lname = @lname,
        CohortNo = @CohortNo,
        email = @email,
        phoneNumber = @phoneNumber,
        gender = @gender
    WHERE user_id = @user_id;
END;

