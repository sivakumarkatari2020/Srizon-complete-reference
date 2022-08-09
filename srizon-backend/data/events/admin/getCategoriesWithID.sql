/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
FROM [dbo].[product_category]
WHERE [parent_categ] = @parent_id