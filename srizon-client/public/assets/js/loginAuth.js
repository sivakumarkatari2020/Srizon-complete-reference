import verifyAPI from "./apis/client/verifyUserAPI.js";

const butLogin = document.getElementById("butLogin");
const username = document.getElementById("inpUser");
const password = document.getElementById("pwdUser");
const chkBox = document.getElementById("cb1");

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

const loginAuth = async (user,pass) => {

    try{
        butLogin.style.pointerEvents = 'none';
        butLogin.value = 'Logging...';

        const credentials = {username:user,password:pass}

        const result = await verifyAPI(credentials);
    
        if(result.status !== 200){
            toastr.error(result.message);
            butLogin.style.pointerEvents = 'all';
            butLogin.value = "Login";
        }else{
            toastr.success('Logged In Successfully!!')
            if(chkBox.checked){
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem("user_id",result.data[0].id);
                localStorage.setItem("session_token",result.data[0].session_token);
            }else{
                sessionStorage.setItem("isLoggedIn",true);
                sessionStorage.setItem("user_id",result.data[0].id);
                sessionStorage.setItem("session_token",result.data[0].session_token);
            }
            username.value = '';
            password.value = '';
            chkBox.checked = false;

            setTimeout(()=>{
                if(history.length < 3) window.location.href = "./index.html";
                else history.go(-1);
            },2000);
        }
    } catch (err) {
        console.log(err);
        butLogin.style.pointerEvents = 'all';
        butLogin.value = "Login";
        toastr.error(err.message);
    }
}

butLogin.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(username.value.length > 3 && password.value.length > 3){
        loginAuth(username.value,password.value);
    }else{
        toastr.info("Please provide valid credentials!");
    }

})