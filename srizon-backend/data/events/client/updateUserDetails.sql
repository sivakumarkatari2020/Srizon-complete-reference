
UPDATE [dbo].[user]
SET [username] = @username
    ,[first_name] = @first_name
    ,[last_name] = @last_name
    ,[modified_at] = @modified_at
WHERE [id] = @id