
UPDATE [dbo].[track_order]
SET [track_link] = @track_link
    ,[status] = @status
WHERE [id] = @id