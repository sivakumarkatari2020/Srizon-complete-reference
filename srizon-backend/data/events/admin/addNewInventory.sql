/*** Query to add new product inventory details and return id back ***/
INSERT INTO [dbo].[product_inventory]
    ([quantity]
    ,[size-list]
    ,[color-list]
    ,[created_at]
    ,[modified_at]
    ,[deleted_at])
VALUES(@quantity,@size_list,@color_list,@created_at,@modified_at,@deleted_at)

SELECT TOP (1) [id] from [dbo].[product_inventory] ORDER BY [id] DESC