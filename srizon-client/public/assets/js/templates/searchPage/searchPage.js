import getSearchList from "../../apis/client/getSearchListAPI.js";

const user_id = localStorage.getItem('user_id') 
                ? localStorage.getItem('user_id') 
                : sessionStorage.getItem('user_id')
                    ? sessionStorage.getItem('user_id')
                    : 0

const searchListGenerator = (list) => {
    const container = document.getElementById('searchList');
    let htmlTemplate = '';

    list.map(item => {
        htmlTemplate += `<li class="product-item  col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1">
                        <div class="product-inner equal-element">
                            <div class="product-top">
                                <div class="flash">
                                    ${
                                        item.is_new
                                        ? `<span class="onnew"><span class="text">new</span></span>`
                                        : ''
                                    }
                                </div>
                            </div>
                            <div class="product-thumb">
                                <div class="thumb-inner">
                                    <a href="./productdetails.html?product_id=${item.id}">
                                        <img src="${JSON.parse(item.image_path)?.links[0]}" alt="img-${item.name}">
                                    </a>
                                    <div class="thumb-group">
                                        <div class="yith-wcwl-add-to-wishlist">
                                            <div class="yith-wcwl-add-button addToWishlist" data-product="1" onclick="addToWishlist(${item.id},${user_id},1)">
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
                                    <a href="./productdetails.html?product_id=${item.id}">${item.name}</a>
                                </h5>
                                <div class="group-info">
                                    <div class="stars-rating">
                                        <div class="star-rating">
                                            <span class="star-${item.stars}"></span>
                                        </div>
                                        <div class="count-star">
                                            (${item.stars})
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
                    </li>`
    })

    container.innerHTML = htmlTemplate;
}

const templateGenerator = (list) => {

    searchListGenerator(list);
    
    document.getElementById('shopTopControl').innerHTML = `<!-- Sort functionality with pre-defined values -->
                                                            <form class="filter-choice select-form">
                                                                <span class="title">Sort by</span>
                                                                <select title="sort-by" id="selectSortTeq">
                                                                    <option value="0">--select--</option>
                                                                    <option value="1">Price: Low to High</option>
                                                                    <option value="2">Price: High to Low</option>
                                                                    <option value="3">Popularity</option>
                                                                    <option value="4">Average Rating</option>
                                                                    <option value="5">Newness</option>
                                                                </select>
                                                            </form>`

    const sortProducts = (method,arr) => {
        if(method === '1'){
            for(let i=0;i<arr.length;i++){
                for(let j=i+1;j<arr.length;j++){
                    if(arr[i].d_price > arr[j].d_price){
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }else if(method === '2'){
            for(let i=0;i<arr.length;i++){
                for(let j=i+1;j<arr.length;j++){
                    if(arr[i].d_price < arr[j].d_price){
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }else if(method === '3'){

        }else if(method === '4'){
            for(let i=0;i<arr.length;i++){
                for(let j=i+1;j<arr.length;j++){
                    if(arr[i].stars < arr[j].stars){
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }else if(method === '5'){
            for(let i=0;i<arr.length;i++){
                if(!arr[i].is_new){
                    arr.splice(i,1);
                }
            }
        }

        return arr;
    }

    const sortMethod = document.getElementById("selectSortTeq");
    sortMethod.addEventListener("change",()=>{
        let newList = sortProducts(sortMethod.value,list);
        searchListGenerator(newList);
    })

}

try{
    let paramStr = window.location.search

    paramStr = paramStr.substring(1,paramStr.length);

    let params = paramStr.split('=');

    document.getElementById('searchTitle').innerHTML = `Results for <b>${params[1].replace(/%20/g,' ')}</b>`;

    const result = await getSearchList(params[1]);
    
    if(result.status != 404 && result.length > 0){
        templateGenerator(result);
    }
    else if(result.status === 404){
        window.location='./404page.html';
    }
    else{
        document.getElementById('searchList').innerHTML = `<center><p>No products matched your search!!</p></center>`;
    }
} catch(error) {
    console.log(error);
}