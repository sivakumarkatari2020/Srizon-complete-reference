/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[first_name]
    ,[last_name]
    ,[type_id]
    ,[last_login]
    ,[profile_path]
FROM [dbo].[admin_user]
WHERE [username] = @usermail AND [password] = @password