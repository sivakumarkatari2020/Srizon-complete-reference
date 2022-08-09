/*** Query to update the inventory details of a product ***/
UPDATE [dbo].[product_inventory]
SET [quantity] = @quantity
    ,[size-list] = @size_list
    ,[color-list] = @color_list
    ,[modified_at] = @modified_at
WHERE [id] = @id