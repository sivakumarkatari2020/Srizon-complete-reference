import getHomeSliders from "../../apis/client/getHomeSlidersAPI.js";

try{

    const result = await getHomeSliders();
    console.log(result);
    const container = document.getElementById('homeSliderTemp');

    let count = 1;

    const templateGenerator = (id,s_text,b_text,price,image_path,categ_id) => {

        const templateItem = `<div class="slide slide-${id} style${6+id} swiper-slide" 
                                style="background-image: url(${image_path});
                                    background-repeat:no-repeat;
                                    background-size:cover;
                                    background-position: center center;
                                    min-height:500px"
                                >
                                <div class="slide-content">
                                    <div class="slider-infor">
                                        <h5 class="title-small">
                                            ${s_text}
                                        </h5>
                                        <h3 class="title-big">
                                            ${b_text}
                                        </h3>
                                        <div class="price">
                                            New Price:
                                            <span class="number-price">
                                                    Rs.${price}.00
                                                </span>
                                        </div>
                                        <a href="./products.html?category_id=${categ_id}&category_name=furniture" class="button btn-shop-the-look bgroud-style">Shop now</a>
                                    </div>
                                </div>
                            </div>`
        count = 0;
        return templateItem;
    }

    let htmlTemplate = '';

    if(result.length>0){
        result.map(item => {
    
            htmlTemplate = htmlTemplate + templateGenerator(item.id,item.s_title,item.b_title,item.new_price,item.image_path,item.categ_id);
    
        })
    }else{
        htmlTemplate += '<p style="text-align:center">Something went wrong!</p>'
    }

    container.innerHTML = htmlTemplate;
} catch (err) {
    console.log(err);
}