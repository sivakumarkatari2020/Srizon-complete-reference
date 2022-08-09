
UPDATE [dbo].[products]
SET [modified_at] = @modified_at
    ,[stars] = ([stars]+@rating)/2
WHERE [id] = @product_id