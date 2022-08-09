
UPDATE [dbo].[product_inventory]
    SET [quantity] = @quantity
WHERE [id] = @inventory_id