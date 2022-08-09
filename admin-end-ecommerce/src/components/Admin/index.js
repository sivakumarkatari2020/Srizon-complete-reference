import React from 'react';
import {Routes , Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import Products from './Products';
import Users from './Users';
import './style.css';
import Categories from './Categories';
import HomePage from './Homepage';
import OrderManagement from './Orders';

function Admin() {
    return (
        <div className='layout'>
            <NavBar />
            <div className='content'>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/users" element={<Users />}></Route>
                    <Route path="/products/*" element={<Products />}></Route>
                    <Route path="/categories" element={<Categories />}></Route>
                    <Route path="/home/*" element={<HomePage />}></Route>
                    <Route path="/orders/*" element={<OrderManagement />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Admin