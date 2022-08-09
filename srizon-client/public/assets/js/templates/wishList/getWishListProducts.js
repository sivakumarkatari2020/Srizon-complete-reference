import getWishList from "../../apis/client/getWishListProductsAPI.js";

const user_id = localStorage.getItem('user_id') 
                ? localStorage.getItem('user_id') 
                : sessionStorage.getItem('user_id')
                    ? sessionStorage.getItem('user_id')
                    : 0

const isLoggedIn = localStorage.getItem('isLoggedIn')
                    ? localStorage.getItem('isLoggedIn')
                    : sessionStorage.getItem('isLoggedIn')
                        ? sessionStorage.getItem('isLoggedIn')
                        : false

const templateGenerator = (item) => {

    return  `<tr class="cart_item">
        <td class="product-remove">
            <a href="javascript:void(0)" class="remove" onclick="removeWishlistItem(${item.user_id},${item.id})"></a>
        </td>
        <td class="product-thumbnail">
            <a href="./productdetails.html?product_id=${item.product_id}">
                <img src="${JSON.parse(item.product_details.image_path).links[0]}" alt="img-${item.product_details.name}"
                    class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image">
            </a>
        </td>
        <td class="product-name" data-title="Product">
            <a href="./productdetails.html?product_id=${item.product_id}" class="title">${item.product_details.name}</a>
            <span class="attributes-select attributes-color">${item.color}</span>
            <span class="attributes-select attributes-size">${item.size}</span>
            ${
                item.product_details?.inventory_details
                ? item.product_details.inventory_details?.quantity >= 25 
                    ? '<p style="color:blue;font-weight:bold;">In Stock</p>' 
                    : item.product_details.inventory_details?.quantity > 10
                        ? `<p style="color:orange;font-weight:bold;">Only ${item.product_details.inventory_details?.quantity} left</p>`
                        : item.product_details.inventory_details?.quantity === 0
                            ? `<p style="color:red;font-weight:bold;">Quantity not available!!</p>`
                            : `<p style="color:red;font-weight:bold;">Hurry! only ${item.product_details.inventory_details?.quantity} left</p>`
                : '<p>No statistics available</p>'
            }
        </td>
        <td class="product-price" data-title="Price">
            <span class="woocommerce-Price-amount amount">
                <span class="woocommerce-Price-currencySymbol">
                    Rs.
                </span>
                ${item.product_details.d_price}
            </span>
        </td>
    </tr>`    

}

if(user_id === 0 && !isLoggedIn){

    window.location.href = "./login.html";

}else{
    try{

        const result = await getWishList(user_id);
        console.log(result);
    
        if(result.status !== 404){        
            let htmlTemplate = '';
        
            if(result.length > 0){
                result.map(item => {htmlTemplate = htmlTemplate + templateGenerator(item);})
                document.getElementById('buttonsCTA').innerHTML = `<button class="button btn-continue-shopping" onclick="removeWishlistItems(${user_id})">
                                            Empty Wishlist
                                        </button>`;
            }else{
                htmlTemplate = `<br />
                                <p style="text-align:center">Your list is empty!!</p>
                                <p style="text-align:center">Explore our 
                                    <a href="./index.html" style="text-decoration:underline;color:blue">home page</a> 
                                for best deals and products!</p>`;
            }
        
            document.getElementById('wishListProducts').innerHTML = htmlTemplate;
    
        }else{
            window.location='./404page.html';
        }
    
    } catch (err) {
        console.log(err);
    }
}