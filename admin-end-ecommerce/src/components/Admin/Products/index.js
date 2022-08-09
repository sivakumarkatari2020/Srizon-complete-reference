import React from 'react';
import { Link, Routes ,Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Globals/Header';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import {FaEdit} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import getProductlistAPI from '../../../apis/getProductlistAPI';
import deleteProductAPI from '../../../apis/deleteProductAPi';
import '../Globals/styles/style.css';
import './style.css';

function Products(){
    return(
        <>
            <Routes>
                <Route path="/" element={<ProductList />}></Route>
                <Route path="edit/:id" element={<EditProduct />}></Route>
                <Route path="new" element={<AddProduct />}></Route>
            </Routes>
        </>
    )
}

function ProductList() {

    const [values,setValues] = React.useState();
    const [products,setProducts] = React.useState();
    const [isData,setData] = React.useState(false);
    const [sortBy,setSortBy] = React.useState('all');

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
        try{
            const apiResponse = await getProductlistAPI();
            console.log(apiResponse);
            if(apiResponse?.data?.status !== 200 && !apiResponse?.data?.length > 0){
                toast.error('Error while loading the list,Try later!!',toastConfig);
                console.log("Error 404")
            }else{
                setValues(apiResponse.data.data);
                setProducts(apiResponse.data.data);
                setData(true);
            }    
        } catch (err) {
            console.log(err);
            toast.error(err.message,toastConfig);
        }
    }
    React.useEffect(()=>{
        fetchData();
    },[]); 

    const handleSort = (e) => {
        setSortBy(e.target.value);

        let option = e.target.value;
        if(option === 'all'){
            setProducts(values);
        }
        if(option === 'ten'){
            let newList = [];
            for(let i=0;i<values.length;i++){
                if(values[i].inventory_details.quantity < 10){
                    newList.push(values[i]);
                }
            }
            setProducts(newList);
        }
        if(option === 'twenty'){
            let newList = [];
            for(let i=0;i<values.length;i++){
                if(values[i].inventory_details.quantity < 20){
                    newList.push(values[i]);
                }
            }
            setProducts(newList);
        }
        if(option === 'fifty'){
            let newList = [];
            for(let i=0;i<values.length;i++){
                if(values[i].inventory_details.quantity < 50){
                    newList.push(values[i]);
                }
            }
            setProducts(newList);
        }
        return;
    }

    function deleteProduct(id){
        async function removeProduct(){
            if(window.confirm("Are you sure to delete this product??")){
                const apiResponse = await deleteProductAPI(id);
                if(apiResponse?.data?.status !== 200){
                    console.log("Error 404");
                    toast.error("Something went wrong!Try again later!!",toastConfig);
                }else{
                    toast.success("Deleted successfully!!",toastConfig);
                    setTimeout(()=>{
                        window.location.reload();
                    },2000);
                }    
            }else{
                return;
            }
        }
        removeProduct()
    }    

    return (
        <>
            <Header />
            <ToastContainer />
            <div className='container'>
                <div className='category-header'>
                    <h1>Products</h1>
                    <div className='sort-by select'>
                        Sort By Quantity: 
                        <select value={sortBy} className='field-input select' onChange={handleSort}>
                            <option value="all" className='option'>All</option>
                            <option value="ten" className='option'>Less than 10</option>
                            <option value="twenty" className='option'>Less than 20</option>
                            <option value="fifty" className='option'>Less than 50</option>
                        </select>
                    </div>
                    <Link to='new' className='but-add'>Add +</Link>
                </div>
                {
                    isData
                    ? <table className='inner-container'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Old Price</th>
                                <th>New Price</th>
                                <th>Quantity Left</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product,index) => {
                                    return  <tr key={product.id}>
                                                <td>{index+1}</td>
                                                <td>
                                                    <img src={JSON.parse(product.image_path).links[0]} alt='product-img' style={{width:'100px',height:'100px'}}/>
                                                </td>
                                                <td>{product.name}</td>
                                                <td>Rs . {product.o_price}</td>
                                                <td>Rs . {product.d_price}</td>
                                                <td>{
                                                    product?.inventory_details?.quantity === 0
                                                    ? <p className='badge-red badge-small'>Out of Stock</p>
                                                    : product?.inventory_details?.quantity < 20
                                                        ? <p className='badge-orange badge-small'>{product?.inventory_details?.quantity} Left</p>
                                                        : <p className='badge-green badge-small'>{product?.inventory_details?.quantity} In Stock</p>
                                                }</td>
                                                <td className='button-box' style={{height:'100px'}}>
                                                    <Link to={`edit/${product.id}`} className='green-but button'><span><FaEdit /></span><p>Edit</p></Link>
                                                    <button className='red-but button' 
                                                            onClick={() => deleteProduct(product.id)}
                                                    ><span><AiFillDelete /></span><p>Delete</p></button>
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                    : 'Loading...'
                }
            </div>
        </>
    )
}

export default Products