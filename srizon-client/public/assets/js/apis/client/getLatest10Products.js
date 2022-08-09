const getLatest10Products = async () => {
    return fetch('https://srizon-proj.el.r.appspot.com/api/client/getLatest10Products')
    .then(response => response.json())
    .then(data => data)
    .catch((error)=>{
        console.log(error);
        return {'status': 404,'message': error}
    })
}

export default getLatest10Products;