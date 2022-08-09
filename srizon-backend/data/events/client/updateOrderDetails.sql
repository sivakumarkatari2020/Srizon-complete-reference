
UPDATE [dbo].[order_details]
SET  [payment_id] = @payment_id
    ,[payment_signature] = @payment_signature
    ,[status] = @status
    ,[modified_at] = @modified_at
WHERE [order_id] = @order_id