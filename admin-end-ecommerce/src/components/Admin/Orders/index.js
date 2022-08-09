import React from 'react';
import { Link, Routes ,Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaEdit} from 'react-icons/fa';
import getOrderlistAPI from '../../../apis/getOrderlistAPI';
import Header from '../Globals/Header';
import ViewOrder from './ViewOrder';
import '../Globals/styles/style.css';
import './style.css';

function OrderManagement(){
    return(
        <>
            <Routes>
                <Route path="/" element={<OrderList />}></Route>
                <Route path="view/:id" element={<ViewOrder />}></Route>
            </Routes>
        </>
    )
}

function OrderList() {

    const [values,setValues] = React.useState();
    const [orders,setOrders] = React.useState();
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
            const apiResponse = await getOrderlistAPI();
            if(apiResponse.data.status !== 200 && !apiResponse.data.length > 0){
                toast.error('Error while loading the list,Try later!!',toastConfig);
                console.log("Error 404")
            }else{
                setValues(apiResponse.data.data);
                setOrders(apiResponse.data.data);
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
            setOrders(values);
        }
        if(option === 'created'){
            let newList = [];
            for(let i=0;i<values.length;i++){
                if(values[i].tracking_details.status === 'created'){
                    newList.push(values[i]);
                }
            }
            setOrders(newList);
        }
        if(option === 'shipped'){
            let newList = [];
            for(let i=0;i<values.length;i++){
                if(values[i].tracking_details.status === 'shipped'){
                    newList.push(values[i]);
                }
            }
            setOrders(newList);
        }
        if(option === 'cancelled'){
            let newList = [];
            for(let i=0;i<values.length;i++){
                if(values[i].tracking_details.status === 'cancelled'){
                    newList.push(values[i]);
                }
            }
            setOrders(newList);
        }
        if(option === 'delivered'){
            let newList = [];
            for(let i=0;i<values.length;i++){
                if(values[i].tracking_details.status === 'delivered'){
                    newList.push(values[i]);
                }
            }
            setOrders(newList);
        }
        return;

    }

    return (
        <>
            <Header />
            <ToastContainer />
            <div className='container'>
                <div className='category-header'>
                    <h1>Manage Orders</h1>
                    <div className='sort-by select'>
                        Sort By : 
                        <select value={sortBy} className='field-input select' onChange={handleSort}>
                            <option value="all" className='option'>All</option>
                            <option value="created" className='option'>Created</option>
                            <option value="shipped" className='option'>Shipped</option>
                            <option value="delivered" className='option'>Delivered</option>
                            <option value="cancelled" className='option'>Cancelled</option>
                        </select>
                    </div>
                </div>
                {
                    isData
                    ? <table className='inner-container'>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => {
                                    return <tr key={order.id}>
                                        <td style={{textAlign:'center'}}>#{order.product_details.id}</td>
                                        <td>{order.product_details.name}</td>
                                        <td>{order.created_at.substring(0,10)}</td>
                                        <td>{
                                            order.status === 'Payment Done'
                                            ? <p className='badge-green'>{order.status}</p>
                                            : order.status === 'Refund Processing'
                                                ? <p className='badge-orange'>{order.status}</p>
                                                : <p className='badge-red'>{order.status}</p>
                                        }</td>
                                        <td>{
                                            order.tracking_details.status === 'delivered' 
                                            ? <p className='badge-green badge-small'>Delivered</p>
                                            : order.tracking_details.status === 'cancelled'
                                                ? <p className='badge-red badge-small'>Cancelled</p>
                                                : <p className='badge-orange badge-small'>{order.tracking_details.status}</p>
                                        }</td>
                                        <td>{
                                            order.quantity === 1
                                            ? '1 item'
                                            : `${order.quantity} items`
                                        }</td>
                                        <td>Rs . {order.total/100}</td>
                                        <td className='button-box' style={{justifyContent:'center'}}>
                                            <Link to={`view/${order.id}`} className='blue-but button'><span><FaEdit /></span><p>View Details</p></Link>
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

export default OrderManagement