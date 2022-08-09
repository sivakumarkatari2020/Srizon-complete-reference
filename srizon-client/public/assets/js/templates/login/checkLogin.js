const profileButton = document.getElementById("profileUser");

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

profileButton.addEventListener("click",() => {
    if(isLoggedIn && user_id !== 0){
        window.location.href = "./profile.html"
    }else{
        window.location.href = "./login.html";
    }
})