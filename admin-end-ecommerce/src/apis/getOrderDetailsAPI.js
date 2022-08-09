import axios from "axios";

const getOrderDetailsAPI = async (id) => {
    return axios.get(`https://srizon-proj.el.r.appspot.com/api/admin/getOrderDetails/${id}`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getOrderDetailsAPI;