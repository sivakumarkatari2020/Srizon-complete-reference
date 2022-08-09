'use strict';

const utils = require('../../utils');
const config = require('../../../config');
const sql = require('mssql');

const verifyUser = async (usermail,password) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const verifyUser = await pool.request()
                                .input('usermail',sql.VarChar(50),usermail)
                                .input('password',sql.VarChar(50),password)
                                .query(sqlQueries.verifyUser);
        if(verifyUser?.recordset?.length > 0){
            return {
                status: 200,
                data: verifyUser.recordset,
            }
        }
        else{
            return {status: 422,message: 'This user does not exist, Please contact Admin'}
        }
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const updateSessionToken = async (token,usermail) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const updateSessionToken = await pool.request()
                                .input('usermail',sql.VarChar(50),usermail)
                                .input('session_token',sql.VarChar(100),token)
                                .query(sqlQueries.updateSessionToken);
        return updateSessionToken;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const checkUser = async (email) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const checkUser = await pool.request()
                                .input('email',sql.VarChar(50),email)
                                .query(sqlQueries.checkUser);
        return checkUser;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const registerUser = async (email,username,password) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const registerUser = await pool.request()
                                .input('email',sql.VarChar(50),email)
                                .input('username',sql.VarChar(50),username)
                                .input('password',sql.VarChar(50),password)
                                .input('first_name',sql.VarChar(50),'')
                                .input('last_name',sql.VarChar(50),'')
                                .input('created_at',sql.VarChar(50),new Date().toISOString())
                                .input('modified_at',sql.VarChar(50),new Date().toISOString())
                                .query(sqlQueries.registerUser);
        if(registerUser.rowsAffected[0] == 1){
            return {
                status: 200,
                message: "Registered Successfully!",
            }
        }
        else{
            return {status: 422,message: 'We are experiencing a problem while processing your request, Please try again later!'}
        }
    } catch (error) {
        console.log(error);
        return {status:422,message:error.message};
    }
}

