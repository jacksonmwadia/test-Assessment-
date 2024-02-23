
/* DROP PROCEDURE dbo.getOneUser; */


CREATE PROCEDURE getOneUser
    @user_id VARCHAR(200)
AS
BEGIN
    SELECT * FROM users WHERE user_id = @user_id;
END;


use theJitu