import getProductDetails from "../../apis/client/getProductDetailsAPI.js";

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

    let paramStr = window.location.search;

    paramStr = paramStr.substring(1,paramStr.length);

    let paramArr = paramStr.split("&");

    const paramObj = {};

    for(let i=0;i<paramArr.length;i++){
        let params = paramArr[i].split("=");
        paramObj[params[0]]=params[1]
    }

    const productId = paramObj.product_id;

    const result = await getProductDetails(productId);

    const button = document.getElementById('button-payment');

    const createOrder = async (values) => {

        const result = fetch(`https://srizon-proj.el.r.appspot.com/api/client/create/orderId`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'charset': 'UTF-8'
                    }),
                    body: values
                }
            ).then(response => response.json())
            .then(data => data)
            .catch((error)=>{
                console.log(error);
                return {'status': 503,'message': 'The server  is down. Please contact the Administrator'};
            })

        return result;
    }

    const verifyPayment = async (values) => {

        const result = fetch(`https://srizon-proj.el.r.appspot.com/api/client/payment/verify`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'charset': 'UTF-8'
                    }),
                    body: values
                }
            ).then(response => response.json())
            .then(data => data)
            .catch((error)=>{
                console.log(error);
                return {'status': 503,'message': 'The server  is down. Please contact the Administrator'};
            })

        return result;
    }

    const restoreQuantity = async (values) => {

        const result = fetch(`https://srizon-proj.el.r.appspot.com/api/client/restore/quantity`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'charset': 'UTF-8'
                    }),
                    body: values
                }
            ).then(response => response.json())
            .then(data => data)
            .catch((error)=>{
                console.log(error);
                return {'status': 503,'message': 'The server  is down. Please contact the Administrator'};
            })

        return result;
    }

    function previewTemplate(item){
        try{
            const quantity = document.getElementById('quantity').value;
            return `<h3 class="title-form">
                        Your Order
                    </h3>
                    <ul class="list-product-order">
                        <li class="product-item-order">
                            <div class="product-thumb">
                                <a href="./productdetails.html?product_id=${item.id}">
                                    <img src="${JSON.parse(item.image_path).links[0]}" alt="img-${item.name}">
                                </a>
                            </div>
                            <div class="product-order-inner">
                                <h5 class="product-name">
                                    <a href="./productdetails.html?product_id=${item.id}">${item.name}</a>
                                </h5>
                                <span class="attributes-select attributes-color">${item.inventory_details['color-list']}</span>
                                <span class="attributes-select attributes-size">${item.inventory_details['size-list']}</span>
                                <div class="price">
                                    Rs.${item.d_price}
                                    <span class="count">x${quantity}</span>
                                </div>
                            </div>
                        </li>
                        <div class="availability"  style="display:flex;flex-direction:row;">
                            Availability:
                            ${item?.inventory_details?.quantity >= 25 
                                ? '<p style="color:blue;font-weight:bold;">In Stock</p>' 
                                : item?.inventory_details?.quantity > 10
                                    ? `<p style="color:orange;font-weight:bold;">Only ${item?.inventory_details?.quantity} left</p>`
                                    : `<p style="color:red;font-weight:bold;">Hurry! only ${item?.inventory_details?.quantity} left</p>`}
                        </div>
                    </ul>
                    `
        } catch (err) {
            console.log(err);
            toastr.error('Unable to proceed!!Redirecting to Home');
            setTimeout(()=>{
                window.location.href = "./404page.html";
            },2000);
            return null;
        }
    }

    async function validateForm(){

        button.innerText = 'Loading...';
        button.style.pointerEvents = 'none';

        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;
        const address = document.getElementById('address').value;
        const quantity = document.getElementById('quantity').value;

        if(email.length < 3 || !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)){
            toastr.error('Please enter valid Email Adress.');
            button.innerText = 'Payment';
            button.style.pointerEvents = 'all';    
            return;
        }
        if(mobile.length < 3 || !/^[0-9]{10}$/.test(mobile)){
            toastr.error('Please enter valid 10 digit Mobile Number.');
            button.innerText = 'Payment';
            button.style.pointerEvents = 'all';    
            return;
        }
        if(state.length < 3){
            toastr.error('Please enter valid State name.');
            button.innerText = 'Payment';
            button.style.pointerEvents = 'all';    
            return;
        }
        if(city.length < 3){
            toastr.error('Please enter valid city name.');
            button.innerText = 'Payment';
            button.style.pointerEvents = 'all';    
            return;
        }
        if(zip.length < 4 || !/^[0-9]{4,6}$/.test(zip)){
            toastr.error('Please enter valid ZIP code.');
            button.innerText = 'Payment';
            button.style.pointerEvents = 'all';    
            return;
        }
        if(address.length < 5){
            toastr.error('Please enter valid Address.');
            button.innerText = 'Payment';
            button.style.pointerEvents = 'all';    
            return;
        }

        const result = await createOrder(JSON.stringify({
            'user_id':user_id,
            'product_id': productId,
            'quantity':quantity,
            'values':{
                'email':email,
                'mobile':mobile,
                'country':country,
                'state':state,
                'city':city,
                'zip':zip,
                'address':address
            }
        }));
        console.log(result);

        if(result.status !== 200){
            toastr.error(result.message);
            button.innerText = 'Payment';
            button.style.pointerEvents = 'all';    
        }else{

            let dataObj = {
                'order_id' : '',
                'payment_id': '',
                'payment_signature' : '',
                'status' : '',
            }

            try{
                var options = {
                    "key": "rzp_test_4QxJ2ZJcCKwl8I", // Enter the Key ID generated from the Dashboard
                    "amount": Number(result.amount) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Srizon Stores",
                    "description": "Transactions are done through Razorpay.",
                    "image": "https://example.com/your_logo",
                    "order_id": result.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response){

                        dataObj.order_id = response.razorpay_order_id;
                        dataObj.payment_id = response.razorpay_payment_id;
                        dataObj.payment_signature = response.razorpay_signature;
                        dataObj.status = 1;

                        const res = await verifyPayment(JSON.stringify(dataObj));
                        if(res.signatureIsValid){
                            toastr.success("Payment Successfully completed!!");
                            setTimeout(()=>{
                                window.location.href='./orderSuccess.html';
                            },2000);
                        }else{
                            toastr.error("Payment is not Authorized");
                            button.innerText = 'Payment';
                            button.style.pointerEvents = 'all';                    
                            let res = await restoreQuantity(JSON.stringify({
                                'inventory_id' : result[0].inventory_details.id,
                                'units' : quantity
                            }))
                            if(res.status !== 200){
                                toastr.error(res.message);
                            }else{
                                toastr.info(res.message);
                            }
                        }
                    },
                    "theme": {
                        "color": "#7f87ab"
                    }
                };        
            
                var rzp1 = new Razorpay(options);
                rzp1.on('payment.failed', async function (response){
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);

                    let res = await restoreQuantity(JSON.stringify({
                        'inventory_id' : result[0].inventory_details.id,
                        'units' : quantity
                    }))
                    if(res.status !== 200){
                        toastr.error(res.message);
                    }else{
                        toastr.info(res.message);
                    }

                    toastr.error(response.error.description);

                    setTimeout(()=>{
                        window.location.reload();
                    },3000);
                });
                rzp1.open();
            } catch (error) {
                console.log(error);
            }
        }
    }

    if(user_id === 0 && !isLoggedIn){
        window.location.href = "./login.html";
    }else{
        try{
            document.getElementById('order-preview').innerHTML = previewTemplate(result[0]);
        
            button.addEventListener('click',validateForm);
        } catch (err) {
            console.log(err);

            toastr.error('Unable to proceed!!');

            setTimeout(()=>{
                window.location.href = "./404page.html";
            },2000);
        }
    }
} catch (err) {
    console.log(err);
    toastr.error('Unable to load the page,server problem!!');

    setTimeout(()=>{
        window.location.href = "./404page.html";
    },2000);
}