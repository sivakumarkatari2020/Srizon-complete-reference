/**** Query to delete category from database ****/
DELETE FROM [dbo].[product_category]
    WHERE [id] = @id