const getHomeSliders = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request().query(sqlQueries.getHomeSliders);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getDealsOfTheDay = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request().query(sqlQueries.getDealsOfTheDay);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getProductWithID = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('product_id',sql.Int,id)
                        .query(sqlQueries.getProductWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getCategoryWithID = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('category_id',sql.Int,id)
                        .query(sqlQueries.getCategoryWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getInventoryWithID = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('inventory_id',sql.Int,id)
                        .query(sqlQueries.getInventoryWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getUserDetailsWithID = async (user_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,user_id)
                        .query(sqlQueries.getUserDetailsWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getWrappBanners = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request().query(sqlQueries.getWrappBanners);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getBestSellers = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request().query(sqlQueries.getBestSellers);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getWishList = async (user_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,user_id)
                        .query(sqlQueries.getWishList);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getCartitems = async (user_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,user_id)
                        .query(sqlQueries.getCartitems);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getCartitemDetailsWithID = async (details_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('details_id',sql.Int,details_id)
                        .query(sqlQueries.getCartitemDetailsWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getCategoryProducts = async (category_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('category_id',sql.Int,category_id)
                        .query(sqlQueries.getCategoryProducts);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getCategoryList = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request().query(sqlQueries.getCategoryList);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getProductReviews = async (product_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('product_id',sql.Int,product_id)
                        .query(sqlQueries.getProductReviews);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getLatest10Products = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request().query(sqlQueries.getLatest10Products);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getTopRated10Products = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request().query(sqlQueries.getTopRated10Products);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getSearchList = async (key) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('key',sql.VarChar(200),`%${key}%`)
                        .query(sqlQueries.getSearchList);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

//post routes
const addWishlistItem = async (params) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const addWishlistItem = await pool.request()
                                    .input('product_id',sql.Int,params.product_id)
                                    .input('user_id',sql.Int,params.user_id)
                                    .input('quantity',sql.Int,params.quantity)
                                    .input('size',sql.VarChar(50),'XL')
                                    .input('color',sql.VarChar(50),'Black')
                                    .input('created_at',sql.VarChar(50),new Date().toISOString())
                                    .input('modified_at',sql.VarChar(50),new Date().toISOString())
                                    .query(sqlQueries.addWishlistItem);
        if(addWishlistItem.rowsAffected[0] === 1){
            return {
                status : 200,
                data : addWishlistItem.recordset,
            }
        }else{
            return {status:422,message: `Operation failed!!`}
        }
    } catch (error){
        return {status:422,message:error.message};
    }
}

const addCartitem = async (params) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const addCartitem = await pool.request()
                                    .input('product_id',sql.Int,params.product_id)
                                    .input('user_id',sql.Int,params.user_id)
                                    .input('details_id',sql.Int,1)
                                    .input('created_at',sql.VarChar(50),new Date().toISOString())
                                    .input('modified_at',sql.VarChar(50),new Date().toISOString())
                                    .query(sqlQueries.addCartitem);
        console.log(addCartitem);
        if(addCartitem.rowsAffected[0] === 1){
            return {
                status : 200,
                message : 'Item added to your cart!!',
            }
        }else{
            return {status:422,message: `Error while adding to cart, try again later!!`}
        }
    } catch (error){
        return {status:422,message:error.message};
    }
}

const updateInventoryQuantity = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('id',sql.Int,values.id)
                        .input('quantity',sql.Int,values.quantity)
                        .query(sqlQueries.updateInventoryQuantity);
        if(data.rowsAffected[0] === 1){
            return 1;
        }else{
            return 0;
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const getShippingDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .query(sqlQueries.getShippingDetails);
        return data;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getShippingDetailsWithID = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('id',sql.Int,id)
                        .query(sqlQueries.getShippingDetailsWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getOrderDetails = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),id)
                        .query(sqlQueries.getOrderDetails);
        return data;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getOrdersWithID = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,id)
                        .query(sqlQueries.getOrdersWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const addShippingDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .input('quantity',sql.Int,values.quantity)
                        .input('email',sql.VarChar(50),values.email)
                        .input('mobile',sql.VarChar(50),values.mobile)
                        .input('country',sql.VarChar(50),values.country)
                        .input('state',sql.VarChar(50),values.state)
                        .input('zip',sql.VarChar(50),values.zip)
                        .input('address',sql.VarChar(100),values.address)
                        .input('created_at',sql.VarChar(50),new Date().toISOString())
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.addShippingDetails);
        if(data.rowsAffected[0] === 1){
            const id = await getShippingDetails({'order_id':values.order_id,'email':values.email});
            if(id.recordset.length > 0){
                return id.recordset[0].id;
            }else{
                return 0;
            }
        }else{
            return 0;
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const getTrackOrderDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .query(sqlQueries.getTrackOrderDetails);
        return data;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const getTrackingDetailsWithID = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('id',sql.Int,id)
                        .query(sqlQueries.getTrackingDetailsWithID);
        return data.recordset;
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const addTrackOrderDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .input('status',sql.VarChar(50),values.status)
                        .input('order_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.addTrackOrderDetails);
        if(data.rowsAffected[0] === 1){
            const id = await getTrackOrderDetails({'order_id':values.order_id});
            if(id.recordset.length > 0){
                return id.recordset[0].id;
            }else{
                return 0;
            }
        }else{
            return 0;
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const addOrderDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,values.user_id)
                        .input('product_id',sql.Int,values.product_id)
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .input('total',sql.Int,values.total)
                        .input('quantity',sql.Int,values.quantity)
                        .input('status',sql.VarChar(50),values.status)
                        .input('track_id',sql.Int,values.track_id)
                        .input('shipping_id',sql.Int,values.shipping_id)
                        .input('created_at',sql.VarChar(50),new Date().toISOString())
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.addOrderDetails);
        if(data.rowsAffected[0] === 1){
            return 1;
        }else{
            return 0;
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const updateOrderDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .input('payment_id',sql.VarChar(100),values.payment_id)
                        .input('payment_signature',sql.VarChar(200),values.payment_signature)
                        .input('status',sql.VarChar(50),'Payment Done')
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.updateOrderDetails);
        if(data.rowsAffected[0] === 1){
            return 1;
        }else{
            return 0;
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const updatePaymentStatus = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),id)
                        .input('status',sql.VarChar(50),'Refund Processing')
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.updatePaymentStatus);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:'Payment status updated!!'};
        }else{
            return {status:422,message:'Unable to update payment status!!'};
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const cancelOrder = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .input('id',sql.Int,Number(values.track_id))
                        .input('status',sql.VarChar(50),'cancelled')
                        .input('is_cancelled',sql.Int,1)
                        .input('cancelled_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.cancelOrder);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:'Cancelled order Successfully!!'};
        }else{
            return {status:422,message:'Unable to cancel your order,try again later!!'};
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const restoreQuantity = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const inventoryDetails = await getInventoryWithID(values.inventory_id);
        if(inventoryDetails.length > 0){
            const data = await pool.request()
                            .input('inventory_id',sql.Int,values.inventory_id)
                            .input('quantity',sql.Int,Number(inventoryDetails[0].quantity) + Number(values.units))
                            .query(sqlQueries.restoreQuantity);
            if(data.rowsAffected[0] === 1){
                return {status:200,message:'Successfully updated quantity!!'};
            }else{
                return {status:422,message:'Unable to updated the product quantity!!'};
            }           
        }else{
            return {status:422,message:'Unable to updated the product quantity!!'};
        }
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const updateUserDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('id',sql.Int,values.id)
                        .input('username',sql.VarChar(50),values.username)
                        .input('first_name',sql.VarChar(50),values.first_name)
                        .input('last_name',sql.VarChar(50),values.last_name)
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                .query(sqlQueries.updateUserDetails);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:'Successfully updated profile!!'};
        }else{
            return {status:422,message:'Unable to updated the profile!!'};
        }           
    } catch(error) {
        return {status:422,message:error.message};
    }
}

