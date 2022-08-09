import axios from "axios";

const getSmallBannersAPI = async () => {
    return axios.get(`https://srizon-proj.el.r.appspot.com/api/client/getWrappBanners`)
    .then((result)=>{
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getSmallBannersAPI;