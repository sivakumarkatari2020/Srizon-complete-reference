
INSERT INTO [dbo].[product_category]
    ([category]
    ,[parent_categ]
    ,[created_at]
    ,[modified_at])
VALUES (@category,@parent_categ,@created_at,@modified_at)