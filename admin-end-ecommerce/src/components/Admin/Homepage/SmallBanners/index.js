import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuid} from 'uuid';
import getSmallBannersAPI from '../../../../apis/getSmallBannersAPI';
import updateSmallWidthBannersAPI from '../../../../apis/updateSmallWidthBannersAPI';
import '../../Globals/styles/style.css';
import '../../Products/style.css';

import {storage} from '../../../../firebase';
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';

function FullWidthBanners() {

    const [isData,setData] = React.useState(false);

    const [banner1,setBanner1] = React.useState();
    const [banner2,setBanner2] = React.useState();
    const [banner3,setBanner3] = React.useState();

    const [image1,setImage1] = React.useState('');
    const [image2,setImage2] = React.useState('');
    const [image3,setImage3] = React.useState('');

    const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    }

    async function fetchData(){
        setData(false);
        const apiResponse = await getSmallBannersAPI();
        if(apiResponse.status !== 200){
            console.log("Error 404");
            toast.error('Error in loading data,try later!!');
        }else{
            setBanner1(apiResponse.data[0]);
            setImage1(apiResponse.data[0].image_path);

            setBanner2(apiResponse.data[1]);
            setImage1(apiResponse.data[1].image_path);

            setBanner3(apiResponse.data[2]);
            setImage1(apiResponse.data[2].image_path);
            setData(true);
        }    
    }

    React.useEffect(()=>{
        fetchData();
    },[]);

    const handleChange = (e,id) => {
        if(id === 1){
            setBanner1({...banner1,[e.target.name] : e.target.value});
        }
        if(id === 2){
            setBanner2({...banner2,[e.target.name] : e.target.value});
        }
        if(id === 3){
            setBanner3({...banner3,[e.target.name] : e.target.value});
        }
    }

    const handleSubmit = async (id) => {
        let status = false;
        if(id === 1){
            if(banner1.b_title.length > 3 && banner1.desc.length > 0 && image1 !== null){
                status = true;
            }
        }
        if(id === 2){
            if(banner2.b_title.length > 3 && banner2.desc.length > 0 && image2 !== null){
                status = true;
            }
        }
        if(id === 3){
            if(banner3.b_title.length > 3 && banner3.desc.length > 0 && image3 !== null){
                status = true;
            }
        }

        if(status && window.confirm("Are you sure to change the banner??")){
            try{
                let apiResponse = {};
                if(id === 1){
                    let vals = banner1;
                    vals.image_path = image1;
                    apiResponse = await updateSmallWidthBannersAPI(vals);
                }
                if(id === 2){
                    let vals = banner2;
                    vals.image_path = image2;
                    apiResponse = await updateSmallWidthBannersAPI(vals);
                }
                if(id === 3){
                    let vals = banner3;
                    vals.image_path = image3;
                    apiResponse = await updateSmallWidthBannersAPI(vals);
                }
                
                if(apiResponse.data.status !== 200){
                    toast.error(apiResponse.data.message,toastConfig);
                }else{
                    toast.success(apiResponse.data.message,toastConfig);
                    setTimeout(()=>{
                        window.location.reload();
                    },2000);
                }
            } catch (err) {
                console.log(err);
            }
        }else{
            return toast.error('Please enter valid fields!!');
        }
    }

    function fileUpload1(e){
        if(e.target.files[0]){
            const storageRef = ref(storage, `banners/small/${e.target.files[0].name + '-' + uuid()}`);
    
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
                        setImage1(downloadURL);
                        toast.success('Image uploaded successfully',toastConfig);
                    });
                }                
            )
        }
    }

    function fileUpload2(e){
        if(e.target.files[0]){
            const storageRef = ref(storage, `banners/small/${e.target.files[0].name + '-' + uuid()}`);
    
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
                        setImage2(downloadURL);
                        toast.success('Image uploaded successfully',toastConfig);
                    });
                }                
            )
        }
    }

    function fileUpload3(e){
        if(e.target.files[0]){
            const storageRef = ref(storage, `banners/small/${e.target.files[0].name + '-' + uuid()}`);
    
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
                        setImage3(downloadURL);
                        toast.success('Image uploaded successfully',toastConfig);
                    });
                }                
            )
        }
    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='category-header'>
                <h1>Edit Small Banners</h1>
            </div>
            {
                isData
                ? <>
                    <div className='container'>
                        <div className='category-header'>
                            <h2 style={{color:'rgba(0,0,0,0.5)'}}>Banner 1</h2>
                            <div className='button-box large' style={{justifyContent:'flex-end',paddingRight:'2rem'}}>
                                <button className='green-but button large' onClick={() => handleSubmit(1)}>Save</button>
                            </div>
                        </div>
                        <div className='form'>
                            <div className='form-content'>
                                <div className='form-field'>
                                    <label>Title</label>
                                    <input type='text' value={banner1.b_title} className='field-input' name='b_title' onChange={(e) => handleChange(e,1)}></input>
                                </div>
                                {
                                    banner1.s_title === null
                                    ? ''
                                    : <div className='form-field'>
                                        <label>Small Title</label>
                                        <input type='text' value={banner1.s_title === null ? '' : banner1.s_title} className='field-input' name='s_title' onChange={(e) => handleChange(e,1)}></input>
                                    </div>
                                }
                                <div className='form-field'>
                                    <label>Description</label>
                                    <textarea value={banner1.desc === null ? '' : banner1.desc} className='field-input textarea' name='desc' onChange={(e) => handleChange(e,2)}/>
                                </div>
                                {
                                    banner1.price === null
                                    ? ''
                                    : <div className='form-field'>
                                        <label>Price</label>
                                        <input type='price' value={banner1.price} className='field-input' name='price' onChange={(e) => handleChange(e,1)}></input>
                                    </div>
                                }
                            </div>
                            <div className='form-content'>
                                <div className='img-box' style={{maxHeight: '300px'}}>
                                    {
                                        image1 === null
                                        ? <input type="file" accept="images/*" onChange={fileUpload1}></input>
                                        : <>
                                            <img src={image1} alt="uploaded banner pic 1" style={{maxHeight: '300px'}}/>
                                            <button onClick={()=>setImage1(null)} className='but-remove'>Remove</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Banner 2 */}
                    <div className='container'>
                        <div className='category-header'>
                            <h2 style={{color:'rgba(0,0,0,0.5)'}}>Banner 2</h2>
                            <div className='button-box large' style={{justifyContent:'flex-end',paddingRight:'2rem'}}>
                                <button className='green-but button large' onClick={() => handleSubmit(2)}>Save</button>
                            </div>
                        </div>
                        <div className='form'>
                            <div className='form-content'>
                                <div className='form-field'>
                                    <label>Title</label>
                                    <input type='text' value={banner2.b_title} className='field-input' name='b_title' onChange={(e) => handleChange(e,2)}></input>
                                </div>
                                {
                                    banner2.s_title === null
                                    ? ''
                                    : <div className='form-field'>
                                        <label>Small Title</label>
                                        <input type='text' value={banner2.s_title === null ? '' : banner2.s_title} className='field-input' name='s_title' onChange={(e) => handleChange(e,2)}></input>
                                    </div>
                                }
                                <div className='form-field'>
                                    <label>Description</label>
                                    <textarea value={banner2.desc === null ? '' : banner2.desc} className='field-input textarea' name='desc' onChange={(e) => handleChange(e,2)}/>
                                </div>
                                {
                                    banner2.price === null
                                    ? ''
                                    : <div className='form-field'>
                                        <label>Price</label>
                                        <input type='price' value={banner2.price} className='field-input' name='price' onChange={(e) => handleChange(e,2)}></input>
                                    </div>
                                }
                            </div>

                            <div className='form-content'>
                                <div className='img-box' style={{maxHeight: '300px'}}>
                                    {
                                        image2 === null
                                        ? <input type="file" accept="images/*" onChange={fileUpload2}></input>
                                        : <>
                                            <img src={image2} alt="uploaded banner pic 2"  style={{maxHeight: '300px'}}/>
                                            <button onClick={()=>setImage2(null)} className='but-remove'>Remove</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Banner 3 */}
                    <div className='container'>
                        <div className='category-header'>
                            <h2 style={{color:'rgba(0,0,0,0.5)'}}>Banner 3</h2>
                            <div className='button-box large' style={{justifyContent:'flex-end',paddingRight:'2rem'}}>
                                <button className='green-but button large' onClick={() => handleSubmit(3)}>Save</button>
                            </div>
                        </div>
                        <div className='form'>
                            <div className='form-content'>
                                <div className='form-field'>
                                    <label>Title</label>
                                    <input type='text' value={banner3.b_title} className='field-input' name='b_title' onChange={(e) => handleChange(e,3)}></input>
                                </div>
                                {
                                    banner3.s_title === null
                                    ? ''
                                    : <div className='form-field'>
                                        <label>Small Title</label>
                                        <input type='text' value={banner3.s_title === null ? '' : banner3.s_title} className='field-input' name='s_title' onChange={(e) => handleChange(e,3)}></input>
                                    </div>
                                }
                                <div className='form-field'>
                                    <label>Description</label>
                                    <textarea value={banner3.desc === null ? '' : banner3.desc} className='field-input textarea' name='desc' onChange={(e) => handleChange(e,3)}/>
                                </div>
                                {
                                    banner3.price === null
                                    ? ''
                                    : <div className='form-field'>
                                        <label>Price</label>
                                        <input type='price' value={banner3.price} className='field-input' name='price' onChange={(e) => handleChange(e,3)}></input>
                                    </div>
                                }
                            </div>

                            <div className='form-content'>
                                <div className='img-box' style={{maxHeight:'300px'}}>
                                    {
                                        image3 === null
                                        ? <input type="file" accept="images/*" onChange={fileUpload3}></input>
                                        : <>
                                            <img src={image3} alt="uploaded banner pic 3"  style={{maxHeight: '300px'}}/>
                                            <button onClick={()=>setImage3(null)} className='but-remove'>Remove</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : 'Loading...'
            }
        </div>
    )
}

export default FullWidthBanners