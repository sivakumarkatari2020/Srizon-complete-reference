
INSERT INTO [dbo].[order_details]
    ([user_id]
    ,[product_id]
    ,[order_id]
    ,[payment_id]
    ,[payment_signature]
    ,[invoice_id]
    ,[total]
    ,[quantity]
    ,[status]
    ,[track_id]
    ,[shipping_id]
    ,[created_at]
    ,[modified_at])
VALUES(@user_id,@product_id,@order_id,null,null,null,@total,@quantity,@status,@track_id,@shipping_id,@created_at,@modified_at)
