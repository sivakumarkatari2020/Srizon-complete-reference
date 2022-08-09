import axios from "axios";

const deleteProductAPI = async (id) => {
    return axios.get(`https://srizon-proj.el.r.appspot.com/api/admin/deleteProduct/${id}`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default deleteProductAPI;