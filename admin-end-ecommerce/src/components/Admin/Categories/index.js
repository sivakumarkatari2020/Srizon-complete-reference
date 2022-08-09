import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Globals/Header';
import getCategorylistAPI from '../../../apis/getCategorylistAPI';
import deleteCategoryAPI from '../../../apis/deleteCategoryAPI';
import '../Globals/styles/style.css';
import './style.css';
import addNewCategoryAPI from '../../../apis/addNewCategoryAPI';

function Categories() {

    const [isData,setData] = React.useState(false);
    const [categories,setCategories] = React.useState([]);
    const [values,setValues] = React.useState({
        category : '',
        parent_categ : null,
    });

    const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    }

    React.useEffect(()=>{
        async function fetchData(){
            try{
                setData(false);
                const apiResponse = await getCategorylistAPI();
                if(apiResponse.status !== 200){
                    console.log("Error 404")
                }else{
                    setCategories(apiResponse.data);
                    setData(true);
                }    
            } catch (err) {
                toast.error(err.message);
            }
        }
        fetchData();
    },[]);

    const deleteCategory = (id) => {
        async function removeCategory(){
            if(window.confirm("Are you sure to delete this category??\nIt will delete children categories also!")){
                try{
                    const apiResponse = await deleteCategoryAPI(id);
                    if(apiResponse.status !== 200){
                        console.log("Error 404");
                        toast.error("Something went wrong!Try again later!!",toastConfig);
                    }else{
                        toast.success("Deleted successfully!!",toastConfig);
                        setTimeout(()=>{
                            window.location.reload();
                        },2000);
                    }   
                } catch (err) {
                    toast.error(err.message);
                }
            }else{
                return;
            }
        }
        removeCategory()      
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const addCategory = async (e) => {
        e.preventDefault();

        if(values.category.length > 3 && /^[A-Za-z ]+/.test(values.category)){
            try{
                const result = await addNewCategoryAPI(values);
                if(result.data.status !== 200){
                    toast.error(result.data.message,toastConfig);
                }else{
                    toast.success(result.data.message,toastConfig);
                    setTimeout(()=>{
                        window.location.reload();
                    },2000);
                }
            } catch (err) {
                toast.error(err.message,toastConfig);
            }
        }else{
            toast.error("Please enter a valid category name",toastConfig);
        }
    }
    
    return (
        <>
            <Header isSearchBox={false}/>
            <ToastContainer />
            <div className='container'>
                {
                    isData
                    ? <>
                        <div className='add-category'>
                            <div className='form-field row'>
                                <label>Category</label>
                                <input type='text' className='field-input' name='category' placeholder='Enter Category' value={values.category} onChange={handleChange}></input>
                            </div>
                            <div className='form-field row'>
                                <label>Parent Category</label>
                                <select type="text" name='parent_categ' defaultValue={values.parent_categ} autoComplete="off" className='field-input select' onChange={handleChange}>
                                    <option value={null} key={0}>null</option>
                                    {
                                        categories.map(categ => categ.parent_categ === null ? <option value={categ.id} key={categ.id}>{categ.category}</option> : '')
                                    }
                                </select>
                            </div>
                            <button className='but-add' onClick={(e)=>{
                                e.preventDefault();
                                addCategory(e);
                            }}>Add +</button>
                        </div>
                        <p>Info : parent category 'null' means it is top level category.</p>
                        <div className='inner-category1'>
                            <div className='category-header'>
                                <h1>Main Categories</h1>
                            </div>
                            <table className='inner-container'>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map(category => {
                                            let template = '';
                                            if(category.parent_categ === null){
                                                template = <tr key={category.id}>
                                                            <td>{category.id}</td>
                                                            <td>{category.category}</td>
                                                            <td className='button-box'>
                                                                <button className='red-but' onClick={()=>deleteCategory(category.id)}>Delete</button>
                                                            </td>
                                                        </tr>        
                                            }
                                            return template;
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='inner-category2'>
                            <div className='category-header'>
                                <h1>Sub Categories</h1>
                            </div>
                            <table className='inner-container'>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Category</th>
                                        <th>Parent</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map(category => {
                                            let template = '';
                                            if(category.parent_categ !== null){
                                                template = <tr key={category.id}>
                                                            <td>{category.id}</td>
                                                            <td>{category.category}</td>
                                                            <td>{category.parent_categ}</td>
                                                            <td className='button-box'>
                                                                <button className='red-but' onClick={()=>deleteCategory(category.id)}>Delete</button>
                                                            </td>
                                                        </tr>        
                                            }
                                            return template;
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    : 'Loading...'
                }
            </div>
        </>
    )
}

export default Categories