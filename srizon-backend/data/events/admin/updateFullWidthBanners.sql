
UPDATE [dbo].[home_sliders]
    SET [image_path] = @image_path
        ,[categ_id] = @categ_id
        ,[s_title] = @s_title
        ,[b_title] = @b_title
        ,[new_price] = @new_price
WHERE [id] = @id