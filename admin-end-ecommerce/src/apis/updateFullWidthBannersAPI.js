import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const updateFullWidthBannersAPI = async (values) => {
    return axios.post(`https://srizon-proj.el.r.appspot.com/api/admin/updateFullWidthBanners`,values,axiosConfig)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default updateFullWidthBannersAPI;