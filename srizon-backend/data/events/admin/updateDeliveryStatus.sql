
UPDATE [dbo].[track_order]
SET [status] = @status
    ,[delivered_at] = @delivered_at
WHERE [id] = @id