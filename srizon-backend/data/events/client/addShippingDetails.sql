
INSERT INTO [dbo].[shipping_details]
    ([order_id]
    ,[quantity]
    ,[email]
    ,[mobile]
    ,[country]
    ,[state]
    ,[zip]
    ,[address]
    ,[created_at]
    ,[modified_at])
VALUES (@order_id,@quantity,@email,@mobile,@country,@state,@zip,@address,@created_at,@modified_at)