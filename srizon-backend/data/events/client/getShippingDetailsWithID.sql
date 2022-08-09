/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[order_id]
    ,[quantity]
    ,[email]
    ,[mobile]
    ,[country]
    ,[state]
    ,[zip]
    ,[address]
    ,[created_at]
    ,[modified_at]
FROM [dbo].[shipping_details]
WHERE [id] = @id