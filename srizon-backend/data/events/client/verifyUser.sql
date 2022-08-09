/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[email]
    ,[username]
    ,[first_name]
    ,[last_name]
    ,[created_at]
    ,[modified_at]
    ,[session_token]
    ,[status]
FROM [dbo].[user]
WHERE [email]=@usermail and [password]=@password