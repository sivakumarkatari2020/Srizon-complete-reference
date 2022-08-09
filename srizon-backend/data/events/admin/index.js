'use strict';

const utils = require('../../utils');
const config = require('../../../config');
const sql = require('mssql');

const verifyAdmin = async (usermail,password) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const verifyUser = await pool.request()
                                .input('usermail',sql.VarChar(50),usermail)
                                .input('password',sql.VarChar(50),password)
                                .query(sqlQueries.verifyAdmin);
        console.log(verifyUser);
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
        return error.message;
    }
}

const getUserlist = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request().query(sqlQueries.getUserlist);
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getUserDetails = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('user_id',sql.Int,id)
                        .query(sqlQueries.getUserDetails);
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getProductlist = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request().query(sqlQueries.getProductlist);
        if(data.recordset.length > 0){
            return {status:200,data:data.recordset};
        }else{
            return {status:422,message:'Unable to load the list'};
        }
    } catch (error) {
        return error.message;
    }
}

const deleteUser = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('user_id',sql.Int,id)
                        .query(sqlQueries.deleteUser);
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateInventoryDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,values.I_id)
                        .input('quantity',sql.Int,Number(values.quantity))
                        .input('size_list',sql.VarChar(50),values.size)
                        .input('color_list',sql.VarChar(100),values.color)
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.updateInventoryDetails);
        return data.rowsAffected[0];
    } catch (error) {
        return error.message;
    }
}

const updateProductDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const updateInventory = await updateInventoryDetails(values);
        if(updateInventory !== 1){
            return updateInventory;
        }else{
            const data = await pool.request()
                            .input('id',sql.Int,values.id)
                            .input('name',sql.VarChar(50),values.p_name)
                            .input('desc',sql.Text,values.desc)
                            .input('o_price',sql.Decimal,Number(values.o_price))
                            .input('d_price',sql.Decimal,Number(values.d_price))
                            .input('category_id',sql.Int,Number(values.category))
                            .input('stars',sql.Int,values.stars)
                            //.input('modified_at',sql.VarChar(50),new Date().toISOString())
                            .query(sqlQueries.updateProductDetails);
            return data.rowsAffected[0];
        }
    } catch (error) {
        return error.message;
    }
}

const updateFullWidthBanners = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,values.id)
                        .input('b_title',sql.VarChar(sql.MAX),values.b_title)
                        .input('s_title',sql.VarChar(sql.MAX),values.s_title)
                        .input('new_price',sql.Int,Number(values.new_price))
                        .input('categ_id',sql.Int,Number(values.categ_id))
                        .input('image_path',sql.VarChar(sql.MAX),values.image_path)
                        .query(sqlQueries.updateFullWidthBanners);
        return data.rowsAffected[0];
    } catch (error) {
        return error.message;
    }
}

const updateSmallWidthBanners = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,values.id)
                        .input('b_title',sql.VarChar(sql.MAX),values.b_title)
                        .input('s_title',sql.VarChar(sql.MAX),values.s_title)
                        .input('desc',sql.VarChar(100),values.desc)
                        .input('price',sql.Int,Number(values.price))
                        .input('image_path',sql.VarChar(sql.MAX),values.image_path)
                        .query(sqlQueries.updateSmallWidthBanners);
        return data.rowsAffected[0];
    } catch (error) {
        return error.message;
    }
}

const addNewInventoryDetails = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const prevId = await pool.request().query('SELECT TOP (1) [id] from [dbo].[product_inventory] ORDER BY [id] DESC');
        const data = await pool.request()
                        .input('quantity',sql.Int,Number(values.quantity))
                        .input('size_list',sql.VarChar(50),values.size)
                        .input('color_list',sql.VarChar(100),values.color)
                        .input('created_at',sql.VarChar(50),new Date().toISOString())
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .input('deleted_at',sql.VarChar(50),null)
                        .query(sqlQueries.addNewInventory);
        if(prevId.recordset[0]?.id < data.recordset[0]?.id){
            return data.recordset[0]?.id;
        }else{
            return 0;
        }
    } catch (error) {
        return error.message;
    }
}

