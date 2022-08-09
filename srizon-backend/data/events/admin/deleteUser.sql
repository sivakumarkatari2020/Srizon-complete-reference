/**** Query to delete user from database ****/
DELETE FROM [dbo].[user]
    WHERE [id] = @user_id