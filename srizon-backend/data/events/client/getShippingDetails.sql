/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
FROM [dbo].[shipping_details]
WHERE [order_id] = @order_id