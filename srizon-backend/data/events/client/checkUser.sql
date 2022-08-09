
SELECT [id]
    ,[email]
    ,[username]
    ,[created_at]
    ,[modified_at]
    ,[session_token]
    ,[status]
FROM [dbo].[user]
WHERE [email] = @email