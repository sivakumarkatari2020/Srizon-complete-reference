import getUserDetailsAPI from "../../apis/client/getUserDetailsAPI.js";

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

    let result = [];

    if(user_id !== 0 && isLoggedIn){
        result = await getUserDetailsAPI(user_id);
    }else{
        toastr.error('Something went wrong!!');
        setTimeout(()=>{
            window.location.href = "./login.html";
        },2000); 
    }

    async function handleSubmit(e){
        e.preventDefault();

        const username = document.getElementById('username').value;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;

        const saveButton = document.getElementById('buttonSave');

        if(username === result[0].username && firstname === result[0].first_name && lastname === result[0].last_name){
            toastr.info("No changes detected to save!!");
        }else{

            let values = JSON.stringify({
                "id":result[0].id,
                "username":username,
                "first_name":firstname,
                "last_name":lastname,
            })

            saveButton.style.pointerEvents = 'none';

            const res = await fetch(`https://srizon-proj.el.r.appspot.com/api/client/updateUser`,
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

            if(res.status !== 200){
                toastr.error(res.message);

                saveButton.style.pointerEvents = 'all';
            }else{
                toastr.success(res.message);

                setTimeout(()=>{
                    window.location.reload();
                },2000);
            }
        }
    }

    function handleLogout(e){
        e.preventDefault();

        if(window.confirm("Are you sure you wan't to Logout??")){
            toastr.info("Logging out...");

            localStorage.removeItem("user_id");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("session_token");

            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("session_token");

            setTimeout(()=>{
                window.location.href="./login.html";
            },2000);
        }
    }

    function profileTemplate(item){
        return `
        <div class="shipping-address-form-wrapp">
            <div class="shipping-address-form  checkout-form">
                <div class="row-col-1 row-col">
                    <div class="shipping-address">
                        <h3 class="title-form">
                            Edit your details
                        </h3>
                        <p class="form-row form-row-first">
                            <label class="text">Email <span style="color:rgba(0,0,0,0.5);">(can't edit)</span></label>
                            <input title="email" type="email" readOnly class="input-text" value='${item.email}' id="email" placeholder="John@gmail.com">
                        </p>
                        <p class="form-row form-row-last">
                            <label class="text">Username</label>
                            <input title="username" type="text" class="input-text" value='${item.username}' id="username">
                        </p>
                        <p class="form-row form-row-first">
                            <label class="text">Firstname</label>
                            <input title="firstname" type="text" class="input-text" value='${item.first_name}' id="firstname">
                        </p>
                        <p class="form-row form-row-last">
                            <label class="text">Lastname</label>
                            <input title="lastname" type="text" value='${item.last_name}' class="input-text" id="lastname">
                        </p>
                        <p class="form-row form-row-first">
                            <label class="text">Password <span style="color:rgba(0,0,0,0.5);">(can't edit)</span></label>
                            <input title="password" type="password" readOnly class="input-text" value='${item.password}' id="password">
                        </p>
                        <p class="form-row form-row-last">
                            <label class="text"><span style="color:rgba(0,0,0,0.5);">Want to reset passowrd?</span></label>
                            <a href="./passwordChange.html" style="text-decoration:underline;color:blue;">Click here</a>
                        </p>
                    </div>
                </div>
            <button class="button button-payment" id="buttonSave">Save</button>
        </div>
        <div class="button-box">
            <button id="logoutBut">Logout</button>
            <button><a href="./myOrders.html" style="color:#fff">Manage Orders</a></button>
        </div>
        `
    }

    if(result.length > 0){
        let htmlTemplate = '';

        htmlTemplate = htmlTemplate + profileTemplate(result[0]);

        document.getElementById("profileDetails").innerHTML = htmlTemplate;

        document.getElementById("logoutBut").addEventListener('click',handleLogout);
        document.getElementById("buttonSave").addEventListener('click',handleSubmit);
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