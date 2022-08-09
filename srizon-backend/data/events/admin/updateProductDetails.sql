/*** Query to update the  ***/
UPDATE [dbo].[products]
    SET [name] = @name
        ,[desc] = @desc
        ,[o_price] = @o_price
        ,[d_price] = @d_price
        ,[category_id] = @category_id
        ,[stars] = @stars
WHERE [id] = @id