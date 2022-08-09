import getProductDetails from "../../apis/client/getProductDetailsAPI.js";
import getCategoryProducts from '../../apis/client/getCategoryProductsAPI.js';
import getProductReviews from '../../apis/client/getProductReviewsAPI.js';

const user_id = localStorage.getItem('user_id') 
                ? localStorage.getItem('user_id') 
                : sessionStorage.getItem('user_id')
                    ? sessionStorage.getItem('user_id')
                    : 0

function suggestionTemplateGenerator(item){
    try{
        let image = JSON.parse(item.image_path);
        return `<div class="product-item style-1" style="min-width:300px;max-width:300px;margin: 1rem 0;">
                <div class="product-inner equal-element">
                    <div class="product-top">
                        <div class="flash">
                            ${
                                item.is_new
                                ? `<span class='onnew'>
                                        <span class="text">
                                            new
                                        </span>
                                    </span>`
                                : ''
                            }
                        </div>
                    </div>
                    <div class="product-thumb">
                        <div class="thumb-inner">
                            <a href="./productdetails.html?product_id=${item.id}">
                                <img src='${image.links[0]}' alt="img-${item.name}" style="width:100%;height:250px;object-fit:contain;">
                            </a>
                            <div class="thumb-group">
                                <div class="yith-wcwl-add-to-wishlist">
                                    <div class="yith-wcwl-add-button addToWishlist" data-product="1" onclick="addToWishlist(${item.id},${user_id},1)">
                                        <a href="javascript:void(0)">Add to Wishlist</a>
                                    </div>
                                </div>
                                <div class="loop-form-add-to-cart">
                                    <button class="single_add_to_cart_button button" onClick="addToCart(${item.id},${user_id})">Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-info">
                        <h5 class="product-name product_title">
                            <a href="./productdetails.html?product_id=${item.id}">${item.name}</a>
                        </h5>
                        <div class="group-info">
                            <div class="stars-rating">
                                <div class="star-rating">
                                    <span class="star-${item.stars > 5 ? 5 : item.stars}"></span>
                                </div>
                                <div class="count-star">
                                    ${item.stars}
                                </div>
                            </div>
                            <div class="price">
                                <del>
                                    Rs.${item.o_price}
                                </del>
                                <ins>
                                    Rs.${item.d_price}
                                </ins>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    } catch (err) {
        console.log(err);
        return null;
    }

}

try{

    let paramStr = window.location.search

    paramStr = paramStr.substring(1,paramStr.length)
    
    let paramArr = paramStr.split("&");
    
    const paramObj = {}
    
    for(let i=0;i<paramArr.length;i++){
        let params = paramArr[i].split("=");
        paramObj[params[0]]=params[1]
    }
    
    const productId = paramObj.product_id;
    
    const navProductHome = document.getElementById("navProductHome");
    const navProduct = document.getElementById("navProduct");
    
    const result = await getProductDetails(productId);

    if(result.status !== 404){
        const categName = result[0]?.category_details.category.replace('-',' ').toUpperCase();

        const categId = result[0]?.category_details.id;
        const categList = await getCategoryProducts(categId);
    
        const reviewList = await getProductReviews(result[0].id);
        
        navProductHome.innerHTML = `<a href="./products.html?category_id=${result[0].category_id}&category_name=${result[0]?.category_details?.category}">${categName}</a>`
        navProduct.innerText = result[0].name;

        let image = JSON.parse(result[0].image_path);
        console.log(image);
        let productTemplate = `
                            <!--
                            <div class="details-thumd">
                                <div class="image-preview-container image-thick-box image_preview_container">
                                    <img id="img_zoom" data-zoom-image=${image.links[0]}
                                        src=${image.links[0]} alt="img" style="width:100%;max-height:500px;object-fit:contain;">
                                        <a href="#" class="btn-zoom open_qv"><i class="fa fa-search" aria-hidden="true"></i></a>
                                </div>
                            
                                <div class="product-preview image-small product_preview swiper mySwiper" style="max-height:500px;">
                                    <div id="thumbnails" class="swiper-wrapper">
                                        ${
                                            image.links.map(image => 
                                                `
                                                <div class="swiper-slide">
                                                    <a href="#" data-image=${image} data-zoom-image=${image} class="active">
                                                        <img src=${image} data-large-image=${image} alt="image" style="height:500px;object-fit:contain;" />
                                                    </a>
                                                </div>
                                                `
                                            )
                                        }
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                            </div>
                            -->

                            <div class="details-thumd image-preview-container image-thick-box image-preview swiper mySwiper" style="max-height:500px;">
                                <div class="swiper-wrapper">
                                    ${
                                        image.links.map(image => 
                                            `
                                            <div class="slide swiper-slide" style="padding-left:0">
                                                <a href="#" data-image=${image} data-zoom-image=${image} style="width:100%">
                                                    <img src=${image} data-large-image=${image} alt="image" style="height:500px;object-fit:contain;" />
                                                </a>
                                            </div>
                                            `
                                        )
                                    }
                                </div>
                                <div class="swiper-pagination"></div>
                                
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>                 
                            </div>
                            <div class="details-infor">
                                <h1 class="product-title">
                                    ${result[0].name}
                                </h1>
                                <div class="stars-rating">
                                    <div class="star-rating">
                                        <span class="star-${result[0].stars > 5 ? 5 : result[0].stars}"></span>
                                    </div>
                                    <div class="count-star">
                                        ${result[0].stars}
                                    </div>
                                </div>
                                <div class="availability">
                                    availability:
                                    ${result[0]?.inventory_details?.quantity >= 25 
                                        ? '<p style="color:blue;font-weight:bold;">In Stock</p>' 
                                        : result[0]?.inventory_details?.quantity > 10
                                            ? `<p style="color:orange;font-weight:bold;">Only ${result[0]?.inventory_details?.quantity} left</p>`
                                            : result[0]?.inventory_details?.quantity === 0
                                                ? `<p style="color:red;font-weight:bold;">Quantity not available!!</p>`
                                                : `<p style="color:red;font-weight:bold;">Hurry! only ${result[0]?.inventory_details?.quantity} left</p>`
                                    }
                                </div>
                                <div class="price">
                                    <span>Rs.${result[0].d_price}</span>
                                </div>
                                <div class="product-details-description">
                                    <p>
                                        ${
                                            result[0].desc === null
                                            ? ''
                                            : result[0].desc
                                        }
                                    </p>
                                </div>
                                <div class="variations">
                                    ${
                                        result[0]?.inventory_details !== null
                                        ? `<div class="attribute attribute_color">
                                            <div class="color-text text-attribute">
                                                Color:
                                            </div>
                                            <input title="colors" type="text" class="input-text" value=${result[0]?.inventory_details['color-list']} readOnly>
                                        </div>`
                                        : ''
                                    }
                                    ${
                                        result[0]?.inventory_details !== null
                                        ? `<div class="attribute attribute_size">
                                            <div class="size-text text-attribute">
                                                Size:
                                            </div>
                                            <input title="colors" type="text" class="input-text" value=${result[0]?.inventory_details['size-list']} readOnly>
                                        </div>`
                                        : ''
                                    }
                                </div>
                                ${
                                    result[0]?.inventory_details?.quantity === 0
                                    ? ''
                                    : `<div class="group-button">
                                        <div class="yith-wcwl-add-to-wishlist">
                                            <div class="yith-wcwl-add-button" onclick="addToWishlist(${result[0].id},${user_id},1)">
                                                <a href="javascript:void(0)">Add to Wishlist</a>
                                            </div>
                                        </div>
                                        <div class="size-chart-wrapp">
                                            <div class="btn-size-chart">
                                                <a id="size_chart" href="assets/images/size-chart.jpg" class="fancybox">View
                                                    Size Chart</a>
                                            </div>
                                        </div>
                                        <div style="display:flex;flex-direction:row;">
                                            <div class="quantity-add-to-cart">
                                                <button class="single_add_to_cart_button button" onclick="addToCart(${result[0].id},${user_id})">Add to cart</button>
                                            </div>
                                            <div class="quantity-add-to-cart">
                                                <button class="single_add_to_cart_button button"><a href="./checkout.html?product_id=${result[0].id}" style="color:#fff;">Order now!</a></button>
                                            </div>
                                        </div>
                                    </div>`
                                }
                            </div>`
    
        document.getElementById('detailsProduct').innerHTML = productTemplate;
    
    
        //template for description of product
        document.getElementById('product-descriptions').innerHTML = `<p>${result[0].desc}</p>`;
    
    
        //template for product information in the form of table
        document.getElementById('information').innerHTML = `<table class="table table-bordered">
                                                                <tr>
                                                                    <td>Size</td>
                                                                    <td>${result[0].inventory_details['size-list']}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Color</td>
                                                                    <td>${result[0].inventory_details['color-list']}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Category</td>
                                                                    <td>${result[0]?.category_details?.category.toUpperCase().replace('-',' ')}</td>
                                                                </tr>
                                                            </table>
                                                            `
    
        //template for product reviews
        let reviewTemplate = `<h2 class="reviews-title">
                                ${reviewList.length} review(s) for
                                <span>${result[0].name}</span>
                            </h2>`;
        if(reviewList.length > 0){
            let innerTemplate = '';
            reviewList.map(review => {
                innerTemplate+=`<li class="conment">
                                    <div class="conment-container">
                                        <a href="javascript:void(0)" class="avatar">
                                            <img alt="img-user${review.user_details.id}" 
                                                src="assets/images/avartar.png">
                                        </a>
                                        <div class="comment-text">
                                            <div class="stars-rating">
                                                <div class="star-rating">
                                                    <span class="star-${review.rating}"></span>
                                                </div>
                                                <div class="count-star">
                                                    ${review.rating}
                                                </div>
                                            </div>
                                            <p class="meta">
                                                <strong class="author">${review.user_details.first_name} ${review.user_details.last_name}</strong>
                                                <span>-</span>
                                                <span class="time">${review.created_at.substring(0,10)}</span>
                                            </p>
                                            <div class="description">
                                                <p>${review.review}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>`
            })
            reviewTemplate += `<ol class="commentlist">
                                    ${innerTemplate}
                                </ol>`
        }
        document.getElementById('reviewsTemplate').innerHTML = reviewTemplate;
    
    
        //template design for suggestion products at the bottom of page
        let suggestionsTemplate = '';
        if(categList.length > 6){
            for(let i=0;i<6;i++){
                suggestionsTemplate += suggestionTemplateGenerator(categList[i]);
            }
        }else{
            categList.map(item => {
                suggestionsTemplate += suggestionTemplateGenerator(item)
            })
        }
        document.getElementById('suggestionProducts').innerHTML = suggestionsTemplate;    
    }else{
        window.location='./404page.html';
    }

} catch (err) {
    console.log(err);

    document.getElementById('detailsProduct').innerHTML = `
            <br />
            <br />
            <p style="width:100%;opacity:0.7;text-align:center;">/--(+ - +)--/</p>
            <p style="width:100%;opacity:0.7;text-align:center;">we are experiencing a problem</p>
            <p style="width:100%;opacity:0.7;text-align:center;">return to <a href="./index.html" style="opacity:1;text-decoration:underline;color:blue;">home</a></p>
            <br />
            <br />
    `;

    document.getElementById('suggestionProducts').innerHTML = `
            <br />
            <br />
            <p style="width:100%;opacity:0.7;text-align:center;">Please try again,later!</p>
            <br />
            <br />
    `;

}