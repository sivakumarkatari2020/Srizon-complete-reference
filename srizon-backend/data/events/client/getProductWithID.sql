/**** Getting product details with product id ****/
SELECT [id]
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
WHERE [id] = @product_id

