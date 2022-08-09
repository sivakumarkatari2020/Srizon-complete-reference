
INSERT INTO [dbo].[track_order]
    ([order_id]
    ,[track_link]
    ,[status]
    ,[current_loc]
    ,[past_loc]
    ,[order_at]
    ,[delivered_at]
    ,[is_cancelled]
    ,[cancelled_at])
VALUES (@order_id,null,@status,null,null,@order_at,null,null,null)