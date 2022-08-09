import getWrappBanners from "../../apis/client/getWrappBannersAPI.js";

try{

    const result = await getWrappBanners();
    const container = document.getElementById('wrappBannerSmall');

    const templateGenerator = (id,image,s_text,b_text,desc,size) => {

        if(size === 'small'){
            return `<div class="col-lg-6 col-md-6 col-sm-12">
                <div class="banner">
                    <div class="item-banner style${3+id}">
                        <div class="inner" style="background-image:url(${image});">
                            <div class="banner-content">
                                ${
                                    s_text !== null
                                    ? `<h4 class="srizon-subtitle">${s_text}</h4>`
                                    : ''
                                }
                                <h3 class="title">${b_text}</h3>
                                <div class="description">
                                    ${desc}
                                </div>
                                <a href="#" class="button btn-shop-now">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }else return ''

    }

    let htmlTemplate = '';

    if(result.length > 0){

        result.map(item => {
            htmlTemplate = htmlTemplate + templateGenerator(item.id,item.image_path,item.s_title,item.b_title,item.desc,item.size);
        })
    
        
    }else{
        htmlTemplate += '<p style="text-align:center">Something went wrong!</p>'
    }
    
    container.innerHTML = htmlTemplate;
} catch (err) {
    console.log(err);
}