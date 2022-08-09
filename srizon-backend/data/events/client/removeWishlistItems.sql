/**** query to delete an item from wishlist ****/

DELETE FROM [dbo].[wish_list]
WHERE [user_id]=@user_id