/**** query to delete an item from wishlist ****/

DELETE FROM [dbo].[shopping_cart]
WHERE [user_id]=@user_id