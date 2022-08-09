
UPDATE [dbo].[user]
    SET [session_token] = @session_token
WHERE [email] = @usermail