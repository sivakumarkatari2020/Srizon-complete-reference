import React,{useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillDelete} from 'react-icons/ai'
import deleteUserApI from '../../../apis/deleteUserAPI';
import getuserslistAPI from '../../../apis/getUserslistAPI';
import Header from '../Globals/Header';
import '../Globals/styles/style.css';


function Users() {

  const [users,setUsers] = useState([]);
  const [isData,setData] = useState(false);

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
      const apiResponse = await getuserslistAPI();
      console.log(apiResponse);
      if(apiResponse.status !== 200){
        toast.error('Error while loading user list!!',toastConfig);
      }else{
          setUsers(apiResponse.data);
          setData(true);
      }    
    } catch (err) {
      console.log(err);
      toast.error(err.message,toastConfig);
      setData(false)
    }
  }
  React.useEffect(()=>{
    fetchData();
  },[]);

  function deleteUser(id){
    async function removeUser(){
      if(window.confirm("Are you sure to delete this user??")){
        try{
          const apiResponse = await deleteUserApI(id);
          if(apiResponse.status !== 200){
            console.log("Error 404");
            toast.error("Something went wrong!Try again later!!",toastConfig)
          }else{
            toast.success("Deleted successfully!!",toastConfig)
            setTimeout(()=>{
                window.location.reload();
            },2000);
          }   
        } catch (err) {
          toast.error(err.message,toastConfig);
        }
      }else{
        return;
      }
    }
    removeUser()
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div className='container'>
        <h1>Users</h1>
        {
          isData
          ? <table className='inner-container'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Registered</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user,idx) => {
                  return <tr key={user.id}>
                            <td>{idx+1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at.substring(0,10)}</td>
                            <td>{
                              user.status 
                                ? <p className='badge-green badge-small'>Active</p>
                                : <p className='badge-red badge-small'>Inactive</p>
                            }</td>
                            <td className='button-box'>
                              <button className='red-but button' 
                                style={{width:'100%'}} 
                                onClick={() => deleteUser(user.id)}>
                                  <span><AiFillDelete /></span><p>Delete</p>
                              </button>
                            </td>
                          </tr>
                })}
              </tbody>
            </table>
          : 'Loading...'
        }
      </div>
    </>
  )
}

export default Users