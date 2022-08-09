import getOrderlistAPI from "../../apis/client/getOrderlistAPI.js";

const user_id = localStorage.getItem('user_id') 
                ? localStorage.getItem('user_id') 
                : sessionStorage.getItem('user_id')
                    ? sessionStorage.getItem('user_id')
                    : 0

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "200",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}                                  

try{

    let result = [];

    if(user_id !== 0){
        result = await getOrderlistAPI(user_id);
    }else{
        toastr.error('Something went wrong!!');
        setTimeout(()=>{
            window.location.href = "./404page.html";
        },2000); 
    }

    async function handleReview(e){
        e.preventDefault();

        let review = document.getElementById(`reviewText-${e.target.name}`);
        let rating = document.getElementById(`rating-${e.target.name}`);

        if(review.value.length < 3){
            toastr.error("Please enter some text in review box before saving!!");
            return;
        }else{
            const result = await fetch(`https://srizon-proj.el.r.appspot.com/api/client/review/new`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Accept' : 'application/json',
                        'Access-Control-Allow-Origin' : "http://127.0.0.1:5500",
                        'Content-Type' : 'application/json',
                        'charset': 'UTF-8'
                    }),
                    body: JSON.stringify({
                        "order_id" : e.target.name,
                        "rating" : rating.value,
                        "review" : review.value
                    })
                }
            ).then(response => response.json())
            .then(data => data)
            .catch((error)=>{
                console.log(error);
                return {'status': 503,'message': 'The server  is down. Please contact the Administrator'};
            })

            if(result.status !== 200){
                toastr.error(result.message);
            }else{
                toastr.success(result.message);
                rating.value = 5;
                review.value = '';
            }
        }
    }

    async function handleCancelOrder(e){
        e.preventDefault();

        if(window.confirm("Are you sure to cancel this order??")){
            const res = await fetch(`https://srizon-proj.el.r.appspot.com/api/client/cancelOrder/${e.target.name}`)
                            .then(response => response.json())
                            .then(data => data)
                            .catch((error)=>{
                                console.log(error);
                                return {'status': 404,'message': error}
                            })
            
            if(res.status !== 200){
                toastr.error(res.message);
            }else{
                toastr.success(res.message);

                setTimeout(()=>{
                    window.location.reload();
                },2000);
            }
        }
    }

    function ordersTemplate(item){
        return `
        <div class="shipping-address-form  checkout-form">
            <ul class="list-product-order">
                <li class="product-item-order">
                    <div class="product-thumb">
                        <a href="./productdetails.html?product_id=${item.product_id}">
                            <img src="${JSON.parse(item.product_details.image_path).links[0]}" alt="img-${item.product_details.name}">
                        </a>
                    </div>
                    <div class="product-order-inner">
                        <h5 class="product-name">
                            <a href="./productdetails.html?product_id=${item.product_id}">${item.product_details.name}</a>
                            <span class="count">x${item.quantity}</span>
                        </h5>
                        <span class="attributes-select attributes-color">${item.product_details.inventory_details["color-list"]}</span>
                        <span class="attributes-select attributes-size">${item.product_details.inventory_details["size-list"]}</span>
                        <div class="price">
                            Rs.${item.total/100}
                        </div>
                        <div style="display:flex;flex-direction:row">
                            <p>Payment status : </p>
                            <span style="width:10px"></span>
                            ${
                                item.status === 'Payment Done'
                                ? `<h5 style="color:green">Done</h5>`
                                : item.status === 'Payment Refunded'
                                    ? `<h5 style="color:green"> ${item.status}</h5>`
                                    : `<h5 style="color:red"> ${item.status}</h5>`
                            }
                        </div>
                    </div>
                </li>
                <div class="order-bottom">
                    <div class="availability">
                        <div style="display:flex;flex-direction:row">
                            <p>Status :</p>
                            <span style="width:10px"></span>
                            <h5> ${item.tracking_details.status.toUpperCase()}</h5>
                            <span style="width:10px"></span>
                            ${
                                item.tracking_details.is_cancelled === 1
                                ? `<span>(${item.tracking_details.cancelled_at.substring(0,10)})</span>`
                                : `<span>(${item.tracking_details.order_at.substring(0,10)})</span>`
                            }
                        </div>
                        ${
                            item.tracking_details.track_link === null
                            ? ''
                            : `<div style="display:flex;flex-direction:row">
                                <p>Track link : </p>
                                <a href="${item.tracking_details.track_link}" target="new">${item.tracking_details.track_link}</a>
                            </div>`
                        }
                    </div>
                    ${
                        item.tracking_details.is_cancelled === null && item.tracking_details.delivered_at === null
                        ? `<div class="button-box">
                            <button class="button cancelButton" name="${item.order_id}">Cancel</button>
                        </div>`
                        : ''
                    }
                </div>
                <div class="review-bottom">
                    <div class="review-box">
                        <input type="text" placeholder="Write a review" id="reviewText-${item.order_id}"/>
                        <select defaultValue="5" id="rating-${item.order_id}" class="select-rating">
                            <option value="5">Rating : 5</option>
                            <option value="4">Rating : 4</option>
                            <option value="3">Rating : 3</option>
                            <option value="2">Rating : 2</option>
                            <option value="1">Rating : 1</option>
                        </select>
                        <button name="${item.order_id}" class="saveReview">save</button>
                    </div>
                </div>
            </ul>
        </div>`
    }

    if(result.length > 0){
        let htmlTemplate = '';

        if(result.length > 0){
            for(let i=0;i<result.length;i++){
                htmlTemplate = htmlTemplate + ordersTemplate(result[i]);
            }
        }else{
            htmlTemplate = "<p>You're not ordered anything yet, go to <a href='/index.html'>Home</a></p>"
        }

        document.getElementById("orderList").innerHTML = htmlTemplate;

        const cancelButtons = document.querySelectorAll(".cancelButton");
        cancelButtons.forEach((button)=>{
            button.addEventListener('click',handleCancelOrder);
        })

        const reviewButtons = document.querySelectorAll(".saveReview");
        reviewButtons.forEach((button)=>{
            button.addEventListener('click',handleReview);
        })

    }else{
        toastr.error('Something went wrong!!');
        setTimeout(()=>{
            window.location.href = "./404page.html";
        },2000); 
    }
} catch (error) {
    console.log(error);
    window.location.href = "./404page.html";
}