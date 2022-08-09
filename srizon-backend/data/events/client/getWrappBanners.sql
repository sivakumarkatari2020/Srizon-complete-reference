/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (3) [id]
    ,[image_path]
    ,[s_title]
    ,[b_title]
    ,[desc]
    ,[price]
    ,[size]
FROM [dbo].[banner_wrapp_row]