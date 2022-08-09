/**** Query to insert new user details into database ****/

INSERT INTO [dbo].[user]
(   [email]
    ,[username]
    ,[password]
    ,[first_name]
    ,[last_name]
    ,[created_at]
    ,[modified_at]
    ,[session_token]
    ,[status]
)
VALUES
    (@email,@username,@password,@first_name,@last_name,@created_at,@modified_at,null,1)