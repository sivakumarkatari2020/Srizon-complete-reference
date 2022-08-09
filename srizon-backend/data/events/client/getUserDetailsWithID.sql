/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[email]
    ,[username]
    ,[first_name]
    ,[last_name]
    ,[created_at]
FROM [dbo].[user]
WHERE [id] = @user_id