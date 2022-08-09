import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuid} from 'uuid';
import getProductDetailsAPI from '../../../apis/getProductDetailsAPi';
import getCategorylistAPI from '../../../apis/getCategorylistAPI';
import updateProductDetailsAPI from '../../../apis/updateProductDetailsAPI';
import '../Globals/styles/style.css';
import './style.css';

import {storage} from '../../../firebase';
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';

// import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function EditProduct(){

    let params = useParams();
    let navigate = useNavigate();

    const [isData,setData] = React.useState(false);
    const [categories,setCategories] = React.useState([]);

    const [butFreez,setButFreez] = React.useState(false);

    const [imageURLs,setImageURLs] = React.useState([]);

    const [values,setValues] = React.useState({
        id: 0,
        C_id: 0,
        I_id: 0,
        p_name : '',
        desc: '',
        o_price : 0,
        d_price : 0,
        category: '',
        quantity: 0,
        color: '',
        size: '',
        image_path: ''
    });

    const toastConfig = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    React.useEffect(()=>{
        async function fetchData(){
            setData(false);
            const apiResponse = await getProductDetailsAPI(params.id);
            if(apiResponse.status !== 200){
                console.log("Error 404")
            }else{
                const categories = await getCategorylistAPI();
                if(categories.status !== 200){
                    setData(false);
                }else{
                    setCategories(categories.data);
                    setValues({
                        id : apiResponse.data[0].id,
                        C_id : apiResponse.data[0].category_id !== null ? apiResponse.data[0].category_details.id : 0,
                        I_id : apiResponse.data[0].inventory_id !== null ? apiResponse.data[0].inventory_details.id : 0,
                        p_name : apiResponse.data[0].name !== null ? apiResponse.data[0].name : '',
                        desc: apiResponse.data[0].desc !== null ? apiResponse.data[0].desc : '',
                        o_price : apiResponse.data[0].o_price !== null ? apiResponse.data[0].o_price : 0,
                        d_price : apiResponse.data[0].d_price !== null ? apiResponse.data[0].d_price : 0,
                        category: apiResponse.data[0]?.category_details?.category !== null ? apiResponse.data[0]?.category_details?.category : '',
                        quantity: apiResponse.data[0]?.inventory_details.quantity !== null ? apiResponse.data[0]?.inventory_details.quantity : '',
                        color: apiResponse.data[0]?.inventory_details['color-list'] !== null ? apiResponse.data[0]?.inventory_details['color-list'] : '',
                        size: apiResponse.data[0]?.inventory_details['size-list'] !== null ? apiResponse.data[0]?.inventory_details['size-list'] : '',
                        stars: apiResponse.data[0]?.stars !== null ? apiResponse.data[0]?.stars : 0,
                        image_path: apiResponse.data[0]?.image_path !== null ? apiResponse.data[0].image_path : ''
                    })
                    setData(true);
                    let imgObj = JSON.parse(apiResponse.data[0]?.image_path);
                    setImageURLs([...imgObj?.links]);            
                }
            }    
        }
        fetchData();
    },[params.id]); 

    const handleSubmit = async(values) => {

        if(!imageURLs.length > 0){
            toast.error("Please add atleast one image to proceed!!");
            return;
        }
        if(values.p_name.length < 3){
            toast.error("Please add product name!!",toastConfig);
            return;
        }
        if(values.o_price <= 0 || values.d_price <= 0){
            toast.error("Please enter correct price!!",toastConfig);

            return;
        }
        if(values.quantity <= 0){
            toast.error("Please add No.of units!!",toastConfig);
            return;
        }
        if(Number(values.o_price) < Number(values.d_price)){
            toast.info("Discount price shouldn't be greater than Original Price",toastConfig);
            return;
        }
        try{
            setButFreez(true);

            let vals = values;

            let urlString = {
                links: []
            };
            imageURLs.map(url => urlString.links.push(url));
            vals.image_path = JSON.stringify(urlString);

            const apiResponse = await updateProductDetailsAPI(vals);
            if(apiResponse.data.status !== 200){
                console.log("Error 404");
                toast.error("Something went wrong!Try again later!!",toastConfig);
                setButFreez(false);
            }else{
                console.log("Updated Successfully!!");
                toast.success("Updated successfully!!",toastConfig);
                setTimeout(()=>{
                    navigate(-1)
                },2000)    
            }    
        } catch (err) {
            console.log(err);
            toast.error(err.message,toastConfig);
            setButFreez(false);
        }
    }

    const onImageUpload = (e) => {
        if(e.target.files[0]){

            const storageRef = ref(storage, `images/${e.target.files[0].name + '-' + uuid()}`);
    
            const metadata = {
                contentType: e.target.files[0].type,
            };  

            const uploadTask = uploadBytesResumable(storageRef,e.target.files[0],metadata);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    toast.info('Upload is ' + progress + '% done',toastConfig);
                    switch (snapshot.state) {
                        default :
                            toast.info('Upload is running',toastConfig);
                            break;
                        case 'paused':
                            toast.info('Upload is paused',toastConfig);
                            break;
                        case 'running':
                            toast.info('Upload is running',toastConfig);
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        let arr = [...imageURLs];
                        arr.push(downloadURL);
                        setImageURLs(arr);
                        toast.success('Image uploaded successfully',toastConfig);
                    });
                }                
            )

        }
    }

    return(
        <div className='container'>
            <ToastContainer />
            <h1>Edit Product</h1>
            {
                isData
                ? <div className='edit-form'>
                    <div className='form-1 form'>
                        <div className='img-box'>

                            {
                                imageURLs.length === 0
                                ? <input type="file" accept="images/*" onChange={onImageUpload}></input>
                                : ''
                            }

                            <Swiper
                                // install Swiper modules
                                modules={[Navigation, Pagination, A11y]}
                                spaceBetween={100}
                                slidesPerView={1}
                                navigation={true}
                                pagination={{ clickable: true }}
                                className='add-profile-pic'
                            >
                                {imageURLs.map(imgSrc => 
                                    <SwiperSlide className='slide slide-1' key={uuid()}>
                                        <img src={imgSrc} alt="uploaded product pic" key={uuid()}/>
                                    </SwiperSlide>
                                )}
                            </Swiper>

                            {
                                imageURLs.length > 0
                                ? <button className='but-remove' onClick={() => {
                                    setImageURLs([]);
                                }}>Remove All</button>
                                : ''
                            }

                        </div>
                        <div className='form-content'>
                            <div className='form-field'>
                                <label>Name</label>
                                <input type="text" name='p_name' value={values.p_name} className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field'>
                                <label>Description</label>
                                <textarea name='desc' value={values.desc} className='field-input large' onChange={handleChange}></textarea>
                            </div>
                            <div className='form-field'>
                                <label>Old Price <span>(in rupees)</span></label>
                                <input type="text" name='o_price' value={values.o_price} className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field'>
                                <label>New Price <span>(in rupees)</span></label>
                                <input type="text" name='d_price' value={values.d_price} className='field-input' onChange={handleChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className='form-2 form'>
                        <div className='form-content row'>
                            <div className='form-field row'>
                                <label>Category</label>
                                <select type="text" name='category' defaultValue={values.category} className='field-input select' onChange={handleChange}>
                                    {
                                        categories.map(categ => <option value={categ.id} key={categ.id}>{categ.category}</option>)
                                    }
                                </select>
                            </div>
                            <div className='form-field row'>
                                <label>Rating <span>(can't edit this)</span></label>
                                <input type="text" value={values.stars} className='field-input' onChange={()=>undefined}></input>
                            </div>
                        </div>
                    </div>
                    <div className='form-3 form'>
                        <div className='form-content row'>
                            <div className='form-field row'>
                                <label>No.of Units Available</label>
                                <input type="text" name='quantity' value={values.quantity} className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field row'>
                                <label>Colors Available</label>
                                <input type="text" name='color' value={values.color} className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field row'>
                                <label>Sizes Available</label>
                                <input type="text" name='size' value={values.size} className='field-input' onChange={handleChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className='button-box large'>
                        {
                            butFreez
                            ? <>
                                <button className='red-but button large' style={{color:'#666',borderColor:'#666',pointerEvents:'none'}}>Cancel</button>
                                <button className='green-but button large' style={{color:'#666',backgroundColor:'#666',pointerEvents:'none'}}>Save</button>
                            </>
                            : <>
                                <button className='red-but button large' onClick={() => navigate(-1)}>Cancel</button>
                                <button className='green-but button large' onClick={() => handleSubmit(values,values.id)}>Save</button>
                            </>
                        }
                    </div>
                </div>
                : 'Loading...'
            }
        </div>
    )
}

export default EditProduct;