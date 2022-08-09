/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[quantity]
    ,[size-list]
    ,[color-list]
    ,[created_at]
    ,[modified_at]
    ,[deleted_at]
FROM [dbo].[product_inventory]
WHERE [id] = @inventory_id