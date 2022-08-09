
SELECT [id]
    ,[user_id]
    ,[product_id]
    ,[order_id]
    ,[payment_id]
    ,[payment_signature]
    ,[total]
    ,[quantity]
    ,[status]
    ,[track_id]
    ,[shipping_id]
    ,[created_at]
    ,[modified_at]
FROM [dbo].[order_details]
WHERE [user_id] = @user_id
ORDER BY [id] DESC