async function verifyAPI(params){

    return fetch(`https://srizon-proj.el.r.appspot.com/api/login/verify`,
            {
                method: 'POST',
                headers: new Headers({
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'charset': 'UTF-8'
                }),
                body: JSON.stringify({
                    'usermail': params.username,
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

export default verifyAPI;