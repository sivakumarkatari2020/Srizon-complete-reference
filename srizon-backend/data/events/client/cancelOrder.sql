
UPDATE [dbo].[track_order]
SET [status] = @status
    ,[is_cancelled] = @is_cancelled
    ,[cancelled_at] = @cancelled_at
WHERE [order_id] = @order_id AND [id] = @id