const saveReview = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('product_id',sql.Int,values.product_id)
                        .input('user_id',sql.Int,values.user_id)
                        .input('rating',sql.Int,values.rating)
                        .input('review',sql.VarChar(sql.MAX),values.review)
                        .input('created_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.saveReview);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:"Thanks for your review!!"}
        }else{
            return {status:422,message:"There's an error while saving your reviw, please try again later!!"}
        }
    } catch (error) {
        return {status:422,message:error.message}
    }
}

const updateRating = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('product_id',sql.Int,values.product_id)
                        .input('rating',sql.Int,values.rating)
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.updateRating);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:"Rating Updated!!"}
        }else{
            return {status:422,message:"Unable to update rating!!"}
        }
    } catch (error) {
        return {status:422,message:error.message}
    }
}

//delete routes
const removeWishlistItem = async (user_id,wishlist_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,user_id)
                        .input('id',sql.Int,wishlist_id)
                        .query(sqlQueries.removeWishlistItem);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:"Succesfully removed from wishlist"}
        }else{
            return {status:200,message:"There's an error while removing item from wishlist,try again later!"}
        }
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const removeWishlistItems = async (user_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,user_id)
                        .query(sqlQueries.removeWishlistItems);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:"Succesfully removed all the elements from wishlist"}
        }else{
            return {status:200,message:"There's an error while removing items from wishlist,try again later!"}
        }
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const removeCartlistItem = async (user_id,cartitem_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,user_id)
                        .input('id',sql.Int,cartitem_id)
                        .query(sqlQueries.removeCartlistItem);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:"Succesfully removed from cart"}
        }else{
            return {status:200,message:"There's an error while removing item from cart,try again later!"}
        }
    } catch (error) {
        return {status:422,message:error.message};
    }
}

const removeCartlistItems = async (user_id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
                        .input('user_id',sql.Int,user_id)
                        .query(sqlQueries.removeCartlistItems);
        if(data.rowsAffected[0] === 1){
            return {status:200,message:"Succesfully removed all the elements from cart"}
        }else{
            return {status:200,message:"There's an error while removing items from cart,try again later!"}
        }
    } catch (error) {
        return {status:422,message:error.message};
    }
}

module.exports = {
    //get Routes
    getHomeSliders,
    getDealsOfTheDay,
    getProductWithID,
    getCategoryWithID,
    getInventoryWithID,
    getUserDetailsWithID,
    getWrappBanners,
    getBestSellers,
    getWishList,
    getCartitems,
    getCartitemDetailsWithID,
    getCategoryProducts,
    getCategoryList,
    getProductReviews,
    getLatest10Products,
    getTopRated10Products,
    getSearchList,

    //post Routes
    verifyUser,
    updateSessionToken,
    checkUser,
    registerUser,
    addWishlistItem,
    addCartitem,
    updateInventoryQuantity,
    addShippingDetails,
    addTrackOrderDetails,
    addOrderDetails,
    updatePaymentStatus,
    cancelOrder,
    restoreQuantity,
    updateOrderDetails,
    updateUserDetails,
    saveReview,
    updateRating,

    getOrderDetails,
    getOrdersWithID,
    getShippingDetails,
    getShippingDetailsWithID,
    getTrackOrderDetails,
    getTrackingDetailsWithID,

    //delete Routes
    removeWishlistItem,
    removeWishlistItems,
    removeCartlistItem,
    removeCartlistItems
}