const addNewProduct = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const addNewInventory = await addNewInventoryDetails(values);
        if(addNewInventory === 0){
            return addNewInventory;
        }else{
            const data = await pool.request()
                            .input('name',sql.VarChar(50),values.p_name)
                            .input('desc',sql.Text,values.desc)
                            .input('category_id',sql.Int,Number(values.category))
                            .input('inventory_id',sql.Int,addNewInventory)
                            .input('o_price',sql.Decimal,Number(values.o_price))
                            .input('d_price',sql.Decimal,Number(values.d_price))
                            .input('created_at',sql.VarChar(50),new Date().toISOString())
                            .input('deleted_at',sql.VarChar(50),null)
                            .input('image_path',sql.VarChar(sql.MAX),values.imageUrl)
                            .input('stars',sql.Int,5)
                            //.input('modified_at',sql.VarChar(50),new Date().toISOString())
                            .query(sqlQueries.addNewProduct);
            return data.rowsAffected[0];
        }
    } catch (error) {
        return error.message;
    }
}

const addNewCategory = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('category',sql.VarChar(50),values.category)
                        .input('parent_categ',sql.Int,values.parent_categ)
                        .input('created_at',sql.VarChar(50),new Date().toISOString())
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.addNewCategory);
        return data.rowsAffected[0];
    } catch (error) {
        return error.message;
    }
}

const getCategoriesWithID = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                            .input('parent_id',sql.Int,Number(id))
                            .query(sqlQueries.getCategoriesWithID);
        if(data.recordset !== undefined) return data.recordset
        else return [];
    } catch (error) {
        return error.message;
    }
}

const deleteCategory = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,id)
                        .query(sqlQueries.deleteCategory);
        if(data.rowsAffected[0] === 1){
            return {'status':200,'data':'Successfully Deleted!!'};
        }else{
            return {'status':422,'data':'Unable to Deleted!!'};
        }
    } catch (error) {
        return error.message;
    }
}

const deleteInventory = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,id)
                        .query(sqlQueries.deleteInventory);
        if(data.rowsAffected[0] === 1){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return error.message;
    }
}

const deleteProduct = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,id)
                        .query(sqlQueries.deleteProduct);
        if(data.rowsAffected[0] === 1){
            return {'status':200,'data':'Successfully Deleted!!'};
        }else{
            return {'status':502,'data':'Unable to Delete!!'};
        }
    } catch (error) {
        return error.message;
    }
}

const getOrderlist = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request().query(sqlQueries.getOrderlist);
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOrderDetails = async (id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,id)
                        .query(sqlQueries.getOrderDetails);
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateTrackingStatus = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,values.id)
                        .input('status',sql.VarChar(50),values.status)
                        .input('track_link',sql.VarChar(100),values.track_link)
                        .query(sqlQueries.updateTrackingStatus);
        return data.rowsAffected[0];
    } catch (error) {
        return error.message;
    }
}

const updatePayment = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('order_id',sql.VarChar(100),values.order_id)
                        .input('status',sql.VarChar(50),values.status)
                        .input('modified_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.updatePayment);
        return data.rowsAffected[0];
    } catch (error) {
        return error.message;
    }
}

const updateDeliveryStatus = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request()
                        .input('id',sql.Int,values.id)
                        .input('status',sql.VarChar(50),'delivered')
                        .input('delivered_at',sql.VarChar(50),new Date().toISOString())
                        .query(sqlQueries.updateDeliveryStatus);
        return data.rowsAffected[0];
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    verifyAdmin,
    getUserlist,
    getUserDetails,
    getProductlist,
    deleteUser,
    updateProductDetails,
    updateFullWidthBanners,
    updateSmallWidthBanners,
    addNewProduct,
    getCategoriesWithID,
    deleteCategory,
    deleteInventory,
    deleteProduct,
    addNewCategory,

    getOrderlist,
    getOrderDetails,
    updateTrackingStatus,
    updatePayment,
    updateDeliveryStatus
}