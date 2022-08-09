async function registerAPI(params){

    return fetch(`https://srizon-proj.el.r.appspot.com/api/register/new`,
            {
                method: 'POST',
                headers: new Headers({
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'charset': 'UTF-8'
                }),
                body: JSON.stringify({
                    'email': params.email,
                    'username': params.username,
                    'password': params.password
                })
            }
        ).then(response => response.json())
        .then(data => data)
        .catch((error)=>{
            console.log(error);
            return {'status': 503,'message': 'The server  is down. Please contact the Administrator'};
        })

}

export default registerAPI;