INSERT INTO [dbo].[shopping_cart]
    ([product_id]
    ,[user_id]
    ,[details_id]
    ,[created_at]
    ,[modified_at])
VALUES
    (@product_id,@user_id,@details_id,@created_at,@modified_at)
