INSERT INTO [dbo].[wish_list]
    ([product_id]
    ,[user_id]
    ,[quantity]
    ,[size]
    ,[color]
    ,[created_at]
    ,[modified_at])
VALUES(@product_id,@user_id,@quantity,@size,@color,@created_at,@modified_at)