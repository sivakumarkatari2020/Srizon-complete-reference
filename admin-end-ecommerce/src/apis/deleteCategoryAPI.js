import axios from "axios";

const deleteCategoryAPI = async (id) => {
    return axios.get(`https://srizon-proj.el.r.appspot.com/api/admin/deleteCategory/${id}`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default deleteCategoryAPI;