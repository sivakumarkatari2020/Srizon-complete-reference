/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (50) [id]
    ,[product_id]
    ,[user_id]
    ,[quantity]
	,[size]
	,[color]
    ,[created_at]
    ,[modified_at]
FROM [dbo].[wish_list]
WHERE [user_id] = @user_id