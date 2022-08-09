
UPDATE [dbo].[banner_wrapp_row]
    SET [image_path] = @image_path
        ,[desc] = @desc
        ,[s_title] = @s_title
        ,[b_title] = @b_title
        ,[price] = @price
WHERE [id] = @id