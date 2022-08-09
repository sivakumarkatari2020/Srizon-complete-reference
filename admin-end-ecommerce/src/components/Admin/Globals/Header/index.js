import React from 'react';
import {CgProfile} from 'react-icons/cg';
import {FaSearch,FaAngleDown} from 'react-icons/fa';
import {IoLogOutOutline} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './style.css';

function Header(props) {

    let isSearchBox = false;
    isSearchBox = props.isSearchBox ? props.isSearchBox : false;
    const [butDisplay,setButDisplay] = React.useState(false);

    return (
        <div className='header'>
            {
                isSearchBox
                ? <div className='search-box'>
                    <FaSearch />
                    <input type="text" 
                        autoComplete='off'
                        name='search' 
                        placeholder='search'
                    ></input>
                </div>
                : ''
            }
            <div className='prof-lgout-wrapper'>
                <div className='profiler' onClick={()=>setButDisplay(!butDisplay)}>
                    <div>
                        <CgProfile />
                        Admin
                    </div>
                    <FaAngleDown />
                </div>
                {
                    butDisplay
                    ? <Link to="/login" className='logout-but'>
                        Logout 
                        <IoLogOutOutline />
                    </Link>
                    : ''
                }
            </div>
        </div>
    )
}

export default Header