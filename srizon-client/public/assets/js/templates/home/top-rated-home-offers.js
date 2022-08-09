import getTopRated10Products from "../../apis/client/getTopRated10Products.js";

const user_id = localStorage.getItem('user_id') 
                ? localStorage.getItem('user_id') 
                : sessionStorage.getItem('user_id')
                    ? sessionStorage.getItem('user_id')
                    : 0

try{

    const result = await getTopRated10Products();
    const container = document.getElementById('topRatedHomeOffers');

    const templateGenerator = (id,is_new,name,o_price,d_price,image_path,stars) => {
        let image = JSON.parse(image_path);
        return  `<li class="product-item  col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1">
            <div class="product-inner equal-element">
                <div class="product-top">
                    <div class="flash">
                        ${
                            is_new
                            ? `<span class="onnew"><span class="text">new</span></span>`
                            : ''
                        }
                    </div>
                </div>
                <div class="product-thumb">
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
                                <button class="single_add_to_cart_button button">Add to cart
                                </button>
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
        </li>`    
                    
    }

    let htmlTemplate = '';

    if(result.length > 0){
        for(let i=0;i<result.length;i++){
            htmlTemplate = htmlTemplate + templateGenerator(result[i].id,result[i].is_new,result[i].name,result[i].o_price,result[i].d_price,result[i].image_path,result[i].stars);
        }
    }else{
        htmlTemplate += '<p style="text-align:center">Something went wrong!</p>'
    }

    container.innerHTML = htmlTemplate;
} catch (err) {
    console.log(err);
}