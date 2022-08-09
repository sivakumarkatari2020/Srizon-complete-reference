import React from 'react';
import { useLocation } from 'react-router-dom';
import {FaAngleRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './style.css';

function NavBar() {
    let location = useLocation();

    const toggleHomePageMenu = () => {
        let innerBox = document.getElementById('list-inner-box');
        let angleIcon = document.getElementById('angle-icon');
        if(innerBox.style.display === 'block'){
            innerBox.style.display = 'none';
            innerBox.style.height = '0';
            angleIcon.style.transform = 'rotate(0deg)';
        }else{
            innerBox.style.display = 'block';
            innerBox.style.height = 'auto';
            angleIcon.style.transform = 'rotate(90deg)';
        }
    }
    
    return (
        <div className='navbar-outer'>
            <div className='logo'></div>
            <ul className='nav-list'>
                <Link to="dashboard" className={location.pathname.indexOf('dashboard') !== -1 ? 'list-item active' : 'list-item'}>
                    Dashboard
                </Link>
                <Link to="users" className={location.pathname.indexOf('users') !== -1 ? 'list-item active' : 'list-item'}>
                    User Management
                </Link>
                <Link to="products" className={location.pathname.indexOf('products') !== -1 ? 'list-item active' : 'list-item'}>
                    Products
                </Link>
                <Link to="categories" className={location.pathname.indexOf('categories') !== -1 ? 'list-item active' : 'list-item'}>
                    Categories
                </Link>
                <div onClick={toggleHomePageMenu} className={location.pathname.indexOf('home') !== -1 ? 'list-item active' : 'list-item'}>
                    Home Page <span id='angle-icon'><FaAngleRight /></span>
                </div>
                <div className='list-inner-box' id='list-inner-box'>
                    <Link to="home/full-width-banners" className={location.pathname.indexOf('full-width-banners') !== -1 ? 'inner-list-item active' : 'inner-list-item'}>
                        Full Width Banners
                    </Link>
                    <Link to="home/small-banners" className={location.pathname.indexOf('small-banners') !== -1 ? 'inner-list-item active' : 'inner-list-item'}>
                        Small Banners
                    </Link>
                </div>
                <Link to="orders" className={location.pathname.indexOf('orders') !== -1 ? 'list-item active' : 'list-item'}>
                    Order Management
                </Link>                
            </ul>
        </div>
    )
}

export default NavBar