
UPDATE [dbo].[order_details]
SET [status] = @status
    ,[modified_at] = @modified_at
WHERE [order_id] = @order_id