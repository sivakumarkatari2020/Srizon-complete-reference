/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (500) [id]
    ,[is_new]
    ,[name]
    ,[inventory_id]
    ,[o_price]
    ,[d_price]
    ,[created_at]
    ,[modified_at]
    ,[deleted_at]
    ,[image_path]
    ,[stars]
FROM [dbo].[products]
ORDER BY [id] DESC