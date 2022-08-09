/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
    ,[quantity]
    ,[size]
    ,[color]
    ,[version]
    ,[created_at]
    ,[modified_at]
FROM [dbo].[item_details]
WHERE [id] = @details_id