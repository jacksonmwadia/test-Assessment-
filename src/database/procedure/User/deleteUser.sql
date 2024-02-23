
DROP PROCEDURE dbo.deleteUser;

CREATE PROCEDURE deleteUser
    @user_id VARCHAR(50)
AS
BEGIN
    DELETE FROM Users WHERE user_id = @user_id;
END;


use theJitu