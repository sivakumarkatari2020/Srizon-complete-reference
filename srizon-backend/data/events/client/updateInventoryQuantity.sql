/*** Query to update the inventory details of a product ***/
UPDATE [dbo].[product_inventory]
SET [quantity] = @quantity
WHERE [id] = @id