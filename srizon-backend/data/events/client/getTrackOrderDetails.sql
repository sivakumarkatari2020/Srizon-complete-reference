/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
FROM [dbo].[track_order]
WHERE [order_id] = @order_id