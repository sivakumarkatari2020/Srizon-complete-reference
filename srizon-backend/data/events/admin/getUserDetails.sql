/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[email]
    ,[username]
    ,[password]
    ,[first_name]
    ,[last_name]
    ,[created_at]
    ,[modified_at]
    ,[session_token]
    ,[status]
FROM [dbo].[user]
WHERE [id] = @user_id