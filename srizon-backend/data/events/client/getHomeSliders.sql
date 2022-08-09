/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (3) [id]
    ,[image_path]
    ,[categ_id]
    ,[s_title]
    ,[b_title]
    ,[new_price]
FROM [dbo].[home_sliders]