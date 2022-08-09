/****** Script for SelectTopNRows command from SSMS  ******/
/*** SELECT TOP (1000) [id]
    ,[product_id]
FROM [dbo].[best_sellers] ***/

SELECT TOP (8) [product_id]
FROM [dbo].[order_details]

LEFT JOIN [dbo].[products] products
ON products.id = [dbo].[order_details].product_id
and products.deleted_at = NULL

GROUP BY [product_id]
ORDER BY COUNT([product_id]) DESC