const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const config = require('./config');
const logger = require('./middleware/logger');

const getHomeSlidersRoute = require('./routes/client/getHomeSlidersRoute');
const getDealsOfTheDayRoute = require('./routes/client/getDealsOfTheDayRoute');
const getWrappBannersRoute = require('./routes/client/getWrappBannersRoute');
const getBestSellersRoute = require('./routes/client/getBestSellersRoute');
const getWishListRoute = require('./routes/client/getWishListRoute');
const verifyUserRoute = require('./routes/client/verifyUserRoute');
const removeWishlistItemRoute = require('./routes/client/removeWishlistItemRoute');
const getCartitemsRoute = require('./routes/client/getCartitemsRoute');
const registerUserRoute = require('./routes/client/registerUserRoute');
const getCategoryProductsRoute = require('./routes/client/getCategoryProductsRoute');
const getCategoryListRoute = require('./routes/client/getCategoryListRoute');
const getProductDetailsRoute = require('./routes/client/getProductDetailsRoute');
const getProductReviewsRoute = require('./routes/client/getProductReviewsRoute');
const removeWishlistItemsRoute = require('./routes/client/removeWishlistItemsRoute');
const removeCartlistItemRoute = require('./routes/client/removeCartlistItemRoute');
const removeCartlistItemsRoute = require('./routes/client/removeCartlistItemsRoute');
const addWishlistItemRoute = require('./routes/client/addWishlistItemRoute');
const addCartitemRoute = require('./routes/client/addCartitemRoute');
const getLatest10ProductsRoute = require('./routes/client/getLatest10ProductsRoute');
const getTopRated10ProductsRoute = require('./routes/client/getTopRated10ProductsRoute');
const getSearchListRoute = require('./routes/client/getSearchListRoute');
const createOrderRoute = require('./routes/client/createOrderRoute');
const verifyPaymentRoute = require('./routes/client/verifyPaymentRoute');
const restoreQuantityRoute = require('./routes/client/restoreQuantityRoute');
const updateUserDetailsRoute = require('./routes/client/updateUserDetailsRoute');
const cancelOrderRoute = require('./routes/client/cancelOrderRoute');
const getUserOrderlistRoute = require('./routes/client/getUserOrderlistRoute');
const saveReviewRoute = require('./routes/client/saveReviewRoute');

//admin end routes
const verifyAdminRoute = require('./routes/admin/verifyAdminRoute');
const getUserlistRoute = require('./routes/admin/getUserlistRoute');
const getProductlistRoute = require('./routes/admin/getProductlistRoute');
const deleteUserRoute = require('./routes/admin/deleteUserRoute');
const updateProductDetailsRoute = require('./routes/admin/updateProductDetailsRoute');
const addNewProductRoute = require('./routes/admin/addNewProductRoute');
const deleteCategoryRoute = require('./routes/admin/deleteCategoryRoute');
const deleteProductRoute = require('./routes/admin/deleteProductRoute');
const getUserDetailsRoute = require('./routes/admin/getUserDetailsRoute');
const addNewCategoryRoute = require('./routes/admin/addNewCategoryRoute');
const updateFullWidthBannersRoute = require('./routes/admin/updateFullWidthBannersRoute');
const getOrderlistRoute = require('./routes/admin/getOrderlistRoute');
const getOrderDetailsRoute = require('./routes/admin/getOrderDetailsRoute');
const updateTrackingStatusRoute = require('./routes/admin/updateTrackingStatusRoute');
const updatePaymentRoute = require('./routes/admin/updatePaymentRoute');
const updateDeliveryStatusRoute = require('./routes/admin/updateDeliveryStatusRoute');
const updateSmallWidthBannersRoute = require('./routes/admin/updateSmallWidthBannersRoute');

const app = express();

//Middleware
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(logger);

app.use('/welcome', (req, res) => { 
    res.send("Welcome to new project");
});
//route for login & registeration
app.use('/api',verifyUserRoute.routes);
app.use('/api',registerUserRoute.routes);

app.use('/api/client',getHomeSlidersRoute.routes);
app.use('/api/client',getDealsOfTheDayRoute.routes);
app.use('/api/client',getWrappBannersRoute.routes);
app.use('/api/client',getBestSellersRoute.routes);
app.use('/api/client',getWishListRoute.routes);
app.use('/api/client',getCartitemsRoute.routes);
app.use('/api/client',getCategoryProductsRoute.routes);
app.use('/api/client',getCategoryListRoute.routes);
app.use('/api/client',getProductDetailsRoute.routes);
app.use('/api/client',getProductReviewsRoute.routes);
app.use('/api/client',getLatest10ProductsRoute.routes);
app.use('/api/client',getTopRated10ProductsRoute.routes);
app.use('/api/client',getSearchListRoute.routes);

app.use('/api/client',addWishlistItemRoute.routes);
app.use('/api/client',addCartitemRoute.routes);
app.use('/api/client',removeWishlistItemRoute.routes);
app.use('/api/client',removeWishlistItemsRoute.routes);
app.use('/api/client',removeCartlistItemRoute.routes);
app.use('/api/client',removeCartlistItemsRoute.routes);
app.use('/api/client',createOrderRoute.routes);
app.use('/api/client',verifyPaymentRoute.routes);
app.use('/api/client',restoreQuantityRoute.routes);
app.use('/api/client',updateUserDetailsRoute.routes);
app.use('/api/client',getUserOrderlistRoute.routes);
app.use('/api/client',cancelOrderRoute.routes);
app.use('/api/client',saveReviewRoute.routes);

//admin end routes
app.use('/api/admin',verifyAdminRoute.routes);
app.use('/api/admin',getUserlistRoute.routes);
app.use('/api/admin',getUserDetailsRoute.routes);
app.use('/api/admin',getProductlistRoute.routes);
app.use('/api/admin',deleteUserRoute.routes);
app.use('/api/admin',updateProductDetailsRoute.routes);
app.use('/api/admin',addNewProductRoute.routes);
app.use('/api/admin',deleteCategoryRoute.routes);
app.use('/api/admin',deleteProductRoute.routes);
app.use('/api/admin',addNewCategoryRoute.routes);
app.use('/api/admin',updateFullWidthBannersRoute.routes);
app.use('/api/admin',updateSmallWidthBannersRoute.routes);
app.use('/api/admin',getOrderlistRoute.routes);
app.use('/api/admin',getOrderDetailsRoute.routes);
app.use('/api/admin',updateTrackingStatusRoute.routes);
app.use('/api/admin',updatePaymentRoute.routes);
app.use('/api/admin',updateDeliveryStatusRoute.routes);

let port = process.env.PORT || 8080;
app.listen(port,'127.0.0.1', ()=>{
    console.log(`App listening at http://localhost:${port}`);
});