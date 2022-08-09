/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
    ,[order_id]
    ,[track_link]
    ,[status]
    ,[current_loc]
    ,[past_loc]
    ,[order_at]
    ,[delivered_at]
    ,[is_cancelled]
    ,[cancelled_at]
FROM [dbo].[track_order]
WHERE [id] = @id