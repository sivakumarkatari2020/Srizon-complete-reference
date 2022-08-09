import axios from "axios";

const getProductlistAPI = async () => {
    return axios.get('https://srizon-proj.el.r.appspot.com/api/admin/getProductlist')
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getProductlistAPI;