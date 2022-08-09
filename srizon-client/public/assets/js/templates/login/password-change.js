const butChange = document.getElementById("butChange");
const mailId = document.getElementById("mailId");
const oldPwd = document.getElementById("oldPwd");
const newPwd = document.getElementById("newPwd");
const confirmPwd = document.getElementById("confirmPwd");

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

const handlePasswordChange = async (mailId,oldPwd,newPwd) => {

    try{
        const credentials = {email:mailId,temp_password:oldPwd,password:newPwd};
        console.log(credentials);
    } catch (err) {
        console.log(err);
        toastr.error(err.message);
    }
}

butChange.addEventListener("click",(e)=>{
    e.preventDefault();

    if(mailId.value.length < 3){
        toastr.info("Please check your entered email!!");
    }
    else if(newPwd.value.length < 8){
        toastr.info("Password must be more than 8 digits!");
    }else if(newPwd.value !== confirmPwd.value){
        toastr.error("Passwords doesn't matched!!");
        confirmPwd.style.borderColor = 'red';
    }else{
        handlePasswordChange(mailId,oldPwd,newPwd);
    }

})