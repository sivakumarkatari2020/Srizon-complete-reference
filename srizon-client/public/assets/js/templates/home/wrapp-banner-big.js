import getWrappBanners from "../../apis/client/getWrappBannersAPI.js";

try{

    const result = await getWrappBanners();
    const container = document.getElementById('wrappBannerBig');

    const templateGenerator = (b_text,image,desc,price,size) => {

        if(size === 'big'){
            return `<div class="banner">
                <div class="item-banner style17">
                    <div class="inner" style="background-image:url(${image});">
                        <div class="banner-content">
                            <h3 class="title">${b_text}</h3>
                            <div class="description">
                                ${desc}
                            </div>
                            <div class="banner-price">
                                Price from:
                                <span class="number-price">Rs.${price}.00</span>
                            </div>
                            <a href="#" class="button btn-shop-now">Shop now</a>
                        </div>
                    </div>
                </div>
            </div>`
        }else return ''

    }

    let htmlTemplate = '';

    if(result.length > 0){

        result.map(item => {
    
            htmlTemplate = htmlTemplate + templateGenerator(item.b_title,item.image_path,item.desc,item.price,item.size);
    
        })

    }else{
        htmlTemplate += '<p style="text-align:center">Something went wrong!</p>'
    }

    container.innerHTML = htmlTemplate;
} catch (err) {
    console.log(err)
}