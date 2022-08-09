async function addToWishlistAPI(params){

    return fetch(`https://srizon-proj.el.r.appspot.com/api/client/addToWishlist`,
            {
                method: 'POST',
                headers: new Headers({
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'charset': 'UTF-8'
                }),
                body: JSON.stringify({
                    'product_id': params.product_id,
                    'user_id': params.user_id,
                    'quantity': params.quantity
                })
            }
        ).then(response => response.json())
        .then(data => console.log(data))
        .catch((error)=>{
            console.log(error);
            return {'status': 503,'message': 'The server  is down. Please contact the Administrator'};
        })

}

export default addToWishlistAPI;