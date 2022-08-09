import getCategoryList from "../../apis/client/getCategoryListAPI.js";
import getLatest10Products from "../../apis/client/getLatest10Products.js";
import getTopRated10Products from "../../apis/client/getTopRated10Products.js";

try{

    //template generation for category list in suggestion box
    const categories = await getCategoryList();
    const categoryList = document.getElementById('categoryList');

    let categoryTemplate = '';

    categories.map(categ => {
        let str = categ.category.replace('-',' ').trim();
        str = str[0].toUpperCase()+str.substring(1,);

        let sep = str.indexOf(' ');
        if(sep != -1){
            str = str.substring(0,sep)+" "+str[sep+1].toUpperCase()+str.substring(sep+2);
        }

        categoryTemplate +=`<div class="list-item">
                            <span class="icon" style="font-size: 10px;margin-left:10px;">
                                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </span>        
                            <a href="./products.html?category_id=${categ.id}&category_name=${categ.category}">${str}</a>
                        </div>`;
    })

    categoryList.innerHTML = categoryTemplate;

    //teplate generation for latest products list in suggestion box
    const latestProducts = await getLatest10Products();
    const latestProductsList = document.getElementById('latestProductsList');

    let latestProductsTemplate = '';

    latestProducts.map(product => {
        latestProductsTemplate +=`<div class="list-item">
                                        <a href="./productdetails.html?product_id=${product.id}">${product.name}</a>
                                    </div>
                                `;
    })

    latestProductsList.innerHTML = latestProductsTemplate;
    
    //teplate generation for latest products list in suggestion box
    const topRatedProducts = await getTopRated10Products();
    const topRatedProductsList = document.getElementById('topRatedProductsList');

    let topRatedProductsTemplate = '';

    topRatedProducts.map(product => {
        topRatedProductsTemplate +=`<div class="list-item">
                                        <a href="./productdetails.html?product_id=${product.id}">${product.name}</a>
                                    </div>
                                `;
    })

    topRatedProductsList.innerHTML = topRatedProductsTemplate;

} catch(err){
    console.log(err)
}