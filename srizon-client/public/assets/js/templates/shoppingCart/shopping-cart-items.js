import getCartitems from "../../apis/client/getCartitemsAPI.js";

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
            <a href="javascript:void(0)" class="remove" onclick="removeCartlistItem(${item.user_id},${item.id})"></a>
        </td>
        <td class="product-thumbnail">
            <a href="./productdetails.html?product_id=${item.id}">
                <img src="${JSON.parse(item.product_details.image_path).links[0]}" alt="img-${item.product_details.name}"
                    class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image">
            </a>
        </td>
        <td class="product-name" data-title="Product">
            <a href="./productdetails.html?product_id=${item.id}" class="title">${item.product_details.name}</a>
            <span class="attributes-select attributes-color">${item.item_details.color}</span>
            <span class="attributes-select attributes-size">${item.item_details.size}</span>
        </td>
        <td class="product-quantity" data-title="Quantity">
            <div class="quantity">
                <div class="control">
                    <!-- <a class="btn-number qtyminus quantity-minus" href="#">-</a> -->
                    <input type="text" data-step="1" data-min="1" value="x${item.item_details.quantity}" title="Qty"
                            class="input-qty qty" size="4" readonly>
                    <!-- <a href="#" class="btn-number qtyplus quantity-plus">+</a> -->
                </div>
            </div>
        </td>
        <td class="product-price" data-title="Price">
            <span class="woocommerce-Price-amount amount">
                <span class="woocommerce-Price-currencySymbol">
                    Rs.
                </span>
                ${item.product_details.d_price*item.item_details.quantity}
            </span>
        </td>
    </tr>`    

}

if(user_id === 0 && !isLoggedIn){

    window.location.href = "./login.html";

}else{
    try{

        const result = await getCartitems(user_id);
        
        const container = document.getElementById('shoppingCartItems');
        const buttonsCTA = document.getElementById('buttonsCTA');
    
        
        if(result.status !== 404){
            let htmlTemplate = '';
    
            if(result.length > 0){
    
                let totalCost = 0;
        
                result.map(item => {
                
                    htmlTemplate = htmlTemplate + templateGenerator(item);
        
                    totalCost = totalCost + (item.product_details.d_price*item.item_details.quantity);
                
                })
        
                htmlTemplate += `<tr>
                                    <td class="actions">
                                        <div class="order-total">
                                            <span class="title">
                                                Total Price:
                                            </span>
                                            <span class="total-price">
                                                Rs.${totalCost}
                                            </span>
                                        </div>
                                    </td>
                                </tr>`
        
                buttonsCTA.innerHTML = `<button class="button btn-continue-shopping" onclick="removeCartlistItems(${user_id})">
                                            Remove All
                                        </button>`
        
            }else{
        
                htmlTemplate = `<br />
                                <p style="text-align:center">Your cart is empty!!</p>
                                <p style="text-align:center">Explore our 
                                    <a href="./index.html" style="text-decoration:underline;color:blue">home page</a> 
                                for best deals and products!</p>`;
        
            }
        
            container.innerHTML = htmlTemplate;    
        }else{
            window.location='./404page.html';
        }
    } catch (err) {
        console.log(err);
    }
}