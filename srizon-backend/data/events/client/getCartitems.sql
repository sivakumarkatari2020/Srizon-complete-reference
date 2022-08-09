/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
    ,[product_id]
    ,[user_id]
    ,[details_id]
    ,[created_at]
    ,[modified_at]
FROM [dbo].[shopping_cart]
where [user_id] = @user_id