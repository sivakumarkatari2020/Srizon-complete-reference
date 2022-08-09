import registerAPI from "./apis/client/registerUserAPI.js";

const btnRegister = document.getElementById("btnRegister");
const email = document.getElementById("inpMailReg")
const username = document.getElementById("inpUserReg");
const password = document.getElementById("inpPwdReg");
const chkBox = document.getElementById("cb2");

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

const registerAuth = async (mail,u_name,pass) => {

    try{
        const details = {'email':mail,'username':u_name,'password':pass}
        btnRegister.style.pointerEvents = 'none';
        btnRegister.value = 'Loading...';

        const result = await registerAPI(details);

        if(result?.status !== 200){
            toastr.error(result.message);
            btnRegister.style.pointerEvents = 'all';
            btnRegister.value = 'Register Now';    
        }else{
            toastr.success(result.message);
            email.value = '';
            username.value = '';
            password.value = '';
            chkBox.checked = false;

            setTimeout(()=>{
                window.location.reload();
            },2000);
        }

    } catch (error) {
        console.log(err);
        btnRegister.style.pointerEvents = 'all';
        btnRegister.value = 'Register Now';    
        toastr.error(err.message);
    }
}

btnRegister.addEventListener("click",(e)=>{
    e.preventDefault();

    if(chkBox.checked){

        if(username.value.length > 3 && password.value.length > 3 && email.value.length > 3){
            registerAuth(email.value,username.value,password.value);
        }else{
            toastr.info('Please provide valid details.');
        }

    }else{
        toastr.info('Please make sure you checked the checkbox.');
    }
})