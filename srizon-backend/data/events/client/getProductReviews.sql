/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[user_id]
    ,[rating]
    ,[review]
    ,[created_at]
FROM [dbo].[product_reviews]
WHERE [product_id] = @product_id
ORDER BY [id] DESC