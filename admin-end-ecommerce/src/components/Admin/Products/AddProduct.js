import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuid} from 'uuid';
import getCategorylistAPI from '../../../apis/getCategorylistAPI';
import addNewProductAPI from '../../../apis/addNewProductAPI';
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

function AddProduct() {

    let navigate = useNavigate();
    const [isData,setData] = React.useState(false);
    const [categories,setCategories] = React.useState([]);

    const [imageURLs,setImageURLs] = React.useState([]);

    const [butFreez,setButFreez] = React.useState(false);

    const [values,setValues] = React.useState({
        p_name : '',
        desc: '',
        o_price : 0,
        d_price : 0,
        category: '',
        quantity: 0,
        color: '',
        size: '',
        imageUrl: '',
    });

    const toastConfig = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }

    React.useEffect(()=>{
        async function fetchData(){
            const categories = await getCategorylistAPI();
            if(categories.status !== 200){
                setData(false);
            }else{
                setCategories(categories.data);
                setData(true);
            }
        };
        fetchData();
    },[])

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

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
            vals.imageUrl = JSON.stringify(urlString);

            const apiResponse = await addNewProductAPI(vals);
            if(apiResponse.data.status !== 200){
                console.log("Error 404");
                toast.error("Something went wrong!Try again later!!",toastConfig);
                setButFreez(false);
            }else{
                toast.success("Updated successfully!!",toastConfig);
                setTimeout(()=>{
                    navigate(-1)
                },2000)    
            }    
        } catch (err) {
            toast.error("Something went wrong,Try later!!",toastConfig);
            setButFreez(false);
        }
    }

    const onImageUpload = (e) => {
        if(e.target.files[0]){
            let date = new Date().toISOString()
            const storageRef = ref(storage, `products/${date.substring(0,10)}/${e.target.files[0].name + '-' + uuid()}`);
    
            const metadata = {
                contentType: e.target.files[0].type,
            };  

            const uploadTask = uploadBytesResumable(storageRef,e.target.files[0],metadata);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        default :
                            console.log('Upload is running');
                            break;
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
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
        //setValues({...values,imageUrl : e.target.files[0]});
    }

    return (
        <div className='container'>
            <ToastContainer />
            <h1>Add Product</h1>
            {
                isData
                ? <div className='edit-form'>
                    <div className='form-1 form'>
                        <div className='img-box'>
                            {
                                imageURLs.length < 5
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
                                <input type="text" name='p_name' value={values.p_name} autoComplete="off" className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field'>
                                <label>Description</label>
                                <textarea name='desc' value={values.desc} autoComplete="off" className='field-input large' onChange={handleChange}></textarea>
                            </div>
                            <div className='form-field'>
                                <label>Old Price <span>(in rupees)</span></label>
                                <input type="text" name='o_price' value={values.o_price} autoComplete="off" className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field'>
                                <label>New Price <span>(in rupees)</span></label>
                                <input type="text" name='d_price' value={values.d_price} autoComplete="off" className='field-input' onChange={handleChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className='form-2 form'>
                        <div className='form-content row'>
                            <div className='form-field row'>
                                <label>Category</label>
                                <select type="text" name='category' defaultValue={values.category} autoComplete="off" className='field-input select' onChange={handleChange}>
                                    {
                                        categories.map(categ => <option value={categ.id} key={categ.id}>{categ.category}</option>)
                                    }
                                </select>
                            </div>
                            <div className='form-field row'>
                            </div>
                        </div>
                    </div>
                    <div className='form-3 form'>
                        <div className='form-content row'>
                            <div className='form-field row'>
                                <label>No.of Units Available</label>
                                <input type="text" name='quantity' value={values.quantity} autoComplete="off" className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field row'>
                                <label>Color Available</label>
                                <input type="text" name='color' value={values.color} autoComplete="off" className='field-input' onChange={handleChange}></input>
                            </div>
                            <div className='form-field row'>
                                <label>Size Available</label>
                                <input type="text" name='size' value={values.size} autoComplete="off" className='field-input' onChange={handleChange}></input>
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

export default AddProduct