
INSERT INTO [dbo].[product_reviews]
    ([product_id]
    ,[user_id]
    ,[rating]
    ,[review]
    ,[created_at])
VALUES (@product_id,@user_id,@rating,@review,@created_at)