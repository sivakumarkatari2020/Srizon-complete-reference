import getDealsOfTheDay from "../../apis/client/getDealsOfTheDayAPI.js";

const user_id = localStorage.getItem('user_id') 
                ? localStorage.getItem('user_id') 
                : sessionStorage.getItem('user_id')
                    ? sessionStorage.getItem('user_id')
                    : 0

try{

    const result = await getDealsOfTheDay();
    const container = document.getElementById('dealsOfTheDay');

    const templateGenerator = (id,is_new,name,o_price,d_price,image_path,stars) => {
        let image = JSON.parse(image_path);
        return  `<div class="product-item col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1" style="min-width: 350px;margin: 1rem 0;">
                    <div class="product-inner equal-element">
                        <div class="product-top">
                            <div class="flash">
                                ${
                                    is_new
                                    ? `<span class='onnew'>
                                            <span class="text">
                                                new
                                            </span>
                                        </span>`
                                    : ''
                                }
                            </div>
                        </div>
                        <div class="product-thumb" style="height:250px">
                            <div class="thumb-inner">
                                <a href="./productdetails.html?product_id=${id}">
                                    <img src='${image.links[0]}' alt="img-${name}" style="width:100%;height:250px;object-fit:contain;">
                                </a>
                                <div class="thumb-group">
                                    <div class="yith-wcwl-add-to-wishlist">
                                        <div class="yith-wcwl-add-button addToWishlist" data-product="1" onclick="addToWishlist(${id},${user_id},1)">
                                            <a href="javascript:void(0)">Add to Wishlist</a>
                                        </div>
                                    </div>
                                    <div class="loop-form-add-to-cart">
                                        <button class="single_add_to_cart_button button">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product-info">
                            <h5 class="product-name product_title">
                                <a href="./productdetails.html?product_id=${id}">${name}</a>
                            </h5>
                            <div class="group-info">
                                <div class="stars-rating">
                                    <div class="star-rating">
                                        <span class="star-${stars > 5 ? 5 : stars}"></span>
                                    </div>
                                    <div class="count-star">
                                        (${stars})
                                    </div>
                                </div>
                                <div class="price">
                                    <del>
                                        Rs.${o_price}
                                    </del>
                                    <ins>
                                        Rs.${d_price}
                                    </ins>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`    
                            
    }

    let htmlTemplate = '';

    if(result.length > 0){
        result.map(item => {
    
            htmlTemplate = htmlTemplate + templateGenerator(item.id,item.is_new,item.name,item.o_price,item.d_price,item.image_path,item.stars);
    
        })
    }else{
        htmlTemplate += '<p style="text-align:center">Something went wrong!</p>'
    }

    container.innerHTML = htmlTemplate;
} catch (err) {
    console.log(err);
}