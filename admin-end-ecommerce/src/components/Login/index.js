import React,{useState} from 'react';
import { toast } from 'react-toastify';
import verifyAdminAPI from '../../apis/verifyAdminAPI';
import './style.css';

function Login() {

    const [mail,setMail] = useState('');
    const [password,setPassword] = useState('');
    const [checked,setChecked] = useState(false);
    const [isSubmit,setSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(mail.length < 3){
            console.log("Mail ID shoudn't be less than 3 charecters");
            toast.info("Mail ID shoudn't be less than 3 charecters",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setSubmit(false);
            return;
        }
        if(!(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail))){
            console.log("Invalid Mail id,Please check!!");
            toast.info("Invalid Mail id,Please check!!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })  
            setSubmit(false);
            return;
        }
        if(password.length < 3){
            console.log("Password must contain 8 charecters in length");
            toast.info("Password must contain 8 charecters in length",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })  
            setSubmit(false);
            return;
        }
        if(!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)&&password.length>4)){
            console.log("Password validation failed!!");
            toast.info("Password validation failed!!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })  
            setSubmit(false);
            return;
        }
        
        const apiResponse = await verifyAdminAPI({usermail:mail,password:password});
        setSubmit(true);
        if(apiResponse.data?.status !== 200){
            console.log("Can't login!!");
            toast.error("Can't find any user with this credentials!Contact Admin!!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })    
            setSubmit(false);
        }else{
            console.log("Logged In");
            toast.success("Logged in successfully!redirecting...",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })  
            setTimeout(()=>{
                window.location.href = "/admin/dashboard";
            },1000) 
        }
    }

    return (
        <div className='layout'>
        {
            isSubmit
            ? 'Loading...'
            : <>
                <div className='login-outer'>
                    <form className='login-form'>
                        <div className='logo'></div>
                        <div className='login-section'>
                            <label>Email :</label>
                            <input type="text" 
                                    name='inp-mail'
                                    value={mail}
                                    onChange={(e)=>setMail(e.target.value)}
                                    placeholder='John@example.com'
                                    className='login-mail'
                            ></input>
                        </div>
                        <div className='login-section'>
                            <label>Password :</label>
                            <input type="password" 
                                    name='inp-pass'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder='password'
                                    className='login-pass'
                            ></input>
                        </div>
                        <div className='login-checkbox'>
                            <input 
                                type='checkbox' 
                                name='inp-chk'
                                checked={checked}
                                onChange={()=>setChecked(!checked)}
                            ></input>
                            <label>Remeber me</label>
                        </div>
                        <button className='login-button' onClick={handleSubmit}>login</button>
                    </form>
                </div>
                <div className='illustration'>
                    <img src='../../assets/images/illustration-1.svg' alt='simple-illustration' width="400" height="500" className='login-1' />
                </div>
            </>
        }
        </div>
    )
}

export default Login