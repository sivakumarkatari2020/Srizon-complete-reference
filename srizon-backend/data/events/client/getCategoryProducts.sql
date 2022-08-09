/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (50) [id]
    ,[is_new]
    ,[name]
    ,[desc]
    ,[SKU]
    ,[category_id]
    ,[inventory_id]
    ,[o_price]
    ,[d_price]
    ,[discount_id]
    ,[created_at]
    ,[modified_at]
    ,[deleted_at]
    ,[image_path]
    ,[stars]
FROM [dbo].[products]
WHERE [category_id] = @category_id
ORDER BY [id] DESC