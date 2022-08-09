import React from "react";
import {v4 as uuid} from 'uuid';
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getOrderDetailsAPI from "../../../apis/getOrderDetailsAPI";
import updateDeliveryStatusAPI from "../../../apis/updateDeliveryStatusAPI";
import updateTrackingStatusAPI from "../../../apis/updateTrackingStatusAPI";
import "../Globals/styles/style.css";
import "./style.css";
import updatePaymentStatusAPI from "../../../apis/updatePaymentStatusAPI";

function ViewOrder() {
    let params = useParams();
    let navigate = useNavigate();

    const [isData, setData] = React.useState(false);
    const [values, setValues] = React.useState();
    const [shippedStatus,setShippedStatus] = React.useState();
    const [isDelivered,setDelivered] = React.useState(false);
    const [paymentStatus,setPaymentStatus] = React.useState();

    const toastConfig = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    async function fetchData() {
        setData(false);
        try {
            const apiResponse = await getOrderDetailsAPI(params.id);
            if (apiResponse.data.status !== 200 && !apiResponse.data.length > 0) {
                toast.error(apiResponse.data.message, toastConfig);
                console.log("Error 404");
            } else {
                setValues(apiResponse.data.data[0]);
                setShippedStatus({
                        isShipped : apiResponse.data.data[0].tracking_details.status === 'created' ? false : true,
                        track_link : apiResponse.data.data[0].tracking_details.track_link !== null 
                            ? apiResponse.data.data[0].tracking_details.track_link
                            : ''
                    })
                setPaymentStatus(apiResponse.data.data[0].status);
                setData(true);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message, toastConfig);
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
    }
    React.useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if((values.tracking_details.is_cancelled === 1 || values.tracking_details.status === 'delivered') && paymentStatus !== 'Payment Refunded'){
            toast.info('No changes detected!!',toastConfig);
        }else{
            if(values.tracking_details.status === 'created'){
                if(shippedStatus.isShipped && shippedStatus.track_link.length > 5){
                    try{
                        const apiResponse = await updateTrackingStatusAPI({
                            'id' : values.id,
                            'status' : 'shipped',
                            'track_link' : shippedStatus.track_link
                        });
                        if(apiResponse.data.status !== 200){
                            toast.error(apiResponse.data.message,toastConfig);
                        } else {
                            toast.success(apiResponse.data.message,toastConfig);
                            setTimeout(()=>{
                                navigate(-1);
                            },2000);
                        }
                    } catch (err) {
                        toast.error(err.message,toastConfig);
                    }
                }else{
                    toast.info('Please enter valid tracking link',toastConfig);
                }
            }else{
                if(isDelivered){
                    try{
                        const apiResponse = await updateDeliveryStatusAPI({
                            'id' : values.id,
                        });
                        if(apiResponse.data.status !== 200){
                            toast.error(apiResponse.data.message,toastConfig);
                        } else {
                            toast.success(apiResponse.data.message,toastConfig);
                            setTimeout(()=>{
                                navigate(-1);
                            },2000);
                        }
                    } catch (err) {
                        toast.error(err.message,toastConfig);
                    }
                }else{
                    if(paymentStatus === 'Payment Refunded' && values.status !== 'Payment Refunded'){
                        try{
                            const apiResponse = await updatePaymentStatusAPI({
                                'order_id' : values.order_id,
                                'status' : 'Payment Refunded'
                            })
                            if(apiResponse.data.status !== 200){
                                toast.error(apiResponse.data.message,toastConfig);
                            } else {
                                toast.success(apiResponse.data.message,toastConfig);
                                setTimeout(()=>{
                                    navigate(-1);
                                },2000);
                            }    
                        } catch (err) {
                            toast.error(err.message,toastConfig);
                        }
                    }else{
                        toast.info("No changes detected!!",toastConfig);
                    }
                }
            }
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <h1>View Order Details</h1>
            {isData ? (
                <div className="edit-form">
                    <div className="form-1 form">
                        <div className="img-box"></div>
                        <div className="form-content">
                            <div className="form-field">
                                <label>No of items</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values.quantity}
                                    className="field-input read-only"
                                ></input>
                            </div>
                            <div className="form-field">
                                <label>Total Amount</label>
                                <input
                                    type="text"
                                    value={values.total / 100}
                                    readOnly
                                    className="field-input read-only"
                                ></input>
                            </div>
                            <div className="form-field">
                                <label>Payment Status</label>
                                {
                                    values.tracking_details.status === 'cancelled' && values.status !== 'Payment Refunded'
                                    ? <select type="text" 
                                        name='status' 
                                        value={paymentStatus} 
                                        autoComplete="off" 
                                        className='field-input select' 
                                        onChange={(e)=>setPaymentStatus(e.target.value)}
                                    >
                                        <option value='Refund Processing' key={uuid()}>Refund Processing</option>
                                        <option value='Payment Refunded' key={uuid()}>Payment Refunded</option>
                                    </select>
                                    : <input
                                        type="text"
                                        readOnly
                                        value={values.status}
                                        className="field-input read-only"
                                    ></input>
                                }
                            </div>
                            <div className="form-field">
                                <label>Payment ID</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values.payment_id}
                                    className="field-input read-only"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <h2 style={{width: "100%",  textAlign: "left",  padding: "1rem",  paddingLeft: "2rem",}}>
                        Shipping Details
                    </h2>
                    <div className="form-2 form" style={{ flexDirection: "column" }}>
                        <div className="form-content row">
                            <div className="form-field row">
                                <label>Email</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.shipping_details?.email}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                            <div className="form-field row">
                                <label>Mobile</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.shipping_details?.mobile}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                        </div>
                        <div className="form-content row">
                            <div className="form-field row">
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.shipping_details?.zip}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                            <div className="form-field row">
                                <label>State</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.shipping_details?.state}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                        </div>
                        <div className="form-content row">
                            <div className="form-field row">
                                <label>Country</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.shipping_details?.country}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                            <div className="form-field row">
                                <label>Address</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.shipping_details?.address}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <h2 style={{width: "100%",textAlign: "left",padding: "1rem",paddingLeft: "2rem", }}>
                        Tracking Details
                    </h2>
                    <div className="form-3 form" style={{ flexDirection: "column" }}>
                        <div className="form-content row">
                            <div className="form-field row">
                                <label>Tracking Status</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.tracking_details?.status}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                            <div className="form-field row">
                                <label>Cancelled??</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={values?.tracking_details?.is_cancelled ? 'Yes' : 'No'}
                                    className="field-input row read-only"
                                ></input>
                            </div>
                        </div>
                        <div className="form-content row">
                            {
                                values?.tracking_details?.status === 'created'
                                ? <>
                                    <div className='form-field row checkBox'>
                                        <label>Shipped</label>
                                        <input type="checkbox" checked={shippedStatus.isShipped} onChange={(e) => setShippedStatus({...shippedStatus,isShipped : e.target.value})} id="switch" /><label className='label' htmlFor="switch">Toggle</label>                
                                    </div>
                                    {
                                        shippedStatus.isShipped
                                        ? <div className="form-field row">
                                            <label>Enter Tracking Link</label>
                                            <input
                                                type="text"
                                                value={shippedStatus.track_link}
                                                onChange={(e) => setShippedStatus({...shippedStatus,track_link : e.target.value})}
                                                className="field-input row"
                                            ></input>
                                        </div>
                                        : ''
                                    }
                                </>
                                : values?.tracking_details?.status === 'shipped'
                                    ? <div className='form-field row checkBox'>
                                        <label>Delivered</label>
                                        <input type="checkbox" checked={shippedStatus.isDelivered} onChange={(e) => setDelivered(e.target.value)} id="switch" /><label className='label' htmlFor="switch">Toggle</label>                
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                    <div className="button-box large">
                        <button className="red-but button large" onClick={() => navigate(-1)}>Cancel</button>
                        <button className="green-but button large" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );  
}       

export default ViewOrder;